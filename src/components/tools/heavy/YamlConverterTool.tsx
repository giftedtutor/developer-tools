"use client";

import { useMemo, useState } from "react";
import { load as yamlLoad, dump as yamlDump } from "js-yaml";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea, ModeTabs } from "../shared";

export function YamlConverterTool() {
  const [mode, setMode] = useState<"yaml-json" | "json-yaml">("yaml-json");
  const [input, setInput] = useState(
    "name: CS Dev Tools\nfeatures:\n  - privacy\n  - speed\n",
  );

  const { output, ok, message } = useMemo(() => {
    if (!input.trim())
      return { output: "", ok: null as boolean | null, message: "" };
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
            downloadName={
              mode === "yaml-json" ? "converted.json" : "converted.yaml"
            }
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
