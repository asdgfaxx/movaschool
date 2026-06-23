import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPosts } from "@/content/blog";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/container";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { BlogCover } from "@/components/blog/blog-cover";

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
  const fmt = new Intl.DateTimeFormat(loc === "ru" ? "ru-RU" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <PageHeader kicker={dict.nav.blog} title={dict.blog.title} subtitle={dict.blog.subtitle} />
      <Container className="pb-12">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link
                href={`/${loc}/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay"
              >
                <BlogCover from={post.cover[0]} to={post.cover[1]} className="h-40">
                  <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/85 px-3 py-1 text-xs font-bold text-slate-900">
                    {post.category}
                  </span>
                </BlogCover>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h2 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>{fmt.format(new Date(post.date))}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readMinutes} {dict.blog.minRead}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {dict.blog.readMore}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </>
  );
}
