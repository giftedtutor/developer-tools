"use client";

import { JsonFormatterTool, JsonValidatorTool } from "./JsonTools";
import {
  XmlFormatterTool,
  YamlConverterTool,
  SqlFormatterTool,
  HtmlMinifierTool,
  CssMinifierTool,
  JsBeautifierTool,
} from "./FormatTools";
import {
  Base64Tool,
  JwtDecoderTool,
  HashGeneratorTool,
  UrlEncoderTool,
  UuidGeneratorTool,
} from "./EncodeTools";
import { RegexTesterTool, MarkdownEditorTool } from "./EditorTools";
import {
  TimestampConverterTool,
  CaseConverterTool,
  TextDiffTool,
  ColorConverterTool,
  PasswordGeneratorTool,
  LoremIpsumTool,
  NumberBaseTool,
} from "./ExtraTools";

const registry: Record<string, React.ComponentType> = {
  "json-formatter": JsonFormatterTool,
  "json-validator": JsonValidatorTool,
  "xml-formatter": XmlFormatterTool,
  "yaml-converter": YamlConverterTool,
  "sql-formatter": SqlFormatterTool,
  base64: Base64Tool,
  "jwt-decoder": JwtDecoderTool,
  "hash-generator": HashGeneratorTool,
  "uuid-generator": UuidGeneratorTool,
  "regex-tester": RegexTesterTool,
  "url-encoder": UrlEncoderTool,
  "html-minifier": HtmlMinifierTool,
  "css-minifier": CssMinifierTool,
  "js-beautifier": JsBeautifierTool,
  "markdown-editor": MarkdownEditorTool,
  "timestamp-converter": TimestampConverterTool,
  "case-converter": CaseConverterTool,
  "text-diff": TextDiffTool,
  "color-converter": ColorConverterTool,
  "password-generator": PasswordGeneratorTool,
  "lorem-ipsum": LoremIpsumTool,
  "number-base": NumberBaseTool,
};

export function ToolRenderer({ slug }: { slug: string }) {
  const Component = registry[slug];
  if (!Component) {
    return (
      <p className="text-sm text-rose-700">
        This tool is not available yet.
      </p>
    );
  }
  return <Component />;
}
