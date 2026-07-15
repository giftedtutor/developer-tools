import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="CodeSplitters home"
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[linear-gradient(145deg,#0f766e_0%,#115e59_55%,#0c4a6e_100%)] shadow-[0_8px_20px_-10px_rgba(15,118,110,0.7)] ring-1 ring-teal-700/30">
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          <path
            d="M11 10L6 16l5 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 10l5 6-5 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.2 8.5L13.8 23.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold tracking-tight text-slate-900">
          Code<span className="text-teal-700">Splitters</span>
        </span>
        <span className="mt-0.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-slate-500">
          Developer Tools
        </span>
      </span>
    </Link>
  );
}
