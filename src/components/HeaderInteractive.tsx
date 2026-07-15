"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { toolSearchIndex } from "@/lib/tools";

export function HeaderInteractive({
  navLinks,
}: {
  navLinks: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return toolSearchIndex
      .filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.includes(q)),
      )
      .slice(0, 6);
  }, [query]);

  return (
    <>
      <div className="relative mx-auto hidden w-full max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-slate-800 outline-none ring-teal-600/30 transition focus:border-teal-600/40 focus:bg-white focus:ring-2"
          aria-label="Search developer tools"
        />
        {filtered.length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.4rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            {filtered.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={() => setQuery("")}
                className="block px-3 py-2.5 text-sm hover:bg-slate-50"
              >
                <span className="font-medium text-slate-900">{tool.name}</span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {tool.shortDescription}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white lg:hidden">
          <div className="space-y-3 px-4 py-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-600/40 focus:ring-2 focus:ring-teal-600/20"
              />
            </div>
            {filtered.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                className="block rounded-lg px-2 py-2 text-sm hover:bg-slate-50"
              >
                {tool.name}
              </Link>
            ))}
            <div className="grid gap-1 border-t border-slate-100 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
