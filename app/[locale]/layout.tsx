import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { locales, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { Providers } from "@/components/providers";
import { ThemeScript } from "@/components/layout/theme-script";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { CursorGlow } from "@/components/motion/cursor-glow";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(isLocale(locale) ? locale : "pl");
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: dict.meta.title, template: `%s · ${SITE_NAME}` },
    description: dict.meta.description,
    alternates: {
      languages: { pl: "/pl", ru: "/ru" },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: locale === "ru" ? "ru_RU" : "pl_PL",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  const nav = [
    { label: dict.nav.courses, href: `/${locale}/courses` },
    { label: dict.nav.teachers, href: `/${locale}/teachers` },
    { label: dict.nav.levelTest, href: `/${locale}/level-test` },
    { label: dict.nav.business, href: `/${locale}/business` },
    { label: dict.nav.blog, href: `/${locale}/blog` },
    { label: dict.nav.contact, href: `/${locale}/contact` },
  ];
  const cta = { label: dict.nav.cta, href: `/${locale}/contact` };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Nunito+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            {dict.nav.skipToContent}
          </a>
          <Header
            locale={locale}
            items={nav}
            cta={cta}
            themeLabel={dict.nav.themeToggle}
            menuLabel={dict.nav.menu}
            announcement={dict.nav.announcement}
            coursesGroups={dict.pages.courses.groups}
            closeLabel={dict.nav.close}
            megaLevelsLabel={dict.nav.megaLevels}
            megaCategoriesLabel={dict.nav.megaCategories}
          />
          <main id="main" className="flex-1">{children}</main>
          <Footer locale={locale} dict={dict} />
        </Providers>
      </body>
    </html>
  );
}
