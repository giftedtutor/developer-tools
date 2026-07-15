export const siteConfig = {
  name: "CS Dev Tools",
  tagline: "Fast, private developer tools in your browser",
  description:
    "Free online developer tools for formatting, validating, encoding, and transforming JSON, SQL, YAML, JWT, Base64, Markdown, and more. All processing runs locally in your browser.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://developer-tools.thecodesplitter.com",
  email: "thecodesplitters@gmail.com",
  locale: "en_US",
  twitterHandle: "@codesplitters",
  adsensePublisherId:
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID ||
    "ca-pub-XXXXXXXXXXXXXXXX",
} as const;
