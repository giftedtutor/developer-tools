import Link from "next/link";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";
import { getFeaturedTools, tools } from "@/lib/tools";

export function Footer() {
  const featured = getFeaturedTools().slice(0, 6);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f1f5f9_100%)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            {siteConfig.tagline}. Processing stays in your browser — we do not
            upload your code or tokens.
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="mt-4 inline-block text-sm font-medium text-teal-700 hover:text-teal-800"
          >
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Popular tools
          </h3>
          <ul className="mt-4 space-y-2">
            {featured.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="text-sm text-slate-600 transition hover:text-teal-700"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/#tools" className="text-sm text-slate-600 hover:text-teal-700">
                All tools ({tools.length})
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-slate-600 hover:text-teal-700">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-600 hover:text-teal-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
            Legal
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/privacy" className="text-sm text-slate-600 hover:text-teal-700">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm text-slate-600 hover:text-teal-700">
                Terms of Service
              </Link>
            </li>
            <li>
              <p className="text-sm leading-relaxed text-slate-500">
                Ad-supported site. See our privacy policy for details about
                cookies and Google AdSense.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Built for developers who value speed and privacy.</p>
        </div>
      </div>
    </footer>
  );
}
