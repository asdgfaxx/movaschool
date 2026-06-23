import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Levels } from "@/components/sections/levels";
import { Formats } from "@/components/sections/formats";
import { BusinessTeaser } from "@/components/sections/business-teaser";
import { WhyUs } from "@/components/sections/why-us";
import { TeachersPreview } from "@/components/sections/teachers-preview";
import { Steps } from "@/components/sections/steps";
import { Reviews } from "@/components/sections/reviews";
import { Faq } from "@/components/sections/faq";
import { LeadForm } from "@/components/sections/lead-form";
import { FinalCta } from "@/components/sections/final-cta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = isLocale(locale) ? locale : "pl";
  const dict = await getDictionary(loc);

  return (
    <>
      <Hero locale={loc} dict={dict} />
      <Stats dict={dict} />
      <HowItWorks dict={dict} />
      <Levels locale={loc} dict={dict} />
      <Formats dict={dict} />
      <BusinessTeaser locale={loc} dict={dict} />
      <WhyUs dict={dict} />
      <TeachersPreview locale={loc} dict={dict} />
      <Steps dict={dict} />
      <Reviews dict={dict} />
      <Faq dict={dict} />
      <LeadForm dict={dict} />
      <FinalCta locale={loc} dict={dict} />
    </>
  );
}
