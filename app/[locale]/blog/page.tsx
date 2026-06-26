import type { Metadata } from "next";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPosts } from "@/content/blog";
import { PageHeader } from "@/components/sections/page-header";
import { BlogExplorer } from "@/components/sections/blog-explorer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return { title: dict.blog.title, description: dict.blog.subtitle };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const posts = getPosts(loc);

  return (
    <>
      <PageHeader kicker={dict.nav.blog} title={dict.blog.title} subtitle={dict.blog.subtitle} />
      <BlogExplorer posts={posts} locale={loc} dict={dict} />
    </>
  );
}
