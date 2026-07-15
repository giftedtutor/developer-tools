import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import {
  getFeaturedTools,
  getToolsByCategory,
  categoryLabels,
  tools,
} from "@/lib/tools";
import { siteConfig } from "@/lib/site";

function FeatureIcon({ kind }: { kind: "zap" | "lock" | "shield" }) {
  const paths = {
    zap: "M13 2L3 14h8l-1 8 10-12h-8l1-8z",
    lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6z",
    shield: "M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 text-teal-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

export default function HomePage() {
  const featured = getFeaturedTools();
  const byCategory = getToolsByCategory();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            {siteConfig.name}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Developer tools that stay{" "}
            <span className="text-teal-700">in your browser</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Format JSON, decode JWTs, beautify SQL, test regex, and more — free,
            fast, and private. No signup. No uploads.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#tools" className="btn-primary px-5 py-2.5">
              Browse all tools
            </Link>
            <Link
              href="/tools/json-formatter"
              className="btn-secondary px-5 py-2.5"
            >
              Open JSON Formatter
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {(
              [
                {
                  kind: "zap" as const,
                  title: "Instant",
                  text: "Results update as you type with zero network round-trips for core processing.",
                },
                {
                  kind: "lock" as const,
                  title: "Private by design",
                  text: "Your payloads, tokens, and snippets are processed locally in your browser.",
                },
                {
                  kind: "shield" as const,
                  title: "AdSense-ready",
                  text: "Clear policies, contact details, and quality content for a compliant experience.",
                },
              ]
            ).map(({ kind, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5"
              >
                <FeatureIcon kind={kind} />
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold text-slate-900">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot
        slot="home-top"
        className="mx-auto mb-10 max-w-6xl px-4 sm:px-6 lg:px-8"
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900 sm:text-3xl">
              Popular tools
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start with the utilities developers open every day.
            </p>
          </div>
          <Link
            href="#tools"
            className="hidden text-sm font-medium text-teal-700 sm:inline"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section
        id="tools"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900 sm:text-3xl">
            All developer tools
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {tools.length} free online utilities for formatting, encoding,
            generating, and testing — built for responsive phones and desktops.
          </p>
        </div>

        <div className="space-y-12">
          {(Object.keys(byCategory) as Array<keyof typeof byCategory>).map(
            (category) => {
              const list = byCategory[category];
              if (!list.length) return null;
              return (
                <div key={category}>
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {categoryLabels[category]}
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((tool) => (
                      <ToolCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                </div>
              );
            },
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-slate-900">
            Why CS Dev Tools?
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <p className="text-sm leading-relaxed text-slate-600">
              Most browser “devtools” sites bounce you through popups or capture
              sensitive paste data. CS Dev Tools is built for everyday
              engineering work: clean UI, fast client-side transforms, and SEO
              pages that stay useful for humans — not just crawlers.
            </p>
            <p className="text-sm leading-relaxed text-slate-600">
              Questions or partnership ideas? Email{" "}
              <a
                className="font-medium text-teal-700 hover:underline"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
              . Read our{" "}
              <Link
                href="/privacy"
                className="font-medium text-teal-700 hover:underline"
              >
                Privacy Policy
              </Link>{" "}
              for AdSense, cookies, and data practices.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
