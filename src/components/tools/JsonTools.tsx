"use client";

import { useMemo, useState } from "react";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea, ModeTabs } from "./shared";

export function JsonFormatterTool() {
  const [input, setInput] = useState('{\n  "hello": "world",\n  "ready": true\n}');
  const [indent, setIndent] = useState("2");
  const [mode, setMode] = useState<"pretty" | "minify">("pretty");

  const { output, ok, message } = useMemo(() => {
    if (!input.trim()) return { output: "", ok: null as boolean | null, message: "" };
    try {
      const parsed = JSON.parse(input);
      const spaces = mode === "minify" ? 0 : Number(indent);
      return {
        output: JSON.stringify(parsed, null, spaces),
        ok: true,
        message: mode === "minify" ? "Minified" : "Formatted",
      };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Invalid JSON",
      };
    }
  }, [input, indent, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ModeTabs
          value={mode}
          onChange={(id) => setMode(id as "pretty" | "minify")}
          modes={[
            { id: "pretty", label: "Pretty" },
            { id: "minify", label: "Minify" },
          ]}
        />
        {mode === "pretty" && (
          <label className="flex items-center gap-2 text-sm text-slate-600">
            Indent
            <select
              value={indent}
              onChange={(e) => setIndent(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm"
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
            </select>
          </label>
        )}
        <StatusBadge ok={ok} message={message} />
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
            downloadName="formatted.json"
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Input">
          <TextArea value={input} onChange={setInput} placeholder="Paste JSON…" />
        </Panel>
        <Panel title="Output">
          <TextArea value={output} readOnly placeholder="Formatted JSON appears here…" />
        </Panel>
      </div>
    </div>
  );
}

export function JsonValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return { ok: null as boolean | null, message: "Paste JSON to validate" };
    try {
      JSON.parse(input);
      return { ok: true, message: "Valid JSON" };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Invalid JSON",
      };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge ok={result.ok} message={result.message} />
        <div className="ml-auto">
          <ToolActions onClear={() => setInput("")} />
        </div>
      </div>
      <Panel title="JSON">
        <TextArea
          value={input}
          onChange={setInput}
          placeholder='{"example": true}'
          rows={18}
        />
      </Panel>
    </div>
  );
}
