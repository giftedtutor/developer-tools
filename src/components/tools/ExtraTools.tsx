"use client";

import { useMemo, useState } from "react";
import { ToolActions, StatusBadge } from "@/components/ToolControls";
import { Panel, TextArea, Field } from "./shared";

export function TimestampConverterTool() {
  const [unix, setUnix] = useState(String(Math.floor(Date.now() / 1000)));
  const [iso, setIso] = useState(new Date().toISOString());

  function fromUnix(value: string) {
    setUnix(value);
    const n = Number(value);
    if (!Number.isFinite(n)) return;
    const ms = value.length > 10 ? n : n * 1000;
    const d = new Date(ms);
    if (!Number.isNaN(d.getTime())) setIso(d.toISOString());
  }

  function fromIso(value: string) {
    setIso(value);
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) setUnix(String(Math.floor(d.getTime() / 1000)));
  }

  const local = useMemo(() => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "Invalid date" : d.toString();
  }, [iso]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Unix timestamp (seconds)">
          <input
            value={unix}
            onChange={(e) => fromUnix(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
        <Field label="ISO 8601">
          <input
            value={iso}
            onChange={(e) => fromIso(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
      </div>
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Local time</p>
        <p className="mt-1 font-mono text-xs sm:text-sm">{local}</p>
        <button
          type="button"
          className="btn-secondary mt-3"
          onClick={() => fromUnix(String(Math.floor(Date.now() / 1000)))}
        >
          Use current time
        </button>
      </div>
    </div>
  );
}

function toWords(input: string) {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_\-.]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase());
}

export function CaseConverterTool() {
  const [input, setInput] = useState("helloCode Splitters");
  const words = toWords(input);

  const cases: Record<string, string> = {
    camelCase: words
      .map((w, i) => (i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)))
      .join(""),
    PascalCase: words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(""),
    snake_case: words.join("_"),
    "kebab-case": words.join("-"),
    CONSTANT_CASE: words.map((w) => w.toUpperCase()).join("_"),
    "Title Case": words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    "lower case": words.join(" "),
    "UPPER CASE": words.map((w) => w.toUpperCase()).join(" "),
  };

  return (
    <div className="space-y-4">
      <Panel title="Input">
        <TextArea value={input} onChange={setInput} rows={4} mono={false} />
      </Panel>
      <div className="grid gap-3">
        {Object.entries(cases).map(([label, value]) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-xl border border-slate-200 p-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 break-all font-mono text-sm text-slate-800">
                {value || "—"}
              </p>
            </div>
            <ToolActions copyValue={value} disableCopy={!value} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TextDiffTool() {
  const [a, setA] = useState("alpha\nbeta\ngamma");
  const [b, setB] = useState("alpha\nbravo\ngamma\ndelta");

  const rows = useMemo(() => {
    const left = a.split("\n");
    const right = b.split("\n");
    const max = Math.max(left.length, right.length);
    return Array.from({ length: max }, (_, i) => {
      const l = left[i] ?? "";
      const r = right[i] ?? "";
      let status: "same" | "changed" | "added" | "removed" = "same";
      if (l === r) status = "same";
      else if (!l && r) status = "added";
      else if (l && !r) status = "removed";
      else status = "changed";
      return { l, r, status, n: i + 1 };
    });
  }, [a, b]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Original">
          <TextArea value={a} onChange={setA} rows={10} />
        </Panel>
        <Panel title="Changed">
          <TextArea value={b} onChange={setB} rows={10} />
        </Panel>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2 text-left">#</th>
              <th className="px-3 py-2 text-left">Original</th>
              <th className="px-3 py-2 text-left">Changed</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.n}
                className={
                  row.status === "same"
                    ? "bg-white"
                    : row.status === "added"
                      ? "bg-emerald-50"
                      : row.status === "removed"
                        ? "bg-rose-50"
                        : "bg-amber-50"
                }
              >
                <td className="px-3 py-1.5 font-mono text-xs text-slate-400">
                  {row.n}
                </td>
                <td className="px-3 py-1.5 font-mono text-xs">{row.l}</td>
                <td className="px-3 py-1.5 font-mono text-xs">{row.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function ColorConverterTool() {
  const [hex, setHex] = useState("#0f766e");
  const rgb = hexToRgb(hex) ?? { r: 15, g: 118, b: 110 };
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <Field label="HEX">
          <input
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="w-40 rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
        <input
          type="color"
          value={hexToRgb(hex) ? (hex.startsWith("#") ? hex : `#${hex}`) : "#0f766e"}
          onChange={(e) => setHex(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded-lg border border-slate-200 bg-white p-1"
          aria-label="Pick color"
        />
        <div
          className="h-16 w-full max-w-xs rounded-xl border border-slate-200 shadow-inner sm:w-48"
          style={{ background: hexToRgb(hex) ? hex : "#ccc" }}
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["HEX", hex.startsWith("#") ? hex : `#${hex}`],
          ["RGB", rgbStr],
          ["HSL", hslStr],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase text-slate-500">
                {label}
              </span>
              <ToolActions copyValue={value} />
            </div>
            <p className="font-mono text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  function generate() {
    const sets = [
      upper ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : "",
      lower ? "abcdefghijklmnopqrstuvwxyz" : "",
      numbers ? "0123456789" : "",
      symbols ? "!@#$%^&*()-_=+[]{};:,.?/" : "",
    ].join("");
    if (!sets) {
      setPassword("");
      return;
    }
    const bytes = new Uint32Array(clamp(length, 4, 128));
    crypto.getRandomValues(bytes);
    setPassword(
      Array.from(bytes, (n) => sets[n % sets.length]).join(""),
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={`Length: ${length}`}>
          <input
            type="range"
            min={4}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
        </Field>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["Uppercase", upper, setUpper],
            ["Lowercase", lower, setLower],
            ["Numbers", numbers, setNumbers],
            ["Symbols", symbols, setSymbols],
          ].map(([label, value, setter]) => (
            <label key={label as string} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value as boolean}
                onChange={(e) =>
                  (setter as (v: boolean) => void)(e.target.checked)
                }
              />
              {label as string}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="btn-primary" onClick={generate}>
          Generate password
        </button>
        <ToolActions copyValue={password} disableCopy={!password} />
      </div>
      <Panel title="Password">
        <TextArea value={password} readOnly rows={3} />
      </Panel>
    </div>
  );
}

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState(3);
  const output = useMemo(
    () =>
      Array.from({ length: clamp(paragraphs, 1, 20) }, () => LOREM).join(
        "\n\n",
      ),
    [paragraphs],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <Field label="Paragraphs">
          <input
            type="number"
            min={1}
            max={20}
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-28 rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
        </Field>
        <ToolActions copyValue={output} />
      </div>
      <Panel title="Output">
        <TextArea value={output} readOnly rows={14} mono={false} />
      </Panel>
    </div>
  );
}

export function NumberBaseTool() {
  const [decimal, setDecimal] = useState("255");

  const n = Number(decimal);
  const valid = Number.isInteger(n) && n >= 0;

  const binary = valid ? n.toString(2) : "";
  const octal = valid ? n.toString(8) : "";
  const hex = valid ? n.toString(16).toUpperCase() : "";

  function fromBase(value: string, base: number) {
    if (!value.trim()) {
      setDecimal("");
      return;
    }
    const parsed = parseInt(value.replace(/\s/g, ""), base);
    if (Number.isNaN(parsed)) return;
    setDecimal(String(parsed));
  }

  return (
    <div className="space-y-4">
      <StatusBadge
        ok={decimal === "" ? null : valid}
        message={valid ? "Valid integer" : "Enter a non-negative integer"}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Decimal">
          <input
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
        <Field label="Binary">
          <input
            value={binary}
            onChange={(e) => fromBase(e.target.value, 2)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
        <Field label="Octal">
          <input
            value={octal}
            onChange={(e) => fromBase(e.target.value, 8)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
        <Field label="Hexadecimal">
          <input
            value={hex}
            onChange={(e) => fromBase(e.target.value, 16)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
          />
        </Field>
      </div>
    </div>
  );
}
