import { wisp } from "@/lib/wisp";
import Link from "next/link";
import { FullWidthHero } from "../../components/FullWidthHero";
import { Metadata } from "next";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";

export const metadata: Metadata = {
  title: `Blog post categories`,
  description: `List of all categories on ${config.organization}`,
  openGraph: {
    title: `Blog post categories`,
    description: `List of all blog post categories on ${config.organization}`,
    images: [getOgImageUrl(`Blog Post Categories`)],
  },
};

export default async function Page() {
  const result = await wisp.getTags();

  return (
    <>
      <FullWidthHero
        title="Categories"
        description="Browse blog posts by category"
        breadcrumb={[
          { label: "Blog", href: "/" },
          { label: "Category", href: `/category/` },
        ]}
      />
      <div className="container mx-auto text-xl">
        {result.tags.map((tag) => (
          <Link key={tag.id} href={`/category/${tag.name}`}>
            <div className="inline-block mr-4 mt-2">#{tag.name}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
