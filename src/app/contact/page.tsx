import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact CS Dev Tools for support, partnerships, or privacy questions. Email thecodesplitters@gmail.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-teal-700">Contact</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-900">
        Get in touch
      </h1>
      <p className="mt-4 max-w-xl text-base text-slate-600">
        For support, feature ideas, privacy requests, or advertising inquiries,
        email us directly. We aim to reply within a few business days.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${siteConfig.email}`}
          className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-teal-300 hover:shadow-lg"
        >
          <Mail className="h-5 w-5 text-teal-700" />
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-slate-900">
            Email
          </h2>
          <p className="mt-2 break-all text-sm font-medium text-teal-700">
            {siteConfig.email}
          </p>
        </a>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <MessageSquare className="h-5 w-5 text-teal-700" />
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-slate-900">
            What to include
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Tool name, browser/device, and a short description of the issue or
            request helps us respond faster.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-sm text-slate-600">
        <p>
          Preferred address:{" "}
          <strong className="text-slate-900">{siteConfig.email}</strong>
        </p>
        <p className="mt-2">
          Do not paste production secrets or private keys in email. Tools
          already keep sensitive processing in your browser.
        </p>
      </div>
    </div>
  );
}
