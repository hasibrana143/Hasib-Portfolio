"use client";

import { AnimatePresence, m } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { siteConfig } from "@/data/constants";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";

const EASE = [0.32, 0.72, 0, 1] as const;

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="border-t border-border px-6 py-24 md:py-32" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-8 border-b border-border pb-10 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-16">
          <div>
            <m.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="label flex items-center gap-3 text-muted-foreground"
            >
              <span aria-hidden="true" className="rule-accent h-px w-12" />
              03 — Contact
            </m.p>
            <m.h2
              id="contact-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-6 font-display text-6xl leading-[0.9] tracking-[-0.03em] md:text-8xl"
            >
              Say hello
            </m.h2>
          </div>

          <m.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-lg leading-relaxed text-muted-foreground md:justify-self-end"
          >
            Have a project in mind, a role to fill, or just want to compare notes on the stack? Send a
            message — I reply to everything.
          </m.p>
        </header>

        <div className="grid gap-14 pt-14 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="label text-muted-foreground">Elsewhere</p>
            <ul className="mt-5 border-t border-border">
              {siteConfig.socialLinks.map((social) => (
                <li key={social.name} className="border-b border-border">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors duration-500 hover:text-accent"
                  >
                    <span className="font-display text-2xl tracking-tight">{social.name}</span>
                    <ArrowUpRight
                      className="h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="label text-muted-foreground">Available for new work</span>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
              {/* Honeypot: hidden from people, visible to bots. Server drops any submission that fills it. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("website")}
                />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    disabled={status === "submitting"}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    disabled={status === "submitting"}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="What is this about?"
                  {...register("subject")}
                  disabled={status === "submitting"}
                  aria-invalid={errors.subject ? "true" : "false"}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive" role="alert">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  {...register("message")}
                  disabled={status === "submitting"}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive" role="alert">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Sending
                  </>
                ) : (
                  <>
                    Send message
                    <Send aria-hidden="true" />
                  </>
                )}
              </Button>

              <AnimatePresence presenceAffectsLayout={false}>
                {status === "success" && (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-3 border border-border bg-secondary p-4"
                    role="status"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <p className="text-sm">Message sent successfully. I&apos;ll get back to you soon.</p>
                  </m.div>
                )}
                {status === "error" && (
                  <m.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex items-center gap-3 border border-destructive/40 bg-destructive/5 p-4"
                    role="alert"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0 text-destructive" aria-hidden="true" />
                    <p className="text-sm">{errorMessage}</p>
                  </m.div>
                )}
              </AnimatePresence>
            </form>
          </m.div>
        </div>
      </div>
    </section>
  );
}
