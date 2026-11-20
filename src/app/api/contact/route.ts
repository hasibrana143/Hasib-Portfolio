import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/contact-schema";

const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Numeric character references produce the same output as named entities
// without needing an entity table that can drift out of sync.
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => `&#${character.charCodeAt(0)};`);

// In-memory limiter. Per-instance on serverless, so it is a floor, not a wall —
// pair it with the Vercel WAF rate limit documented in .ai/DEPLOYMENT.md.
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((at) => now - at < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound.
  if (hits.size > 1000) {
    for (const [entryKey, times] of hits) {
      if (times.every((at) => now - at >= RATE_LIMIT_WINDOW_MS)) hits.delete(entryKey);
    }
  }

  return recent.length > RATE_LIMIT_MAX;
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  const recipient = process.env.CONTACT_EMAIL;
  if (!recipient) {
    throw new Error("CONTACT_EMAIL is not configured");
  }
  return { resend: new Resend(apiKey), recipient };
}

export async function POST(request: NextRequest) {
  try {
    const mediaType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
    if (mediaType !== "application/json") {
      return NextResponse.json(
        { message: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Request body too large" }, { status: 413 });
    }

    const clientKey =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(clientKey)) {
      return NextResponse.json(
        { message: "Too many messages sent. Please try again later." },
        { status: 429 }
      );
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Request body too large" }, { status: 413 });
    }

    let body: unknown;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const validatedData = contactSchema.parse(body);

    // Honeypot tripped: pretend it worked, send nothing.
    if (validatedData.website) {
      return NextResponse.json({ message: "Message sent successfully!" });
    }

    const { name, email, subject, message } = validatedData;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #eee;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #667eea; width: 100px;">Name:</td>
                <td style="padding: 12px 0;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #667eea;">Email:</td>
                <td style="padding: 12px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #667eea;">Subject:</td>
                <td style="padding: 12px 0;">${escapeHtml(subject)}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-weight: bold; color: #667eea; margin-bottom: 10px;">Message:</p>
              <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #eee; white-space: pre-wrap;">${escapeHtml(message)}</div>
            </div>
          </div>
          <p style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            Sent from ${escapeHtml(process.env.NEXT_PUBLIC_SITE_URL || "your portfolio")}
          </p>
        </body>
      </html>
    `;

    const { resend, recipient } = getResendClient();

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
      to: [recipient],
      subject: `Portfolio Contact: ${subject}`,
      html: emailHtml,
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { message: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of error.issues) {
        const key = String(issue.path[0] ?? "form");
        (fieldErrors[key] ??= []).push(issue.message);
      }
      return NextResponse.json({ message: "Validation failed", errors: fieldErrors }, { status: 400 });
    }

    if (
      error instanceof Error &&
      (error.message.includes("RESEND_API_KEY") || error.message.includes("CONTACT_EMAIL"))
    ) {
      console.warn("Contact form: email delivery is not configured");
      return NextResponse.json(
        { message: "Thank you for your message! We'll review it and get back to you soon." },
        { status: 200 }
      );
    }

    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
