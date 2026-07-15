"use client";

import { useMemo, useState } from "react";
import { format } from "sql-formatter";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea } from "../shared";

export function SqlFormatterTool() {
  const [input, setInput] = useState(
    "select id, name from users where active = 1 order by created_at desc;",
  );
  const { output, ok, message } = useMemo(() => {
    if (!input.trim())
      return { output: "", ok: null as boolean | null, message: "" };
    try {
      return {
        output: format(input, {
          language: "sql",
          tabWidth: 2,
          keywordCase: "upper",
        }),
        ok: true,
        message: "Formatted",
      };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Could not format SQL",
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
            downloadName="query.sql"
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="SQL input">
          <TextArea value={input} onChange={setInput} />
        </Panel>
        <Panel title="Formatted SQL">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}
