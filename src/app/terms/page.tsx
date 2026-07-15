import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service for using CS Dev Tools free online developer tools.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-teal-700">Legal</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: July 15, 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          By accessing {siteConfig.name}, you agree to these Terms of Service.
          If you do not agree, please do not use the site.
        </p>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            Use of tools
          </h2>
          <p className="mt-2">
            Tools are provided free of charge, &quot;as is,&quot; without
            warranties of any kind. Results may contain errors. Always verify
            critical output before using it in production systems.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            Acceptable use
          </h2>
          <p className="mt-2">
            You agree not to misuse the website, attempt to disrupt service,
            scrape aggressively in ways that harm availability, or use the site
            for unlawful purposes.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            Advertising
          </h2>
          <p className="mt-2">
            The site may display third-party advertisements, including Google
            AdSense. Ad content is the responsibility of the respective
            advertisers and networks.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            Limitation of liability
          </h2>
          <p className="mt-2">
            To the fullest extent permitted by law, {siteConfig.name} is not
            liable for any damages arising from your use of the tools or the
            website.
          </p>
        </section>
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            Contact
          </h2>
          <p className="mt-2">
            Reach us at{" "}
            <a
              className="font-medium text-teal-700 underline"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
