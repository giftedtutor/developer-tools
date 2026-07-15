"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "cs-cookie-ack";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.45)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-slate-600">
          We use cookies for analytics and Google AdSense ads. See our{" "}
          <Link href="/privacy" className="font-medium text-teal-700 underline">
            Privacy Policy
          </Link>{" "}
          for details and opt-out links.
        </p>
        <button
          type="button"
          className="btn-primary shrink-0"
          onClick={() => {
            try {
              localStorage.setItem(KEY, "1");
            } catch {
              /* ignore */
            }
            setVisible(false);
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
