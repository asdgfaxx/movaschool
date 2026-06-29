export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
  icon?: string;
  trend?: string;
}

export interface Feature {
  title: string;
  text: string;
  /** Optional lucide icon name (resolved via components/icons/registry). */
  icon?: string;
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
  features: string[];
}

export interface Teacher {
  name: string;
  role: string;
  experience: string;
  photo: string;
  /** Stable id for deep links (?teacher=ID). */
  id?: string;
  /** Languages the teacher speaks, e.g. ["pl","uk","ru"]. */
  languages?: string[];
  /** CEFR levels taught, e.g. ["A1","A2","B1"]. */
  levels?: string[];
  /** Specialties, e.g. ["exam","medical","business"]. */
  specialties?: string[];
  /** Short biography. */
  bio?: string;
}

export interface Step {
  title: string;
  text: string;
  icon?: string;
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
  category?: string;
}

export interface Course {
  id?: string;
  name: string;
  level: string;
  freq: string;
  duration: string;
  price: string;
  icon?: string;
  syllabus?: string[];
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
  recommendedCourses?: string[];
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
    partnership: string;
    cta: string;
    themeToggle: string;
    menu: string;
    skipToContent: string;
    /** Announcement bar text (empty string hides the bar). */
    announcement: string;
    close: string;
    megaLevels: string;
    megaCategories: string;
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
    /** Teacher id (or index) to feature in the hero mockup. */
    teacherId?: string;
    /** Label for the video-call mockup header (e.g. "Google Meet"). */
    meetLabel: string;
    /** "Online" status indicator text. */
    onlineLabel: string;
    /** Level range badge text (e.g. "A1 → B1"). */
    levelRange: string;
    /** Floating side chips with counters/labels. */
    floatingChips: string[];
    platformsLabel: string;
    lessonProgressLabel: string;
    activityLabel: string;
  };
  stats: { items: Stat[] };
  how: { kicker: string; title: string; subtitle: string; items: Feature[] };
  levels: {
    kicker: string;
    title: string;
    subtitle: string;
    items: Level[];
    cta: string;
    youAreHere: string;
    testPrompt: string;
  };
  formats: { kicker: string; title: string; subtitle: string; items: FormatItem[] };
  why: { kicker: string; title: string; subtitle: string; items: Feature[] };
  teachersPreview: { kicker: string; title: string; subtitle: string; cta: string };
  teachers: Teacher[];
  steps: { kicker: string; title: string; subtitle: string; items: Step[] };
  reviews: { kicker: string; title: string; subtitle: string; items: Review[]; videoLabel: string };
  faq: { kicker: string; title: string; subtitle: string; items: Faq[]; categories: { id: string; label: string }[]; ctaTitle: string; ctaText: string; ctaButton: string; searchPlaceholder: string; noResults: string };
  lead: {
    kicker: string;
    title: string;
    subtitle: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    promo: string;
    course: string;
    coursePh: string;
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
    invalidPhone: string;
    consent: string;
  };
  finalCta: { title: string; subtitle: string; primary: string; secondary: string; phoneLabel: string; urgencyText: string; urgencyValue: string };
  footer: {
    tagline: string;
    columns: { title: string; links: NavItem[] }[];
    contactTitle: string;
    paymentsTitle: string;
    /** Payment method keys; mapped to /payments/<key>.png in the footer. */
    payments: string[];
    rights: string;
    newsletter: {
      title: string;
      placeholder: string;
      submit: string;
      success: string;
      invalidEmail: string;
    };
    backToTop: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    hours: string;
    address: string;
    whatsapp: string;
    telegram: string;
  };
  blog: {
    kicker: string;
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
      filterLevel: string;
      filterCategory: string;
      filterReset: string;
      resultsCount: string;
      viewGrid: string;
      viewTable: string;
      notFoundTitle: string;
      notFoundText: string;
      notFoundCta: string;
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
      timerLabel: string;
      audioLabel: string;
      audioSoon: string;
      shareLabel: string;
      shareCopied: string;
      leadTitle: string;
      leadText: string;
      leadName: string;
      leadEmail: string;
      leadSubmit: string;
      leadSuccess: string;
      questions: QuizQuestion[];
      results: QuizResult[];
    };
    contact: { title: string; subtitle: string; reachUs: string };
    partnership: {
      title: string;
      subtitle: string;
      intro: string;
      kicker: string;
      perks: Feature[];
      calculatorTitle: string;
      calculatorRate: string;
      calculatorStudentsLabel: string;
      calculatorCommissionLabel: string;
      calculatorTiers: { min: number; rate: number }[];
      partnersTitle: string;
      partners: { name: string }[];
      cta: string;
      ctaButton: string;
    };
    b1: { title: string; subtitle: string; intro: string; topics: Feature[]; cta: string };
    business: {
      title: string;
      subtitle: string;
      intro: string;
      badge: string;
      benefits: Feature[];
      packagesTitle: string;
      packages: {
        name: string;
        tagline: string;
        price: string;
        features: string[];
        highlighted: boolean;
        badge?: string;
      }[];
      packageCta: string;
      processTitle: string;
      process: Step[];
      stats: Stat[];
      casesTitle: string;
      cases: { title: string; text: string; result: string }[];
      faqTitle: string;
      faq: Faq[];
      ctaTitle: string;
      ctaText: string;
      ctaButton: string;
      home: { kicker: string; title: string; text: string; button: string; points: string[]; progress: { label: string; value: number }[]; stats: Stat[]; resultsLabel: string; byIndustryLabel: string };
    };
    legal: { privacy: LegalDoc; refund: LegalDoc; terms: LegalDoc };
  };
}
