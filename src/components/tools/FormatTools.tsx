"use client";

import { useMemo, useState } from "react";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { formatXml, minifyCss, minifyHtml } from "@/lib/utils";
import { Panel, TextArea } from "./shared";

export function XmlFormatterTool() {
  const [input, setInput] = useState(
    '<root><item id="1">Hello</item></root>',
  );
  const { output, ok, message } = useMemo(() => {
    if (!input.trim())
      return { output: "", ok: null as boolean | null, message: "" };
    try {
      return { output: formatXml(input), ok: true, message: "Formatted" };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Could not format XML",
      };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge ok={ok} message={message} />
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
            downloadName="formatted.xml"
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Input">
          <TextArea
            value={input}
            onChange={setInput}
            placeholder="Paste XML…"
          />
        </Panel>
        <Panel title="Output">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}

export function HtmlMinifierTool() {
  const [input, setInput] = useState(
    "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Demo</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>",
  );
  const output = useMemo(
    () => (input.trim() ? minifyHtml(input) : ""),
    [input],
  );
  const savings =
    input.length && output.length
      ? Math.max(0, Math.round((1 - output.length / input.length) * 100))
      : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        {output && (
          <StatusBadge ok message={`Minified · ~${savings}% smaller`} />
        )}
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
            downloadName="minified.html"
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="HTML">
          <TextArea value={input} onChange={setInput} />
        </Panel>
        <Panel title="Minified">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}

export function CssMinifierTool() {
  const [input, setInput] = useState(
    ".card {\n  color: #0f172a;\n  padding: 16px;\n  /* comment */\n  border-radius: 12px;\n}",
  );
  const output = useMemo(
    () => (input.trim() ? minifyCss(input) : ""),
    [input],
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <ToolActions
          onClear={() => setInput("")}
          copyValue={output}
          downloadName="minified.css"
          disableCopy={!output}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="CSS">
          <TextArea value={input} onChange={setInput} />
        </Panel>
        <Panel title="Minified">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}
