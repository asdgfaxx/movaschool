import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllSlugs, getPost, getPosts } from "@/content/blog";
import { SITE_NAME } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { BlogCover } from "@/components/blog/blog-cover";
import { buttonClasses } from "@/components/ui/button";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(isLocale(locale) ? locale : "pl", slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);
  const post = getPost(loc, slug);
  if (!post) notFound();

  const fmt = new Intl.DateTimeFormat(loc === "ru" ? "ru-RU" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const related = getPosts(loc)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: loc,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <article className="pt-28 lg:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <Link
          href={`/${loc}/blog`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {dict.blog.back}
        </Link>

        <Reveal className="mt-6">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] text-balance sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{fmt.format(new Date(post.date))}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {post.readMinutes} {dict.blog.minRead}
            </span>
          </div>
        </Reveal>

        <BlogCover from={post.cover[0]} to={post.cover[1]} className="mt-8 h-48 rounded-3xl sm:h-64" />

        <div className="mt-10 flex flex-col gap-7">
          {post.body.map((section, i) => (
            <section key={i} className="flex flex-col gap-3">
              {section.heading && <h2 className="text-xl font-bold sm:text-2xl">{section.heading}</h2>}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2">
                  {section.list.map((item, j) => (
                    <li key={j} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-[linear-gradient(130deg,var(--primary),var(--secondary))] p-8 text-center text-primary-foreground shadow-clay">
          <h2 className="text-2xl font-extrabold">{dict.blog.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-white/85">{dict.blog.ctaText}</p>
          <Link
            href={`/${loc}/contact`}
            className={buttonClasses({ variant: "white", size: "lg", className: "mt-6" })}
          >
            {dict.blog.ctaButton}
          </Link>
        </div>

        {/* Related */}
        <div className="mt-14">
          <h2 className="text-xl font-bold">{dict.blog.related}</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/${loc}/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-clay"
              >
                <BlogCover from={p.cover[0]} to={p.cover[1]} className="h-28" />
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="font-bold leading-snug transition-colors group-hover:text-primary">
                    {p.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {dict.blog.readMore}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
