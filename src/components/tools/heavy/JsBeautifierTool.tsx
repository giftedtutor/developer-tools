"use client";

import { useMemo, useState } from "react";
import { js as beautifyJs } from "js-beautify";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea } from "../shared";

export function JsBeautifierTool() {
  const [input, setInput] = useState(
    "function hello(name){return `Hello, ${name}!`;}",
  );
  const { output, ok, message } = useMemo(() => {
    if (!input.trim())
      return { output: "", ok: null as boolean | null, message: "" };
    try {
      return {
        output: beautifyJs(input, {
          indent_size: 2,
          space_in_empty_paren: true,
        }),
        ok: true,
        message: "Beautified",
      };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Beautify failed",
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
            downloadName="beautified.js"
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="JavaScript">
          <TextArea value={input} onChange={setInput} />
        </Panel>
        <Panel title="Beautified">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}
