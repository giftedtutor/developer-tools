# CodeSplitters — Developer Tools

Free, privacy-friendly online developer tools built with Next.js.

## Features

- 20+ tools (JSON, SQL, YAML, JWT, Base64, Regex, Markdown, and more)
- Fully responsive UI with professional header/footer branding
- SEO: Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt
- Google AdSense ready (privacy policy, ads.txt, contact email)
- Client-side processing — pasted content stays in the browser

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## AdSense setup

1. Replace `adsensePublisherId` in `src/lib/site.ts` with your `ca-pub-...` ID.
2. Update `src/app/ads.txt/route.ts` with your publisher number.
3. Update `siteConfig.url` to your production domain.
4. Assign real AdSense slot IDs to `AdSlot` instances.

Contact: **thecodesplitters@gmail.com**
