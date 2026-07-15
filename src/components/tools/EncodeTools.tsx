"use client";

import { useEffect, useMemo, useState } from "react";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { md5, shaHash } from "@/lib/utils";
import { Panel, TextArea, ModeTabs, Field } from "./shared";

export function Base64Tool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("Hello, CodeSplitters!");

  const { output, ok, message } = useMemo(() => {
    if (!input) return { output: "", ok: null as boolean | null, message: "" };
    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        return { output: encoded, ok: true, message: "Encoded" };
      }
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      return { output: decoded, ok: true, message: "Decoded" };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "Base64 error",
      };
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ModeTabs
          value={mode}
          onChange={(id) => setMode(id as "encode" | "decode")}
          modes={[
            { id: "encode", label: "Encode" },
            { id: "decode", label: "Decode" },
          ]}
        />
        <StatusBadge ok={ok} message={message} />
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
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

function decodeJwtPart(part: string) {
  const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );
  return JSON.parse(decodeURIComponent(escape(atob(padded))));
}

export function JwtDecoderTool() {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNvZGVTcGxpdHRlcnMiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  );

  const result = useMemo(() => {
    if (!token.trim()) {
      return { ok: null as boolean | null, message: "", header: "", payload: "" };
    }
    try {
      const parts = token.trim().split(".");
      if (parts.length < 2) throw new Error("JWT must have at least two parts");
      const header = JSON.stringify(decodeJwtPart(parts[0]), null, 2);
      const payload = JSON.stringify(decodeJwtPart(parts[1]), null, 2);
      return { ok: true, message: "Decoded (signature not verified)", header, payload };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : "Invalid JWT",
        header: "",
        payload: "",
      };
    }
  }, [token]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge ok={result.ok} message={result.message} />
        <div className="ml-auto">
          <ToolActions onClear={() => setToken("")} />
        </div>
      </div>
      <Panel title="JWT">
        <TextArea value={token} onChange={setToken} rows={5} />
      </Panel>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel
          title="Header"
          actions={
            <ToolActions copyValue={result.header} disableCopy={!result.header} />
          }
        >
          <TextArea value={result.header} readOnly rows={10} />
        </Panel>
        <Panel
          title="Payload"
          actions={
            <ToolActions copyValue={result.payload} disableCopy={!result.payload} />
          }
        >
          <TextArea value={result.payload} readOnly rows={10} />
        </Panel>
      </div>
      <p className="text-xs text-slate-500">
        This tool only decodes the token parts. It does not verify signatures.
      </p>
    </div>
  );
}

export function HashGeneratorTool() {
  const [input, setInput] = useState("CodeSplitters");
  const [hashes, setHashes] = useState({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!input) {
        setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
        return;
      }
      const [sha1, sha256, sha512] = await Promise.all([
        shaHash("SHA-1", input),
        shaHash("SHA-256", input),
        shaHash("SHA-512", input),
      ]);
      if (!cancelled) {
        setHashes({
          md5: md5(input),
          sha1,
          sha256,
          sha512,
        });
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div className="space-y-4">
      <Panel title="Input text">
        <TextArea value={input} onChange={setInput} rows={6} />
      </Panel>
      <div className="grid gap-3">
        {(
          [
            ["MD5", hashes.md5],
            ["SHA-1", hashes.sha1],
            ["SHA-256", hashes.sha256],
            ["SHA-512", hashes.sha512],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-slate-50/60 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </span>
              <ToolActions copyValue={value} disableCopy={!value} />
            </div>
            <p className="break-all font-mono text-xs text-slate-800 sm:text-sm">
              {value || "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UrlEncoderTool() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("https://codesplitters.com/?q=hello world");

  const { output, ok, message } = useMemo(() => {
    if (!input) return { output: "", ok: null as boolean | null, message: "" };
    try {
      if (mode === "encode") {
        return {
          output: encodeURIComponent(input),
          ok: true,
          message: "Encoded",
        };
      }
      return {
        output: decodeURIComponent(input),
        ok: true,
        message: "Decoded",
      };
    } catch (e) {
      return {
        output: "",
        ok: false,
        message: e instanceof Error ? e.message : "URL error",
      };
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ModeTabs
          value={mode}
          onChange={(id) => setMode(id as "encode" | "decode")}
          modes={[
            { id: "encode", label: "Encode" },
            { id: "decode", label: "Decode" },
          ]}
        />
        <StatusBadge ok={ok} message={message} />
        <div className="ml-auto">
          <ToolActions
            onClear={() => setInput("")}
            copyValue={output}
            disableCopy={!output}
          />
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Input">
          <TextArea value={input} onChange={setInput} rows={8} />
        </Panel>
        <Panel title="Output">
          <TextArea value={output} readOnly rows={8} />
        </Panel>
      </div>
    </div>
  );
}

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);

  function generate(n = count) {
    const next = Array.from({ length: Math.min(Math.max(n, 1), 100) }, () =>
      crypto.randomUUID(),
    );
    setUuids(next);
  }

  useEffect(() => {
    generate(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joined = uuids.join("\n");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="How many">
          <input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-28 rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </Field>
        <button type="button" className="btn-primary" onClick={() => generate()}>
          Generate
        </button>
        <div className="ml-auto">
          <ToolActions copyValue={joined} disableCopy={!joined} />
        </div>
      </div>
      <Panel title="UUIDs (v4)">
        <TextArea value={joined} readOnly rows={12} />
      </Panel>
    </div>
  );
}
