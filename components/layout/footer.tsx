import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, Phone } from "lucide-react";
import { Instagram, TikTok, Telegram, Youtube } from "@/components/icons/social";
import { Logo } from "./logo";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "./newsletter-form";
import { BackToTop } from "./back-to-top";
import { SOCIAL } from "@/lib/site";
import type { Dictionary } from "@/messages/types";

const SOCIAL_LINKS = [
  { icon: Instagram, href: SOCIAL.instagram, label: "Instagram" },
  { icon: Youtube, href: SOCIAL.youtube, label: "YouTube" },
  { icon: TikTok, href: SOCIAL.tiktok, label: "TikTok" },
  { icon: Telegram, href: SOCIAL.telegram, label: "Telegram" },
] as const;

export function Footer({ locale, dict }: { locale: string; dict: Dictionary }) {
  const { footer, contactInfo } = dict;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-border bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo locale={locale} />
            <p className="max-w-xs text-sm text-muted-foreground">{footer.tagline}</p>
            <NewsletterForm
              title={footer.newsletter.title}
              placeholder={footer.newsletter.placeholder}
              submit={footer.newsletter.submit}
              success={footer.newsletter.success}
              invalidEmail={footer.newsletter.invalidEmail}
            />
            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-2">
          <div className="flex flex-col gap-2.5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{footer.contactTitle}</h3>
            <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <Mail className="h-4 w-4" /> {contactInfo.email}
            </a>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <Phone className="h-4 w-4" /> {contactInfo.phone}
            </a>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> {contactInfo.hours}
            </span>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">{footer.paymentsTitle}</h3>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {footer.payments.map((p) => (
                <span key={p} className="inline-flex h-8 w-12 items-center justify-center rounded-md bg-white p-1 ring-1 ring-border">
                  <Image src={`/payments/${p}.png`} alt={p} width={40} height={24} className="h-auto w-full object-contain" />
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          © {year} MOVASchool. {footer.rights}
        </p>
      </Container>

      <BackToTop label={footer.backToTop} />
    </footer>
  );
}
