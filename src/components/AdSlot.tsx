import Script from "next/script";
import { siteConfig } from "@/lib/site";

/** Loads AdSense script once site-wide. Replace publisher ID in site config. */
export function AdSenseScript() {
  if (
    !siteConfig.adsensePublisherId ||
    siteConfig.adsensePublisherId.includes("XXXXXXXX")
  ) {
    return null;
  }

  return (
    <Script
      id="adsense-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
      crossOrigin="anonymous"
    />
  );
}

export function AdSlot({
  slot,
  className = "",
}: {
  slot: string;
  className?: string;
}) {
  const isPlaceholder =
    !siteConfig.adsensePublisherId ||
    siteConfig.adsensePublisherId.includes("XXXXXXXX");

  if (isPlaceholder) {
    return (
      <div
        className={`flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/60 px-4 text-center text-xs text-slate-400 ${className}`}
        aria-hidden="true"
        data-ad-slot={slot}
      >
        Advertisement placeholder — connect Google AdSense in site config
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={siteConfig.adsensePublisherId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
