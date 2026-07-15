import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { tools } from "@/lib/tools";

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "About CodeSplitters — free, privacy-friendly online developer tools for formatting, encoding, and testing.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-teal-700">About</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-900">
        Built for everyday developer work
      </h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base">
        <p>
          {siteConfig.name} is a collection of {tools.length}+ free browser-based
          utilities for developers, students, and technical writers. Format
          JSON, validate payloads, decode JWTs, minify HTML/CSS, generate
          UUIDs, and more — without installing software.
        </p>
        <p>
          We focus on three product principles: speed, clarity, and privacy.
          Tooling should feel calm and professional on mobile and desktop, with
          honest SEO pages and transparent policies for advertising partners.
        </p>
        <p>
          The site is ad-supported through Google AdSense to remain free. Ads
          never process the content you paste into tools. For details, read our{" "}
          <Link href="/privacy" className="font-medium text-teal-700 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          Feedback welcome at{" "}
          <a
            className="font-medium text-teal-700 underline"
            href={`mailto:${siteConfig.email}`}
          >
            {siteConfig.email}
          </a>
          .
        </p>
      </div>
    </article>
  );
}
