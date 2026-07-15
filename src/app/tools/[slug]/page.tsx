import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolShell } from "@/components/ToolShell";
import { ToolRenderer } from "@/components/tools/ToolRenderer";
import { getToolBySlug, tools } from "@/lib/tools";
import {
  breadcrumbJsonLd,
  softwareAppJsonLd,
  toolMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return toolMetadata(tool);
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareAppJsonLd(tool)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Tools", path: "/#tools" },
              { name: tool.name, path: `/tools/${tool.slug}` },
            ]),
          ),
        }}
      />
      <ToolShell tool={tool}>
        <ToolRenderer slug={tool.slug} />
      </ToolShell>
    </>
  );
}
