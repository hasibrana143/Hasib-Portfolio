import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contact/route";

const mocks = vi.hoisted(() => ({
  send: vi.fn(),
}));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mocks.send };
  },
}));

const MAX_BODY_BYTES = 16 * 1024;
const validBody = {
  name: "Test Visitor",
  email: "visitor@example.com",
  subject: "A valid enquiry subject",
  message: "This message is long enough to pass the contact contract.",
};

function makeRequest(
  body: string | Record<string, unknown> = validBody,
  {
    contentType = "application/json",
    contentLength,
    ip = "client-1",
  }: {
    contentType?: string;
    contentLength?: string;
    ip?: string;
  } = {},
) {
  const headers: Record<string, string> = {
    "content-type": contentType,
    "x-forwarded-for": ip,
  };
  if (contentLength !== undefined) headers["content-length"] = contentLength;

  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// Value: protects=the contact route rejects invalid content types and malformed or schema-invalid JSON; fails_when=the 415/400 branches are removed or return the wrong status; why_new=no automated route test covers these trust-boundary responses; seam=none; no_claim=mocked Resend provider behavior is not exercised by these validation tests
describe("POST /api/contact validation", () => {
  it("rejects a non-JSON content type", async () => {
    const response = await POST(
      makeRequest(validBody, { contentType: "text/plain", ip: "client-2" })
    );

    expect(response.status).toBe(415);
  });

  it("rejects malformed JSON", async () => {
    const response = await POST(makeRequest("{", { ip: "client-3" }));

    expect(response.status).toBe(400);
  });

  it("rejects a schema-invalid payload", async () => {
    const response = await POST(
      makeRequest({ ...validBody, email: "not-an-email" }, { ip: "client-4" })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toMatchObject({
      message: "Validation failed",
      errors: { email: expect.any(Array) },
    });
  });
});

// Value: protects=request bodies at and above 16 KiB follow the intended early-rejection and post-read-cap paths; fails_when=the size guards are removed, inverted, or changed to reject the exact boundary; why_new=no automated route test proves either buffer boundary; seam=none; no_claim=the post-read branch is exercised with a body lacking Content-Length, not every transport-specific header behavior
describe("POST /api/contact body limit", () => {
  it("rejects a declared body over 16 KiB before reading it", async () => {
    const request = makeRequest(validBody, {
      contentLength: String(MAX_BODY_BYTES + 1),
      ip: "client-5",
    });
    const textSpy = vi.spyOn(request, "text");

    const response = await POST(request);

    expect(response.status).toBe(413);
    expect(textSpy).not.toHaveBeenCalled();
  });

  it("does not reject a body at exactly 16 KiB for its size", async () => {
    const response = await POST(
      makeRequest("x".repeat(MAX_BODY_BYTES), {
        contentLength: String(MAX_BODY_BYTES),
        ip: "client-6",
      })
    );

    expect(response.status).toBe(400);
  });

  it("rejects an over-limit body without Content-Length after reading it", async () => {
    const request = makeRequest("x".repeat(MAX_BODY_BYTES + 1), {
      ip: "client-7",
    });
    expect(request.headers.get("content-length")).toBeNull();

    const response = await POST(request);

    expect(response.status).toBe(413);
  });
});

// Value: protects=the honeypot, missing configuration, successful send, and provider-error branches return their documented statuses without real mail delivery; fails_when=a branch regresses or the honeypot starts sending mail; why_new=no automated route test covered the route's observable outcomes; seam=none; no_claim=Resend is mocked, so provider acceptance and live delivery are not proven
describe("POST /api/contact delivery outcomes", () => {
  it("returns success without sending when the honeypot is filled", async () => {
    const response = await POST(
      makeRequest({ ...validBody, website: "bot.example" }, { ip: "client-8" })
    );

    expect(response.status).toBe(200);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("returns 503 when email delivery is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    vi.stubEnv("CONTACT_EMAIL", "");

    const response = await POST(makeRequest(validBody, { ip: "client-9" }));

    expect(response.status).toBe(503);
    expect(mocks.send).not.toHaveBeenCalled();
  });

  it("returns success after a successful mocked send", async () => {
    const response = await POST(makeRequest(validBody, { ip: "client-10" }));

    expect(response.status).toBe(200);
    expect(mocks.send).toHaveBeenCalledOnce();
    expect(mocks.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: ["owner@example.com"],
        replyTo: validBody.email,
      })
    );
  });

  it("returns 500 when the mail provider reports an error", async () => {
    mocks.send.mockResolvedValueOnce({ data: null, error: { message: "failed" } });
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await POST(makeRequest(validBody, { ip: "client-11" }));

    expect(response.status).toBe(500);
    expect(errorSpy).toHaveBeenCalled();
  });
});

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "test-key");
  vi.stubEnv("CONTACT_EMAIL", "owner@example.com");
  mocks.send.mockReset().mockResolvedValue({ data: { id: "test-message" }, error: null });
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});
