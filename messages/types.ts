export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Feature {
  title: string;
  text: string;
}

export interface Level {
  code: string;
  name: string;
  blurb: string;
}

export interface FormatItem {
  key: "stationary" | "online" | "video";
  title: string;
  text: string;
  tag: string;
}

export interface Teacher {
  name: string;
  role: string;
  experience: string;
  photo: string;
}

export interface Step {
  title: string;
  text: string;
}

export interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  platform: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Course {
  name: string;
  level: string;
  freq: string;
  duration: string;
  price: string;
}

export interface CourseGroup {
  id: string;
  title: string;
  blurb: string;
  courses: Course[];
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  prompt: string;
  hint: string;
  options: QuizOption[];
}

export interface QuizResult {
  min: number;
  code: string;
  title: string;
  text: string;
  recommend: string;
}

export interface LegalDoc {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    courses: string;
    teachers: string;
    levelTest: string;
    business: string;
    blog: string;
    contact: string;
    cta: string;
    themeToggle: string;
    menu: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    note: string;
    floatingCards: string[];
  };
  stats: { items: Stat[] };
  how: { kicker: string; title: string; subtitle: string; items: Feature[] };
  levels: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Level[];
    cta: string;
  };
  formats: { kicker: string; title: string; subtitle: string; items: FormatItem[] };
  why: { kicker: string; title: string; subtitle: string; items: Feature[] };
  teachersPreview: { kicker: string; title: string; subtitle: string; cta: string };
  teachers: Teacher[];
  steps: { kicker: string; title: string; subtitle: string; items: Step[] };
  reviews: { kicker: string; title: string; subtitle: string; items: Review[] };
  faq: { kicker: string; title: string; subtitle: string; items: Faq[] };
  lead: {
    kicker: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    promo: string;
    namePh: string;
    emailPh: string;
    phonePh: string;
    messagePh: string;
    promoPh: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    errorText: string;
    required: string;
    invalidEmail: string;
  };
  finalCta: { title: string; subtitle: string; primary: string; secondary: string };
  footer: {
    tagline: string;
    columns: { title: string; links: NavItem[] }[];
    contactTitle: string;
    paymentsTitle: string;
    rights: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    hours: string;
    address: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    minRead: string;
    back: string;
    related: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  pages: {
    courses: {
      title: string;
      subtitle: string;
      groups: CourseGroup[];
      headCourse: string;
      headFreq: string;
      headDuration: string;
      headPrice: string;
      cta: string;
    };
    teachers: { title: string; subtitle: string };
    levelTest: {
      title: string;
      subtitle: string;
      start: string;
      question: string;
      of: string;
      next: string;
      finish: string;
      restart: string;
      resultLead: string;
      recommendLabel: string;
      goCourses: string;
      questions: QuizQuestion[];
      results: QuizResult[];
    };
    contact: { title: string; subtitle: string; reachUs: string };
    partnership: {
      title: string;
      subtitle: string;
      intro: string;
      perks: Feature[];
      cta: string;
    };
    b1: { title: string; subtitle: string; intro: string; topics: Feature[]; cta: string };
    business: {
      title: string;
      subtitle: string;
      intro: string;
      benefits: Feature[];
      packagesTitle: string;
      packages: {
        name: string;
        tagline: string;
        features: string[];
        highlighted: boolean;
        badge?: string;
      }[];
      packageCta: string;
      processTitle: string;
      process: Step[];
      stats: Stat[];
      ctaTitle: string;
      ctaText: string;
      ctaButton: string;
      home: { kicker: string; title: string; text: string; button: string; points: string[] };
    };
    legal: { privacy: LegalDoc; refund: LegalDoc; terms: LegalDoc };
  };
}
