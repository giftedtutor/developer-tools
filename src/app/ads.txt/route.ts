import { siteConfig } from "@/lib/site";

export function GET() {
  const lines = [
    `# ads.txt for ${siteConfig.name}`,
    `# Replace XXXXXXXXXXXXXXXX with your Google AdSense publisher ID (numbers only)`,
    `# Format: google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`,
    "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0",
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
