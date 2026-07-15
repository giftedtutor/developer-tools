import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";
import { ToolIcon } from "./ToolIcon";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] transition duration-200 hover:-translate-y-0.5 hover:border-teal-300/70 hover:shadow-[0_18px_40px_-24px_rgba(15,118,110,0.45)]"
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600">
        <ToolIcon name={tool.icon} className="h-5 w-5" />
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-slate-900">
        {tool.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {tool.shortDescription}
      </p>
      <span className="mt-4 text-sm font-medium text-teal-700 opacity-0 transition group-hover:opacity-100">
        Open tool →
      </span>
    </Link>
  );
}
