import { z } from "zod";

// Zod's JIT compiler builds validators with `new Function`, which a strict CSP blocks.
// The throw is swallowed, but Chrome still reports a CSP violation (Lighthouse Best Practices).
z.config({ jitless: true });

/**
 * Single source of truth for the contact form contract.
 * The client uses it for inline validation, the route re-validates at the trust boundary.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().min(3).max(254).pipe(z.email("Please enter a valid email address")),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(120),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(5000),
  // Honeypot: real users never see or fill this. Bots do.
  website: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
