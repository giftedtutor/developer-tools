"use client";

import { useMemo, useState } from "react";
import { load as yamlLoad, dump as yamlDump } from "js-yaml";
import { format } from "sql-formatter";
import { js as beautifyJs } from "js-beautify";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { formatXml, minifyCss, minifyHtml } from "@/lib/utils";
import { Panel, TextArea, ModeTabs } from "./shared";

export function XmlFormatterTool() {
  const [input, setInput] = useState("<root><item id=\"1\">Hello</item></root>");
  const { output, ok, message } = useMemo(() => {
    if (!input.trim()) return { output: "", ok: null as boolean | null, message: "" };
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
          <TextArea value={input} onChange={setInput} placeholder="Paste XML…" />
        </Panel>
        <Panel title="Output">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}

export function YamlConverterTool() {
  const [mode, setMode] = useState<"yaml-json" | "json-yaml">("yaml-json");
  const [input, setInput] = useState("name: CodeSplitters\nfeatures:\n  - privacy\n  - speed\n");

  const { output, ok, message } = useMemo(() => {
    if (!input.trim()) return { output: "", ok: null as boolean | null, message: "" };
    try {
      if (mode === "yaml-json") {
        const data = yamlLoad(input);
        return {
          output: JSON.stringify(data, null, 2),
          ok: true,
          message: "Converted to JSON",
        };
      }
      const data = JSON.parse(input);
      return {
        output: yamlDump(data, { lineWidth: 100 }),
        ok: true,
        message: "Converted to YAML",
      };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Conversion failed",
      };
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ModeTabs
          value={mode}
          onChange={(id) => setMode(id as "yaml-json" | "json-yaml")}
          modes={[
            { id: "yaml-json", label: "YAML → JSON" },
            { id: "json-yaml", label: "JSON → YAML" },
          ]}
        />
        <StatusBadge ok={ok} message={message} />
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
            downloadName={mode === "yaml-json" ? "converted.json" : "converted.yaml"}
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Input">
          <TextArea value={input} onChange={setInput} />
        </Panel>
        <Panel title="Output">
          <TextArea value={output} readOnly />
        </Panel>
      </div>
    </div>
  );
}

export function SqlFormatterTool() {
  const [input, setInput] = useState(
    "select id, name from users where active = 1 order by created_at desc;",
  );
  const { output, ok, message } = useMemo(() => {
    if (!input.trim()) return { output: "", ok: null as boolean | null, message: "" };
    try {
      return {
        output: format(input, { language: "sql", tabWidth: 2, keywordCase: "upper" }),
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

export function HtmlMinifierTool() {
  const [input, setInput] = useState(
    "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Demo</title>\n  </head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>",
  );
  const output = useMemo(() => (input.trim() ? minifyHtml(input) : ""), [input]);
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
  const output = useMemo(() => (input.trim() ? minifyCss(input) : ""), [input]);

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

export function JsBeautifierTool() {
  const [input, setInput] = useState(
    "function hello(name){return `Hello, ${name}!`;}",
  );
  const { output, ok, message } = useMemo(() => {
    if (!input.trim()) return { output: "", ok: null as boolean | null, message: "" };
    try {
      return {
        output: beautifyJs(input, { indent_size: 2, space_in_empty_paren: true }),
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
