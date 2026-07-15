"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea, Field } from "./shared";

export function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\b([A-Z][a-z]+)\\b");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Alice met Bob in Paris. Charlie stayed in London.",
  );

  const result = useMemo(() => {
    if (!pattern) {
      return { ok: null as boolean | null, message: "", matches: [] as RegExpMatchArray[], error: "" };
    }
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(re)];
      return {
        ok: true,
        message: `${matches.length} match${matches.length === 1 ? "" : "es"}`,
        matches,
        error: "",
      };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Invalid regex",
        matches: [],
        error: e instanceof Error ? e.message : "Invalid regex",
      };
    }
  }, [pattern, flags, text]);

  const highlighted = useMemo(() => {
    if (!result.ok || result.matches.length === 0) return text;
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : `${flags}g`);
      return text.replace(re, (m) => `⟦${m}⟧`);
    } catch {
      return text;
    }
  }, [text, pattern, flags, result.ok, result.matches.length]);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
        <Field label="Pattern">
          <input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
            placeholder="Regular expression"
          />
        </Field>
        <Field label="Flags">
          <input
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
            placeholder="gimsu"
          />
        </Field>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge ok={result.ok} message={result.message} />
      </div>
      <Panel title="Test string">
        <TextArea value={text} onChange={setText} rows={8} mono={false} />
      </Panel>
      <Panel title="Highlighted matches">
        <pre className="tool-textarea min-h-[120px] whitespace-pre-wrap font-mono text-[13px]">
          {highlighted.split(/(⟦.*?⟧)/g).map((part, i) =>
            part.startsWith("⟦") && part.endsWith("⟧") ? (
              <mark
                key={i}
                className="rounded bg-teal-100 px-0.5 text-teal-900"
              >
                {part.slice(1, -1)}
              </mark>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </pre>
      </Panel>
      {result.matches.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Match</th>
                <th className="px-3 py-2">Index</th>
                <th className="px-3 py-2">Groups</th>
              </tr>
            </thead>
            <tbody>
              {result.matches.map((m, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-mono text-xs">{i + 1}</td>
                  <td className="px-3 py-2 font-mono text-xs">{m[0]}</td>
                  <td className="px-3 py-2 font-mono text-xs">{m.index}</td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {m.slice(1).join(", ") || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function MarkdownEditorTool() {
  const [input, setInput] = useState(
    "# Welcome\n\nWrite **Markdown** on the left and preview it on the right.\n\n- Fast\n- Private\n- Free\n",
  );

  const html = useMemo(() => {
    const raw = marked.parse(input, { async: false }) as string;
    return DOMPurify.sanitize(raw);
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ToolActions
          onClear={() => setInput("")}
          copyValue={input}
          downloadName="document.md"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Markdown">
          <TextArea value={input} onChange={setInput} rows={18} />
        </Panel>
        <Panel title="Preview">
          <div
            className="prose-preview tool-textarea min-h-[420px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Panel>
      </div>
    </div>
  );
}
