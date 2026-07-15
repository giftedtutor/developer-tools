"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Download, Eraser } from "lucide-react";
import { copyToClipboard, downloadText } from "@/lib/utils";

export function useCopyFeedback(timeout = 1800) {
  const [copied, setCopied] = useState(false);

  async function copy(text: string) {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), timeout);
    }
    return ok;
  }

  return { copied, copy };
}

export function ToolActions({
  onClear,
  onCopy,
  onDownload,
  downloadName,
  copyValue,
  disableCopy,
}: {
  onClear?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  downloadName?: string;
  copyValue?: string;
  disableCopy?: boolean;
}) {
  const { copied, copy } = useCopyFeedback();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {onClear && (
        <button type="button" onClick={onClear} className="btn-ghost">
          <Eraser className="h-4 w-4" />
          Clear
        </button>
      )}
      {(onCopy || copyValue !== undefined) && (
        <button
          type="button"
          disabled={disableCopy}
          onClick={async () => {
            if (onCopy) onCopy();
            if (copyValue !== undefined) await copy(copyValue);
          }}
          className="btn-secondary"
        >
          {copied ? <Check className="h-4 w-4 text-teal-700" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
      {(onDownload || (downloadName && copyValue !== undefined)) && (
        <button
          type="button"
          disabled={disableCopy}
          onClick={() => {
            if (onDownload) onDownload();
            else if (downloadName && copyValue !== undefined) {
              downloadText(downloadName, copyValue);
            }
          }}
          className="btn-ghost"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
      )}
    </div>
  );
}

export function StatusBadge({
  ok,
  message,
}: {
  ok: boolean | null;
  message: string;
}) {
  if (ok === null) return null;
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
        ok
          ? "bg-teal-50 text-teal-800 ring-1 ring-teal-200"
          : "bg-rose-50 text-rose-800 ring-1 ring-rose-200"
      }`}
    >
      {message}
    </span>
  );
}

export function useClientOnly() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
