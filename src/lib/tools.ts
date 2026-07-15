export type ToolCategory =
  | "formatters"
  | "converters"
  | "encoders"
  | "generators"
  | "testers"
  | "editors";

export type ToolIconName =
  | "braces"
  | "check"
  | "file-code"
  | "file-json"
  | "file-type"
  | "database"
  | "binary"
  | "key-round"
  | "hash"
  | "fingerprint"
  | "regex"
  | "link"
  | "minimize"
  | "paintbrush"
  | "sparkles"
  | "file-text"
  | "clock"
  | "case"
  | "diff"
  | "palette"
  | "key"
  | "type";

export interface ToolDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: ToolCategory;
  icon: ToolIconName;
  keywords: string[];
  featured?: boolean;
}

export const categoryLabels: Record<ToolCategory, string> = {
  formatters: "Formatters",
  converters: "Converters",
  encoders: "Encoders & Decoders",
  generators: "Generators",
  testers: "Testers",
  editors: "Editors",
};

export const tools: ToolDefinition[] = [
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    shortDescription: "Beautify and format JSON with indentation.",
    description:
      "Paste messy JSON and instantly format it with readable indentation. Validate structure as you type and copy the polished output in one click.",
    category: "formatters",
    icon: "braces",
    keywords: ["json", "pretty print", "beautify", "format json"],
    featured: true,
  },
  {
    slug: "json-validator",
    name: "JSON Validator",
    shortDescription: "Validate JSON and highlight syntax errors.",
    description:
      "Check whether your JSON is valid, see precise error messages with line context, and fix issues before they reach production.",
    category: "testers",
    icon: "check",
    keywords: ["json", "validate", "lint", "syntax"],
    featured: true,
  },
  {
    slug: "xml-formatter",
    name: "XML Formatter",
    shortDescription: "Pretty-print XML for easier reading.",
    description:
      "Format nested XML documents with consistent indentation so tags, attributes, and content are easier to inspect and share.",
    category: "formatters",
    icon: "file-code",
    keywords: ["xml", "pretty print", "format xml"],
  },
  {
    slug: "yaml-converter",
    name: "YAML Converter",
    shortDescription: "Convert between YAML and JSON.",
    description:
      "Convert YAML to JSON and JSON to YAML with reliable parsing. Ideal for configs, Kubernetes manifests, and API examples.",
    category: "converters",
    icon: "file-type",
    keywords: ["yaml", "yml", "json", "convert"],
    featured: true,
  },
  {
    slug: "sql-formatter",
    name: "SQL Formatter",
    shortDescription: "Beautify SQL queries cleanly.",
    description:
      "Reformat SQL statements with consistent keywords, clauses, and indentation to keep queries readable in reviews and docs.",
    category: "formatters",
    icon: "database",
    keywords: ["sql", "query", "pretty print", "format sql"],
    featured: true,
  },
  {
    slug: "base64",
    name: "Base64 Encode/Decode",
    shortDescription: "Encode or decode Base64 strings.",
    description:
      "Encode text to Base64 or decode Base64 back to plain text. Useful for tokens, data URLs, and API payloads.",
    category: "encoders",
    icon: "binary",
    keywords: ["base64", "encode", "decode"],
    featured: true,
  },
  {
    slug: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode JWT header and payload.",
    description:
      "Inspect JSON Web Tokens by decoding the header and payload. Claims stay in your browser — nothing is sent to a server.",
    category: "encoders",
    icon: "key-round",
    keywords: ["jwt", "token", "decode", "claims"],
    featured: true,
  },
  {
    slug: "hash-generator",
    name: "Hash Generator",
    shortDescription: "Generate MD5, SHA-1, SHA-256 hashes.",
    description:
      "Create cryptographic hashes from text using MD5, SHA-1, SHA-256, and SHA-512 for checksums, fingerprints, and quick verification.",
    category: "generators",
    icon: "hash",
    keywords: ["hash", "md5", "sha256", "checksum"],
  },
  {
    slug: "uuid-generator",
    name: "UUID Generator",
    shortDescription: "Generate UUID v4 identifiers.",
    description:
      "Generate one or many UUID v4 values instantly for databases, APIs, and unique record IDs.",
    category: "generators",
    icon: "fingerprint",
    keywords: ["uuid", "guid", "unique id"],
  },
  {
    slug: "regex-tester",
    name: "Regex Tester",
    shortDescription: "Test regular expressions live.",
    description:
      "Write a pattern, add flags, and see matches highlight against sample text in real time with clear match details.",
    category: "testers",
    icon: "regex",
    keywords: ["regex", "regexp", "pattern", "match"],
    featured: true,
  },
  {
    slug: "url-encoder",
    name: "URL Encoder/Decoder",
    shortDescription: "Encode or decode URL components.",
    description:
      "Percent-encode unsafe characters for query strings and paths, or decode encoded URLs back into readable text.",
    category: "encoders",
    icon: "link",
    keywords: ["url", "uri", "encode", "percent encoding"],
  },
  {
    slug: "html-minifier",
    name: "HTML Minifier",
    shortDescription: "Minify HTML by removing whitespace.",
    description:
      "Compress HTML markup by stripping comments and unnecessary whitespace to shrink payloads for faster delivery.",
    category: "formatters",
    icon: "minimize",
    keywords: ["html", "minify", "compress"],
  },
  {
    slug: "css-minifier",
    name: "CSS Minifier",
    shortDescription: "Compress CSS for production.",
    description:
      "Minify stylesheets by removing comments and extra spaces so CSS bundles stay lean without changing selectors.",
    category: "formatters",
    icon: "paintbrush",
    keywords: ["css", "minify", "compress"],
  },
  {
    slug: "js-beautifier",
    name: "JavaScript Beautifier",
    shortDescription: "Beautify JavaScript source code.",
    description:
      "Reformat minified or messy JavaScript with consistent indentation and spacing for easier debugging and review.",
    category: "formatters",
    icon: "sparkles",
    keywords: ["javascript", "js", "beautify", "format"],
  },
  {
    slug: "markdown-editor",
    name: "Markdown Editor",
    shortDescription: "Write Markdown with live preview.",
    description:
      "Author Markdown with a live HTML preview. Perfect for README files, docs, and quick content drafts.",
    category: "editors",
    icon: "file-text",
    keywords: ["markdown", "md", "preview", "editor"],
    featured: true,
  },
  {
    slug: "timestamp-converter",
    name: "Timestamp Converter",
    shortDescription: "Convert Unix timestamps and dates.",
    description:
      "Convert between Unix timestamps and human-readable dates in local time and UTC for logs and APIs.",
    category: "converters",
    icon: "clock",
    keywords: ["timestamp", "unix", "epoch", "date"],
  },
  {
    slug: "case-converter",
    name: "Case Converter",
    shortDescription: "Convert text between naming cases.",
    description:
      "Switch text between camelCase, snake_case, kebab-case, PascalCase, and more for clean renaming across codebases.",
    category: "converters",
    icon: "case",
    keywords: ["camelcase", "snake_case", "kebab-case", "pascalcase"],
  },
  {
    slug: "text-diff",
    name: "Text Diff Checker",
    shortDescription: "Compare two texts side by side.",
    description:
      "Compare two blocks of text and spot added, removed, or changed lines quickly for configs, snippets, and drafts.",
    category: "testers",
    icon: "diff",
    keywords: ["diff", "compare", "difference"],
  },
  {
    slug: "color-converter",
    name: "Color Converter",
    shortDescription: "Convert HEX, RGB, and HSL colors.",
    description:
      "Convert colors between HEX, RGB, and HSL formats and preview the selected color instantly.",
    category: "converters",
    icon: "palette",
    keywords: ["color", "hex", "rgb", "hsl"],
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    shortDescription: "Generate strong random passwords.",
    description:
      "Create secure random passwords with custom length and character sets for accounts and API secrets.",
    category: "generators",
    icon: "key",
    keywords: ["password", "security", "random"],
  },
  {
    slug: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    shortDescription: "Generate placeholder text paragraphs.",
    description:
      "Generate lorem ipsum placeholder copy for mockups, wireframes, and layout testing.",
    category: "generators",
    icon: "type",
    keywords: ["lorem", "ipsum", "placeholder", "dummy text"],
  },
  {
    slug: "number-base",
    name: "Number Base Converter",
    shortDescription: "Convert binary, octal, decimal, hex.",
    description:
      "Convert numbers between binary, octal, decimal, and hexadecimal bases for low-level debugging and interviews.",
    category: "converters",
    icon: "file-json",
    keywords: ["binary", "hex", "octal", "decimal", "radix"],
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getFeaturedTools(): ToolDefinition[] {
  return tools.filter((tool) => tool.featured);
}

export function getToolsByCategory(): Record<ToolCategory, ToolDefinition[]> {
  return tools.reduce(
    (acc, tool) => {
      acc[tool.category].push(tool);
      return acc;
    },
    {
      formatters: [],
      converters: [],
      encoders: [],
      generators: [],
      testers: [],
      editors: [],
    } as Record<ToolCategory, ToolDefinition[]>,
  );
}

/** Lightweight search records for client bundles (no icon components). */
export type ToolSearchItem = Pick<
  ToolDefinition,
  "slug" | "name" | "shortDescription" | "keywords"
>;

export const toolSearchIndex: ToolSearchItem[] = tools.map(
  ({ slug, name, shortDescription, keywords }) => ({
    slug,
    name,
    shortDescription,
    keywords,
  }),
);
