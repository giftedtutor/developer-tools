"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

function ToolLoading() {
  return (
    <div
      className="h-48 animate-pulse rounded-xl bg-slate-100"
      aria-hidden="true"
    />
  );
}

function lazyTool(
  loader: () => Promise<Record<string, ComponentType>>,
  exportName: string,
) {
  return dynamic(
    () =>
      loader().then((mod) => {
        const Comp = mod[exportName];
        return { default: Comp };
      }),
    { loading: ToolLoading, ssr: false },
  );
}

const registry: Record<string, ComponentType> = {
  "json-formatter": lazyTool(() => import("./JsonTools"), "JsonFormatterTool"),
  "json-validator": lazyTool(() => import("./JsonTools"), "JsonValidatorTool"),
  "xml-formatter": lazyTool(() => import("./FormatTools"), "XmlFormatterTool"),
  "yaml-converter": lazyTool(
    () => import("./heavy/YamlConverterTool"),
    "YamlConverterTool",
  ),
  "sql-formatter": lazyTool(
    () => import("./heavy/SqlFormatterTool"),
    "SqlFormatterTool",
  ),
  base64: lazyTool(() => import("./EncodeTools"), "Base64Tool"),
  "jwt-decoder": lazyTool(() => import("./EncodeTools"), "JwtDecoderTool"),
  "hash-generator": lazyTool(() => import("./EncodeTools"), "HashGeneratorTool"),
  "uuid-generator": lazyTool(() => import("./EncodeTools"), "UuidGeneratorTool"),
  "regex-tester": lazyTool(() => import("./EditorTools"), "RegexTesterTool"),
  "url-encoder": lazyTool(() => import("./EncodeTools"), "UrlEncoderTool"),
  "html-minifier": lazyTool(() => import("./FormatTools"), "HtmlMinifierTool"),
  "css-minifier": lazyTool(() => import("./FormatTools"), "CssMinifierTool"),
  "js-beautifier": lazyTool(
    () => import("./heavy/JsBeautifierTool"),
    "JsBeautifierTool",
  ),
  "markdown-editor": lazyTool(
    () => import("./heavy/MarkdownEditorTool"),
    "MarkdownEditorTool",
  ),
  "timestamp-converter": lazyTool(
    () => import("./ExtraTools"),
    "TimestampConverterTool",
  ),
  "case-converter": lazyTool(() => import("./ExtraTools"), "CaseConverterTool"),
  "text-diff": lazyTool(() => import("./ExtraTools"), "TextDiffTool"),
  "color-converter": lazyTool(
    () => import("./ExtraTools"),
    "ColorConverterTool",
  ),
  "password-generator": lazyTool(
    () => import("./ExtraTools"),
    "PasswordGeneratorTool",
  ),
  "lorem-ipsum": lazyTool(() => import("./ExtraTools"), "LoremIpsumTool"),
  "number-base": lazyTool(() => import("./ExtraTools"), "NumberBaseTool"),
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = registry[slug];
  if (!Component) {
    return (
      <p className="text-sm text-rose-700">This tool is not available yet.</p>
    );
  }
  return <Component />;
}
