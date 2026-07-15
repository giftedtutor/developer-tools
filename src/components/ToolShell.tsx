import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";
import { categoryLabels } from "@/lib/tools";
import { AdSlot } from "./AdSlot";

export function ToolShell({
  tool,
  children,
}: {
  tool: ToolDefinition;
  children: React.ReactNode;
}) {
  const Icon = tool.icon;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-teal-700">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#tools" className="hover:text-teal-700">
              Tools
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-slate-800">{tool.name}</li>
        </ol>
      </nav>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-800 ring-1 ring-teal-100">
            <Icon className="h-3.5 w-3.5" />
            {categoryLabels[tool.category]}
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-600">
            {tool.description}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            All processing runs locally in your browser. Your data is not
            uploaded to our servers.
          </p>
        </div>
      </div>

      <AdSlot slot="tool-top" className="mb-6" />

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.5)] sm:p-6">
        {children}
      </div>

      <AdSlot slot="tool-bottom" className="mt-8" />

      <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-slate-900">
          About this {tool.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {tool.description} Use this free online utility when you need a fast,{" "}
          privacy-friendly alternative to desktop apps. Keywords:{" "}
          {tool.keywords.join(", ")}.
        </p>
      </section>
    </div>
  );
}
