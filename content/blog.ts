import type { Locale } from "@/lib/i18n/config";

export interface BlogSection {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  callout?: { variant: "info" | "warning" | "tip"; text: string };
  quote?: { text: string; cite?: string };
}

export interface BlogPost {
  slug: string;
  date: string;
  readMinutes: number;
  cover: [string, string];
  category: string;
  title: string;
  excerpt: string;
  body: BlogSection[];
  tags?: string[];
  author?: string;
  featured?: boolean;
}

const pl: BlogPost[] = [
  {
    slug: "egzamin-b1-przewodnik",
    date: "2026-05-18",
    readMinutes: 8,
    cover: ["#2563eb", "#6366f1"],
    category: "Egzaminy",
    title: "Egzamin certyfikatowy B1 z polskiego: kompletny przewodnik 2026",
    excerpt:
      "Po co Ci certyfikat B1, jak wygląda egzamin, ile trzeba zdobyć punktów i jak się skutecznie przygotować — wszystko w jednym miejscu.",
    tags: ["B1", "egzamin", "certyfikat"],
    author: "Pani Małgorzata",
    featured: true,
    body: [
      {
        paragraphs: [
          "Państwowy certyfikat z języka polskiego jako obcego to jedyny oficjalny dokument potwierdzający znajomość polskiego. Dla osoby mieszkającej w Polsce poziom B1 jest najważniejszym progiem — i właśnie od niego najczęściej zaczyna się formalna droga do stabilizacji.",
        ],
      },
      {
        heading: "Po co Ci certyfikat B1?",
        paragraphs: ["Certyfikat B1 jest wymagany lub mocno przydatny w kilku kluczowych sytuacjach:"],
        list: [
          "Wniosek o obywatelstwo polskie — certyfikat B1 jest jednym z podstawowych dokumentów.",
          "Karta stałego pobytu / rezydenta długoterminowego UE.",
          "Rekrutacja na studia oraz wymagania pracodawców.",
        ],
      },
      {
        callout: { variant: "tip", text: "Najlepiej zapisać się na egzamin z co najmniej 3-miesięcznym wyprzedzeniem — terminy znikają szybko, zwłaszcza wiosną i jesienią." },
      },
      {
        heading: "Jak wygląda egzamin?",
        paragraphs: [
          "Egzamin składa się z części pisemnej (sobota) i ustnej (niedziela). Sprawdza cztery sprawności językowe: rozumienie ze słuchu, rozumienie tekstów pisanych, poprawność gramatyczną oraz pisanie. Część ustna to rozmowa z komisją.",
        ],
      },
      {
        heading: "Ile punktów trzeba zdobyć?",
        paragraphs: [
          "Aby zdać, musisz uzyskać minimum 50% punktów w każdym module części pisemnej oraz co najmniej 50% z części ustnej. Oznacza to, że nie da się „nadrobić” słabego modułu lepszym wynikiem z innego — każdy element trzeba zaliczyć osobno.",
        ],
      },
      {
        heading: "Plan przygotowań na 8 tygodni",
        list: [
          "Tydzień 1–2: diagnoza poziomu i powtórka gramatyki (przypadki, czasy).",
          "Tydzień 3–5: praca z arkuszami z poprzednich lat — słuchanie i czytanie.",
          "Tydzień 6–7: pisanie krótkich form (list, e-mail) i ćwiczenie wypowiedzi ustnej.",
          "Tydzień 8: pełne egzaminy próbne w warunkach zbliskich realnym.",
        ],
      },
      {
        heading: "Najczęstsze pułapki",
        paragraphs: [
          "Kandydaci najczęściej tracą punkty na poprawności gramatycznej (odmiana przez przypadki) oraz na zarządzaniu czasem podczas części pisemnej. Regularne rozwiązywanie arkuszy na czas rozwiązuje oba problemy.",
        ],
      },
    ],
  },
  {
    slug: "polski-dla-ukraincow",
    date: "2026-05-02",
    readMinutes: 6,
    cover: ["#059669", "#0ea5e9"],
    category: "Poradniki",
    title: "Język polski dla Ukraińców: od czego zacząć i uważaj na fałszywych przyjaciół",
    excerpt:
      "Polski i ukraiński są bliskie, ale to bywa zdradliwe. Podpowiadamy, jak wykorzystać podobieństwa i nie wpaść w typowe pułapki.",
    body: [
      {
        paragraphs: [
          "Dla osób mówiących po ukraińsku polski jest jednym z najłatwiejszych języków do opanowania — wspólna struktura i ogromna liczba podobnych słów dają przewagę już na starcie. Klucz to postawić na praktykę i świadomie omijać pułapki.",
        ],
      },
      {
        heading: "Zacznij od praktycznych sytuacji",
        paragraphs: [
          "Zamiast wkuwać reguły, naucz się najpierw radzić sobie w codziennych sytuacjach: zakupy, wizyta u lekarza, urząd, rozmowa w pracy. Dzięki temu szybko poczujesz, że język działa.",
        ],
      },
      {
        heading: "Fałszywi przyjaciele (uważaj!)",
        paragraphs: ["Część słów brzmi znajomo, ale znaczy coś zupełnie innego:"],
        list: [
          "„dywan” to po polsku tapeta na podłodze (dywan), a nie sofa.",
          "„sklep” to po polsku magazyn handlowy (sklep), nie piwnica.",
          "„czas” oznacza czas, ale wymowa i odmiana różnią się od ukraińskiej.",
          "„owoce” to po polsku frukty — nie warzywa.",
        ],
      },
      {
        heading: "Wymowa: nosówki i szeleszczenie",
        paragraphs: [
          "Największe wyzwanie to samogłoski nosowe (ą, ę) oraz spółgłoski sz, cz, ż, dż. Warto ćwiczyć je na głos od pierwszych lekcji — to one najbardziej zdradzają obcy akcent.",
        ],
      },
      {
        heading: "Jak szybko zrobić postęp",
        list: [
          "15 minut dziennie regularnie zamiast 3 godzin raz w tygodniu.",
          "Otaczaj się językiem: bajki, podcasty, proste teksty.",
          "Mów od pierwszego dnia — błędy są częścią nauki.",
        ],
      },
    ],
  },
  {
    slug: "ile-czasu-nauka-b1",
    date: "2026-04-15",
    readMinutes: 5,
    cover: ["#6366f1", "#a855f7"],
    category: "Poradniki",
    title: "Ile czasu zajmuje nauka polskiego do poziomu B1?",
    excerpt:
      "Realne ramy czasowe dla każdego poziomu i czynniki, które najbardziej przyspieszają (lub spowalniają) naukę.",
    body: [
      {
        paragraphs: [
          "To pytanie zadaje nam niemal każdy nowy uczeń. Odpowiedź zależy od kilku czynników, ale można podać realne widełki oparte na doświadczeniu setek kursantów.",
        ],
      },
      {
        heading: "Orientacyjne ramy czasowe",
        list: [
          "A1 (podstawy): 2,5–4,5 miesiąca przy 2–3 lekcjach tygodniowo.",
          "A2: kolejne 2,5–4,5 miesiąca.",
          "B1 (poziom egzaminacyjny): łącznie ok. 7–9 miesięcy od zera, przy systematycznej pracy.",
        ],
      },
      {
        heading: "Co przyspiesza naukę",
        list: [
          "Język ojczysty bliski polskiemu (np. ukraiński) — duża przewaga.",
          "Mieszkanie w Polsce i codzienna praktyka.",
          "Regularność ważniejsza niż intensywność zrywami.",
        ],
      },
      {
        heading: "Co spowalnia",
        paragraphs: [
          "Najczęstsze hamulce to nieregularność, unikanie mówienia z obawy przed błędem oraz brak kontaktu z żywym językiem. Kurs z lektorem i cotygodniowe rozmówki rozwiązują wszystkie trzy.",
        ],
      },
    ],
  },
  {
    slug: "polski-medyczny-nostryfikacja",
    date: "2026-03-28",
    readMinutes: 7,
    cover: ["#0ea5e9", "#2563eb"],
    category: "Kariera",
    title: "Polski medyczny: jak lekarzowi przygotować się do pracy w Polsce",
    excerpt:
      "Słownictwo, egzaminy i praktyczne wskazówki dla lekarzy i pielęgniarek, którzy chcą pracować w polskim systemie ochrony zdrowia.",
    body: [
      {
        paragraphs: [
          "Praca w zawodzie medycznym w Polsce wymaga nie tylko nostryfikacji dyplomu, ale też bardzo konkretnego języka — takiego, który ratuje czas i bezpieczeństwo pacjenta. To inny polski niż ten z podręcznika.",
        ],
      },
      {
        heading: "Czego naprawdę potrzebujesz",
        list: [
          "Terminologia kliniczna i anatomiczna.",
          "Prowadzenie wywiadu z pacjentem i zbieranie objawów.",
          "Dokumentacja medyczna i język recept.",
          "Komunikacja z zespołem i rodziną pacjenta.",
        ],
      },
      {
        heading: "Egzamin i formalności",
        paragraphs: [
          "Oprócz znajomości języka na poziomie umożliwiającym pracę, lekarze przechodzą procedury potwierdzenia kwalifikacji. Warto równolegle budować słownictwo zawodowe — wtedy formalności idą znacznie szybciej.",
        ],
      },
      {
        heading: "Jak uczyć się efektywnie",
        paragraphs: [
          "Najlepiej sprawdza się nauka oparta na realnych scenariuszach: symulacje wywiadu, role-play „lekarz–pacjent” i praca z autentyczną dokumentacją. Dlatego polski medyczny prowadzimy zwykle indywidualnie, pod konkretną specjalizację.",
        ],
      },
    ],
  },
  {
    slug: "najczestsze-bledy",
    date: "2026-03-10",
    readMinutes: 6,
    cover: ["#f97316", "#ef4444"],
    category: "Gramatyka",
    title: "7 najczęstszych błędów obcokrajowców w polskim (i jak ich uniknąć)",
    excerpt:
      "Przypadki, rodzaje, aspekt czasownika — zebraliśmy błędy, które słyszymy najczęściej, i prosty sposób na każdy z nich.",
    body: [
      {
        paragraphs: [
          "Niektóre błędy powtarzają się u uczniów niezależnie od języka ojczystego. Dobra wiadomość: gdy je nazwiesz, znikają znacznie szybciej.",
        ],
      },
      {
        heading: "1–3: gramatyka, która sprawia kłopot",
        list: [
          "Mylenie przypadków (biernik vs dopełniacz) — ucz się rzeczowników razem z czasownikiem, który nimi rządzi.",
          "Rodzaj gramatyczny — zapamiętuj słowo z rodzajnikiem opisowym (ten / ta / to).",
          "Aspekt czasownika (robić vs zrobić) — ćwicz w parach na konkretnych sytuacjach.",
        ],
      },
      {
        heading: "4–7: wymowa i naturalność",
        list: [
          "Akcent zawsze na przedostatniej sylabie — to prosta zasada, która od razu poprawia brzmienie.",
          "Nosówki ą, ę — nie pomijaj ich w mowie.",
          "Kalki z języka ojczystego — ucz się całych zwrotów, nie pojedynczych słów.",
          "Zbyt formalny styl — w codziennej rozmowie liczy się naturalność, nie podręcznikowa poprawność.",
        ],
      },
      {
        heading: "Najważniejsze",
        paragraphs: [
          "Błędy to nie porażka, tylko etap. Mów dużo, proś o poprawki i wracaj do nagrań lekcji — postęp przyjdzie szybciej, niż myślisz.",
        ],
      },
    ],
  },
];

const ru: BlogPost[] = [
  {
    slug: "egzamin-b1-przewodnik",
    date: "2026-05-18",
    readMinutes: 8,
    cover: ["#2563eb", "#6366f1"],
    category: "Экзамены",
    title: "Сертификационный экзамен B1 по польскому: полное руководство 2026",
    excerpt:
      "Зачем нужен сертификат B1, как проходит экзамен, сколько баллов нужно набрать и как эффективно подготовиться — всё в одном месте.",
    tags: ["B1", "экзамен", "сертификат"],
    author: "Пани Малгожата",
    featured: true,
    body: [
      {
        paragraphs: [
          "Государственный сертификат по польскому как иностранному — единственный официальный документ, подтверждающий знание языка. Для человека, живущего в Польше, уровень B1 — самый важный порог, и именно с него обычно начинается формальный путь к стабильности.",
        ],
      },
      {
        heading: "Зачем нужен сертификат B1?",
        paragraphs: ["Сертификат B1 требуется или очень полезен в нескольких ключевых ситуациях:"],
        list: [
          "Заявление на гражданство Польши — сертификат B1 один из основных документов.",
          "Карта постоянного пребывания / долгосрочного резидента ЕС.",
          "Поступление в вуз и требования работодателей.",
        ],
      },
      {
        callout: { variant: "tip", text: "Лучше всего записываться на экзамен минимум за 3 месяца — места разбирают быстро, особенно весной и осенью." },
      },
      {
        heading: "Как проходит экзамен?",
        paragraphs: [
          "Экзамен состоит из письменной части (суббота) и устной (воскресенье). Проверяются четыре навыка: аудирование, понимание письменных текстов, грамматика и письмо. Устная часть — беседа с комиссией.",
        ],
      },
      {
        heading: "Сколько баллов нужно набрать?",
        paragraphs: [
          "Чтобы сдать, нужно набрать минимум 50% баллов в каждом модуле письменной части и не менее 50% устной. Это значит, что слабый модуль нельзя «компенсировать» сильным результатом другого — каждый элемент засчитывается отдельно.",
        ],
      },
      {
        heading: "План подготовки на 8 недель",
        list: [
          "Недели 1–2: диагностика уровня и повторение грамматики (падежи, времена).",
          "Недели 3–5: работа с вариантами прошлых лет — аудирование и чтение.",
          "Недели 6–7: письмо коротких форм (письмо, e-mail) и тренировка устной речи.",
          "Неделя 8: полноценные пробные экзамены в условиях, близких к реальным.",
        ],
      },
      {
        heading: "Частые ловушки",
        paragraphs: [
          "Чаще всего кандидаты теряют баллы на грамматике (склонение по падежам) и на управлении временем в письменной части. Регулярное решение вариантов на время решает обе проблемы.",
        ],
      },
    ],
  },
  {
    slug: "polski-dla-ukraincow",
    date: "2026-05-02",
    readMinutes: 6,
    cover: ["#059669", "#0ea5e9"],
    category: "Гайды",
    title: "Польский для украинцев: с чего начать и берегись ложных друзей",
    excerpt:
      "Польский и украинский близки, но это бывает коварно. Подсказываем, как использовать сходства и не попасть в типичные ловушки.",
    body: [
      {
        paragraphs: [
          "Для тех, кто говорит по-украински, польский — один из самых лёгких языков: общая структура и огромное число похожих слов дают преимущество уже на старте. Главное — делать упор на практику и осознанно обходить ловушки.",
        ],
      },
      {
        heading: "Начни с практических ситуаций",
        paragraphs: [
          "Вместо зубрёжки правил сначала научись справляться в повседневных ситуациях: покупки, визит к врачу, учреждение, разговор на работе. Так ты быстро почувствуешь, что язык работает.",
        ],
      },
      {
        heading: "Ложные друзья (осторожно!)",
        paragraphs: ["Часть слов звучит знакомо, но значит совсем другое:"],
        list: [
          "«sklep» по-польски — магазин, а не склеп/подвал.",
          "«dywan» по-польски — ковёр, а не диван.",
          "«owoce» — это фрукты, а не овощи.",
          "«czas» — это время; произношение и склонение отличаются от украинского.",
        ],
      },
      {
        heading: "Произношение: носовые и шипящие",
        paragraphs: [
          "Главный вызов — носовые гласные (ą, ę) и согласные sz, cz, ż, dż. Их стоит проговаривать вслух с первых уроков — именно они сильнее всего выдают акцент.",
        ],
      },
      {
        heading: "Как быстро прогрессировать",
        list: [
          "15 минут в день регулярно вместо 3 часов раз в неделю.",
          "Окружай себя языком: мультики, подкасты, простые тексты.",
          "Говори с первого дня — ошибки это часть обучения.",
        ],
      },
    ],
  },
  {
    slug: "ile-czasu-nauka-b1",
    date: "2026-04-15",
    readMinutes: 5,
    cover: ["#6366f1", "#a855f7"],
    category: "Гайды",
    title: "Сколько времени нужно, чтобы выучить польский до уровня B1?",
    excerpt:
      "Реальные сроки для каждого уровня и факторы, которые сильнее всего ускоряют (или замедляют) обучение.",
    body: [
      {
        paragraphs: [
          "Этот вопрос задаёт почти каждый новый ученик. Ответ зависит от нескольких факторов, но можно назвать реальные рамки, основанные на опыте сотен студентов.",
        ],
      },
      {
        heading: "Ориентировочные сроки",
        list: [
          "A1 (основы): 2,5–4,5 месяца при 2–3 уроках в неделю.",
          "A2: ещё 2,5–4,5 месяца.",
          "B1 (экзаменационный уровень): в сумме около 7–9 месяцев с нуля при системной работе.",
        ],
      },
      {
        heading: "Что ускоряет обучение",
        list: [
          "Родной язык, близкий к польскому (например, украинский) — большое преимущество.",
          "Проживание в Польше и ежедневная практика.",
          "Регулярность важнее интенсивности рывками.",
        ],
      },
      {
        heading: "Что замедляет",
        paragraphs: [
          "Самые частые тормоза — нерегулярность, избегание разговора из страха ошибки и отсутствие контакта с живым языком. Курс с преподавателем и еженедельные разговорные клубы решают все три.",
        ],
      },
    ],
  },
  {
    slug: "polski-medyczny-nostryfikacja",
    date: "2026-03-28",
    readMinutes: 7,
    cover: ["#0ea5e9", "#2563eb"],
    category: "Карьера",
    title: "Медицинский польский: как врачу подготовиться к работе в Польше",
    excerpt:
      "Лексика, экзамены и практические советы для врачей и медсестёр, которые хотят работать в польской системе здравоохранения.",
    body: [
      {
        paragraphs: [
          "Работа по медицинской профессии в Польше требует не только нострификации диплома, но и очень конкретного языка — такого, который экономит время и безопасность пациента. Это другой польский, не из учебника.",
        ],
      },
      {
        heading: "Что действительно нужно",
        list: [
          "Клиническая и анатомическая терминология.",
          "Сбор анамнеза и опрос пациента.",
          "Медицинская документация и язык рецептов.",
          "Коммуникация с командой и родственниками пациента.",
        ],
      },
      {
        heading: "Экзамен и формальности",
        paragraphs: [
          "Помимо знания языка на рабочем уровне, врачи проходят процедуры подтверждения квалификации. Профессиональную лексику стоит наращивать параллельно — тогда формальности идут заметно быстрее.",
        ],
      },
      {
        heading: "Как учиться эффективно",
        paragraphs: [
          "Лучше всего работает обучение на реальных сценариях: симуляции опроса, ролевые игры «врач–пациент» и работа с настоящей документацией. Поэтому медицинский польский мы обычно ведём индивидуально, под конкретную специализацию.",
        ],
      },
    ],
  },
  {
    slug: "najczestsze-bledy",
    date: "2026-03-10",
    readMinutes: 6,
    cover: ["#f97316", "#ef4444"],
    category: "Грамматика",
    title: "7 частых ошибок иностранцев в польском (и как их избежать)",
    excerpt:
      "Падежи, род, вид глагола — собрали ошибки, которые слышим чаще всего, и простой способ справиться с каждой.",
    body: [
      {
        paragraphs: [
          "Некоторые ошибки повторяются у учеников независимо от родного языка. Хорошая новость: как только ты их назовёшь, они исчезают намного быстрее.",
        ],
      },
      {
        heading: "1–3: грамматика, которая мешает",
        list: [
          "Путаница падежей (винительный vs родительный) — учи существительные вместе с управляющим глаголом.",
          "Грамматический род — запоминай слово с указателем (ten / ta / to).",
          "Вид глагола (robić vs zrobić) — тренируй парами на конкретных ситуациях.",
        ],
      },
      {
        heading: "4–7: произношение и естественность",
        list: [
          "Ударение всегда на предпоследнем слоге — простое правило, которое сразу улучшает звучание.",
          "Носовые ą, ę — не пропускай их в речи.",
          "Кальки с родного языка — учи целые фразы, а не отдельные слова.",
          "Слишком формальный стиль — в обычном разговоре важна естественность, а не учебниковая правильность.",
        ],
      },
      {
        heading: "Самое важное",
        paragraphs: [
          "Ошибки — это не провал, а этап. Говори много, проси исправлять и возвращайся к записям уроков — прогресс придёт быстрее, чем кажется.",
        ],
      },
    ],
  },
];

const posts: Record<Locale, BlogPost[]> = { pl, ru };

export function getPosts(locale: Locale): BlogPost[] {
  return posts[locale];
}

export function getPost(locale: Locale, slug: string): BlogPost | undefined {
  return posts[locale].find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return pl.map((p) => p.slug);
}
