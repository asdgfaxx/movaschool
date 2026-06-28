import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
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
      {/* Unique hero with gradient pattern background */}
      <section className="relative overflow-hidden border-b border-border bg-surface pb-12 pt-32 lg:pt-40">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Aurora blobs */}
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />
          <div className="absolute -right-10 top-10 h-64 w-64 rounded-full bg-secondary/8 blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          {/* Decorative book-cover shapes */}
          <div className="absolute right-8 top-16 hidden h-24 w-16 rotate-12 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 lg:block" />
          <div className="absolute right-24 top-24 hidden h-28 w-16 -rotate-6 rounded-lg bg-gradient-to-br from-secondary/15 to-accent/15 lg:block" />
          <div className="absolute right-40 top-12 hidden h-20 w-14 rotate-3 rounded-lg bg-gradient-to-br from-accent/15 to-primary/15 lg:block" />
        </div>
        <Container className="relative text-center">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <BookOpen className="h-4 w-4" />
              {dict.blog.kicker}
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-balance sm:text-5xl">{dict.blog.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{dict.blog.subtitle}</p>
          </Reveal>
        </Container>
      </section>
      <BlogExplorer posts={posts} locale={loc} dict={dict} />
    </>
  );
}
