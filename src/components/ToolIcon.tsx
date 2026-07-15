import type { LucideIcon } from "lucide-react";
import {
  Braces,
  CheckCircle2,
  FileCode2,
  FileJson2,
  FileType2,
  Database,
  Binary,
  KeyRound,
  Hash,
  Fingerprint,
  Regex,
  Link2,
  Minimize2,
  Paintbrush,
  Sparkles,
  FileText,
  Clock,
  CaseSensitive,
  Diff,
  Palette,
  Key,
  Type,
} from "lucide-react";
import type { ToolIconName } from "@/lib/tools";

const icons: Record<ToolIconName, LucideIcon> = {
  braces: Braces,
  check: CheckCircle2,
  "file-code": FileCode2,
  "file-json": FileJson2,
  "file-type": FileType2,
  database: Database,
  binary: Binary,
  "key-round": KeyRound,
  hash: Hash,
  fingerprint: Fingerprint,
  regex: Regex,
  link: Link2,
  minimize: Minimize2,
  paintbrush: Paintbrush,
  sparkles: Sparkles,
  "file-text": FileText,
  clock: Clock,
  case: CaseSensitive,
  diff: Diff,
  palette: Palette,
  key: Key,
  type: Type,
};

export function ToolIcon({
  name,
  className,
}: {
  name: ToolIconName;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden="true" />;
}
