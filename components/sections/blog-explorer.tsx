"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Search } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { BlogCover } from "@/components/blog/blog-cover";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/content/blog";
import type { Dictionary } from "@/messages/types";

export function BlogExplorer({
  posts,
  locale,
  dict,
}: {
  posts: BlogPost[];
  locale: string;
  dict: Dictionary;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [posts]);

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = category === "all" || p.category === category;
      const matchQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        p.tags?.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [posts, query, category]);

  const fmt = new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hasFilters = category !== "all" || query !== "";

  return (
    <Container className="pb-12">
      {/* Featured post */}
      {!hasFilters && featured && (
        <Reveal className="mb-10">
          <Link
            href={`/${locale}/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-border bg-surface shadow-soft transition-all duration-300 hover:shadow-clay lg:grid-cols-2"
          >
            <BlogCover from={featured.cover[0]} to={featured.cover[1]} className="h-64 lg:h-auto">
              <span className="absolute left-4 top-4 inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                {locale === "ru" ? "Рекомендуем" : "Polecane"}
              </span>
            </BlogCover>
            <div className="flex flex-col gap-3 p-8">
              <span className="text-xs font-bold uppercase tracking-wide text-primary">{featured.category}</span>
              <h2 className="text-2xl font-extrabold leading-snug transition-colors group-hover:text-primary">
                {featured.title}
              </h2>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{featured.excerpt}</p>
              <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                <span>{fmt.format(new Date(featured.date))}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readMinutes} {dict.blog.minRead}
                </span>
              </div>
              {featured.author && (
                <span className="text-xs text-muted-foreground">{locale === "ru" ? "Автор" : "Autor"}: {featured.author}</span>
              )}
            </div>
          </Link>
        </Reveal>
      )}

      {/* Filter bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[180px] flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={locale === "ru" ? "Поиск..." : "Szukaj..."}
            className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("all")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              category === "all" ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-muted-foreground hover:text-foreground",
            )}
          >
            {locale === "ru" ? "Все" : "Wszystkie"}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                category === cat ? "bg-primary text-primary-foreground" : "border border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.filter((p) => !(!hasFilters && p === featured)).map((post, i) => (
            <Reveal key={post.slug} delay={Math.min(i * 0.04, 0.3)}>
              <div className="group h-full rounded-2xl">
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-soft transition-shadow duration-300 hover:shadow-clay"
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
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-full bg-surface-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
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
              </div>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="py-20 text-center text-sm text-muted-foreground">
          {locale === "ru" ? "Ничего не найдено" : "Nic nie znaleziono"}
        </p>
      )}
    </Container>
  );
}
