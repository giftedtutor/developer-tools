"use client";

import { useMemo, useState } from "react";
import { marked } from "marked";
import { ToolActions } from "@/components/ToolControls";
import { Panel, TextArea } from "../shared";

/** Lightweight HTML sanitize for Markdown preview (no jsdom). */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/javascript:/gi, "");
}

export function MarkdownEditorTool() {
  const [input, setInput] = useState(
    "# Welcome\n\nWrite **Markdown** on the left and preview it on the right.\n\n- Fast\n- Private\n- Free\n",
  );

  const html = useMemo(() => {
    const raw = marked.parse(input, { async: false }) as string;
    return sanitizeHtml(raw);
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
