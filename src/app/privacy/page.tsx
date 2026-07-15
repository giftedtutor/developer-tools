import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "Privacy Policy for CS Dev Tools, including Google AdSense, cookies, and data processing practices.",
  path: "/privacy",
  keywords: ["privacy policy", "adsense", "cookies", "gdpr"],
});

export default function PrivacyPage() {
  const updated = "July 15, 2026";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-teal-700">Legal</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>

      <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-slate-700">
        <p>
          {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
          operates free online developer tools at this website. This Privacy
          Policy explains what information we collect, how we use it, and how
          advertising partners such as Google AdSense may use cookies and
          similar technologies. By using the site, you agree to this policy.
        </p>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            1. Tool processing stays in your browser
          </h2>
          <p className="mt-2">
            Core tool features (JSON formatting, JWT decoding, hashing, SQL
            beautifying, and similar utilities) are designed to run entirely in
            your browser. We do <strong>not</strong> intentionally upload the
            content you paste into tools to our servers for processing. That
            means your code snippets, tokens, and documents are not stored by us
            as part of normal tool use.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            2. Information we may collect
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              <strong>Usage data:</strong> pages visited, approximate location
              derived from IP, browser type, device type, and referral URLs —
              typically via analytics or hosting logs.
            </li>
            <li>
              <strong>Contact data:</strong> if you email{" "}
              <a
                className="text-teal-700 underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              , we receive your email address and message content solely to
              respond.
            </li>
            <li>
              <strong>Advertising data:</strong> cookies and identifiers used by
              Google and other ad partners to deliver and measure ads.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            3. Google AdSense and cookies
          </h2>
          <p className="mt-2">
            We use Google AdSense to display advertisements. Google and its
            partners may use cookies or similar technologies to serve ads based
            on your prior visits to this or other websites. This helps show more
            relevant advertising.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              Google&apos;s use of advertising cookies enables it and its
              partners to serve ads based on visits to this site and/or other
              sites on the Internet.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{" "}
              <a
                className="text-teal-700 underline"
                href="https://www.google.com/settings/ads"
                rel="noopener noreferrer"
                target="_blank"
              >
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              You can also visit{" "}
              <a
                className="text-teal-700 underline"
                href="https://www.aboutads.info"
                rel="noopener noreferrer"
                target="_blank"
              >
                www.aboutads.info
              </a>{" "}
              for resources about interest-based advertising and opt-out
              options.
            </li>
          </ul>
          <p className="mt-2">
            Third-party vendors, including Google, use cookies to serve ads. We
            do not control cookies set by advertising partners. Please review
            their policies for details.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            4. How we use information
          </h2>
          <p className="mt-2">We use collected information to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Operate, maintain, and improve the website and tools</li>
            <li>Measure traffic and diagnose technical issues</li>
            <li>Display advertising (via AdSense and partners)</li>
            <li>Respond to support or partnership inquiries</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            5. Data sharing
          </h2>
          <p className="mt-2">
            We do not sell personal information. We may share limited data with
            service providers who help host the site, analyze traffic, or serve
            ads — subject to their own privacy terms. We may also disclose
            information if required by law.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            6. Children&apos;s privacy
          </h2>
          <p className="mt-2">
            This website is intended for a general audience of developers and is
            not directed at children under 13. We do not knowingly collect
            personal information from children under 13. If you believe a child
            has provided us information, contact us and we will take appropriate
            steps to delete it.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            7. Your choices
          </h2>
          <p className="mt-2">
            You can clear cookies in your browser, use private browsing modes,
            or opt out of personalized ads via the links above. Because tool
            inputs are processed locally, clearing your browser storage removes
            any temporary client-side state.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            8. Changes to this policy
          </h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time. The &quot;Last
            updated&quot; date at the top will change when revisions are posted.
            Continued use of the site after changes means you accept the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-slate-900">
            9. Contact
          </h2>
          <p className="mt-2">
            Questions about privacy or AdSense on this site? Contact us at{" "}
            <a
              className="font-medium text-teal-700 underline"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            . You can also visit our{" "}
            <Link href="/contact" className="text-teal-700 underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </article>
  );
}
