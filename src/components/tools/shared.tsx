"use client";

import type { ReactNode } from "react";

export function Panel({
  title,
  actions,
  children,
}: {
  title?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {(title || actions) && (
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          {title ? (
            <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
          ) : (
            <span />
          )}
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}

export function TextArea({
  value,
  onChange,
  placeholder,
  readOnly,
  className = "",
  rows = 14,
  mono = true,
  id,
}: {
  value: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  rows?: number;
  mono?: boolean;
  id?: string;
}) {
  return (
    <textarea
      id={id}
      value={value}
      readOnly={readOnly}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      spellCheck={false}
      className={`tool-textarea ${mono ? "font-mono text-[13px] leading-relaxed" : "text-sm"} ${className}`}
    />
  );
}

export function ModeTabs({
  modes,
  value,
  onChange,
}: {
  modes: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-slate-50 p-1">
      {modes.map((mode) => (
        <button
          key={mode.id}
          type="button"
          onClick={() => onChange(mode.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            value === mode.id
              ? "bg-white text-slate-900 shadow-sm"
              : "text-slate-550 text-slate-600 hover:text-slate-900"
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
