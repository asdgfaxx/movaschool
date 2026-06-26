# Movaschool — План редизайна фронтенда

> **Цель:** Превратить сайт в premium immersive-продукт. Каждый экран — кино, каждая карточка — тактильная, каждое взаимодействие — осмысленное.
>
> **Направление:** Premium immersive (glassmorphism, aurora-фоны, spotlight-tilt карточки, cinematic hero, micro-interactions).
>
> **Палитра:** Расширение существующих токенов (primary/secondary/accent) + тон-шкалы + B2B-акценты (gold/copper).
>
> **Глубина:** Полная трансформация всех страниц.

---

## Как пользоваться этим файлом

- Файл разбит на разделы по страницам и фундаментальной части.
- Каждый раздел заканчивается **чек-листом задач**, разбитым на чанки `[C1]`, `[C2]`… — один чанк = одна порция работы для одного терминала.
- Чанк можно отдать агенту в отдельном терминале как самостоятельную задачу.
- После каждого чанка запускать `npm run lint` и `npm run build` (см. Часть 4).

---

# Часть 0 — Фундамент

> Выполнять **первым** и **до** любых правок страниц. Без этого остальные разделы не сработают.
> Можно параллелить подзадачи между терминалами, но **сначала 0.1**, потом остальное.

## 0.1 Расширение дизайн-токенов

**Файл:** `app/globals.css`

### Новые токены

Добавить в `:root` и `.dark`:

```css
/* Тон-шкалы (color-mix от базовых) */
--primary-50 … --primary-900
--secondary-50 … --secondary-900
--accent-50 … --accent-900

/* B2B-акценты */
--gold: #d4a017;
--gold-foreground: #1a1300;
--copper: #c2410c;

/* Семантические */
--success: #16a34a;
--warning: #f59e0b;
--info: #0ea5e9;

/* Градиентные пары как токены */
--grad-hero: linear-gradient(135deg, var(--primary), var(--secondary) 55%, var(--accent));
--grad-cta: linear-gradient(120deg, var(--primary), var(--secondary));
--grad-business: linear-gradient(135deg, var(--primary), var(--gold));
--grad-glow: radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 70%);

/* Новые тени */
--shadow-glow-lg: 0 0 0 1px color-mix(in oklab, var(--primary) 10%, transparent), 0 30px 80px -20px var(--primary);
--shadow-inner-clay: inset 0 1px 2px color-mix(in oklab, white 15%, transparent), inset 0 -1px 2px color-mix(in oklab, var(--shadow-color) 20%, transparent);
--shadow-float: 0 2px 4px hsl(var(--shadow-color) / 0.08), 0 24px 60px -16px hsl(var(--shadow-color) / 0.25);
```

### Новые keyframes

```css
@keyframes spotlight { /* radial-gradient movement */ }
@keyframes shimmer-border { /* conic-gradient rotation for gradient border */ }
@keyframes blob { /* morphing border-radius + translate */ }
@keyframes gradient-pan { /* background-position shift for gradient text/bg */ }
@keyframes tilt-glow { /* opacity pulse for tilt glow layer */ }
@keyframes aurora-slow { /* slower variant of aurora, 30s */ }
```

### Новые утилиты

```css
.glass { background: color-mix(in oklab, var(--surface) 60%, transparent); backdrop-filter: blur(16px) saturate(140%); border: 1px solid color-mix(in oklab, white 10%, transparent); }
.glass-strong { background: color-mix(in oklab, var(--surface) 80%, transparent); backdrop-filter: blur(24px) saturate(160%); }
.gradient-border { position: relative; } .gradient-border::before { /* conic-gradient rotating border via shimmer-border */ }
.noise { /* subtle SVG noise overlay, opacity 0.03 */ }
.mesh-bg { /* layered radial-gradients for cinematic hero backgrounds */ }
.text-balance { text-wrap: balance; }
.spotlight-radial { /* radial-gradient that follows cursor via CSS var --x/--y */ }
```

### Чек-лист 0.1

- [x] `[C1]` Добавить тон-шкалы primary/secondary/accent (50–900) в `:root` и `.dark`
- [x] `[C1]` Добавить `--gold`, `--copper`, `--success`, `--warning`, `--info` в `:root` и `.dark`
- [x] `[C1]` Добавить градиентные токены (`--grad-*`)
- [x] `[C1]` Добавить новые тени
- [x] `[C2]` Добавить keyframes: `spotlight`, `shimmer-border`, `blob`, `gradient-pan`, `tilt-glow`, `aurora-slow`
- [x] `[C2]` Зарегистрировать анимации в `@theme inline` (`--animate-spotlight` и т.д.)
- [x] `[C2]` Добавить утилиты `.glass`, `.glass-strong`, `.gradient-border`, `.noise`, `.mesh-bg`, `.text-balance`, `.spotlight-radial`
- [x] `[C2]` Проверить, что `npm run build` проходит

---

## 0.2 Motion-примитивы

**Папка:** `components/motion/`

### Новые компоненты

| Файл | Что делает |
|------|------------|
| `spotlight-card.tsx` | Карточка с radial-gradient glow, следящим за курсором через CSS-переменные `--x`/`--y`. База для всех новых карточек. |
| `magnetic-button.tsx` | Кнопка/Link, притягивающаяся к курсору на 4–8px через `useMotionValue` + `useSpring`. Обёртка над `Button`/`buttonClasses`. |
| `text-shimmer.tsx` | Текст с переливающимся градиентом (анимация `background-position`). |
| `marquee.tsx` | Бесконечная горизонтальная лента. Props: `speed`, `direction`, `pauseOnHover`. Дублирует children для seamless-loop. |
| `scroll-progress.tsx` | Тонкий gradient-бар вверху страницы, ширина = % скролла. Использует `motion.useScroll`. |
| `parallax-layer.tsx` | Слой с parallax на скролле. Props: `speed` (отрицательный = медленнее). |
| `cursor-glow.tsx` | Глобальный soft-glow круг за курсором (fixed, pointer-events-none). Только на устройствах с fine-pointer. |
| `reveal-group.tsx` | Вариант `stagger.tsx` с настраиваемым stagger-distance и reduced-motion guard. |

### Правки существующих

- `reveal.tsx` → добавить проп `as`, reduced-motion guard (мгновенный показ).
- `stagger.tsx` → reduced-motion guard, настраиваемый `stagger` prop.
- `tilt-card.tsx` → **внедрить реально** (сейчас orphan). Добавить optional spotlight-слой.
- `counter.tsx` → починить дроби (`4.9`), локаль из пропа (не хардкод `pl-PL`).
- `aurora.tsx` → проп `variant` для hue-вариаций per-section.

### Чек-лист 0.2

- [x] `[C3]` Создать `spotlight-card.tsx` с тестом ручным в временной странице
- [x] `[C3]` Создать `magnetic-button.tsx`
- [x] `[C3]` Создать `text-shimmer.tsx`
- [x] `[C4]` Создать `marquee.tsx`
- [x] `[C4]` Создать `scroll-progress.tsx` + внедрить в `layout.tsx`
- [x] `[C4]` Создать `parallax-layer.tsx`
- [x] `[C5]` Создать `cursor-glow.tsx` + внедрить в `Providers`
- [x] `[C5]` Создать `reveal-group.tsx`
- [x] `[C5]` Правки `reveal.tsx`, `stagger.tsx` (reduced-motion, `as` prop)
- [x] `[C6]` Починить `counter.tsx` (дроби + локаль)
- [x] `[C6]` Расширить `aurora.tsx` (`variant` prop)
- [x] `[C6]` Внедрить `tilt-card.tsx` минимум в 1 секцию (можно позже, отметить TODO)

---

## 0.3 UI-примитивы

**Папка:** `components/ui/`

### Расширение существующих

- `badge.tsx` → варианты: `primary | secondary | accent | gold | outline | glass`. Размеры `sm | md`.
- `container.tsx` → варианты `narrow (max-w-3xl) | default (max-w-6xl) | wide (max-w-7xl) | full`.
- `button.tsx` → добавить `loading` prop (спиннер), `icon` size, обёртка `MagneticButton` через prop `magnetic`.
- `section-heading.tsx` → добавить `eyebrow` (отдельно от kicker), декоративную линию, `as` prop (h1/h2/h3).

### Новые компоненты

| Файл | Назначение |
|------|-----------|
| `card.tsx` | Базовая карточка. Варианты: `glass | clay | flat | spotlight`. Hover-эффекты настраиваются. |
| `tabs.tsx` | Клиентские табы с анимированным индикатором (motion layoutId). |
| `accordion.tsx` | Вынести логику из `faq.tsx` в переиспользуемый примитив. |
| `pill.tsx` | Маленькая метка (уровень, тег). |
| `divider.tsx` | Градиентный разделитель. |
| `stat-tile.tsx` | Tile для статистики: иконка, значение (counter), подпись, тренд. |
| `tag-chip.tsx` | Чип тега для блог/преподавателей. |
| `progress-ring.tsx` | SVG-кольцо прогресса (для level-test, loading). |

### Чек-лист 0.3

- [x] `[C7]` Расширить `badge.tsx` (варианты)
- [x] `[C7]` Расширить `container.tsx` (варианты)
- [x] `[C7]` Расширить `button.tsx` (`loading`, `icon`, `magnetic`)
- [x] `[C7]` Расширить `section-heading.tsx` (`eyebrow`, `as`, декор-линия)
- [x] `[C8]` Создать `card.tsx` (варианты glass/clay/flat/spotlight)
- [x] `[C8]` Создать `tabs.tsx` (layoutId индикатор)
- [x] `[C8]` Создать `accordion.tsx` (вынести из faq)
- [x] `[C9]` Создать `pill.tsx`, `divider.tsx`, `tag-chip.tsx`
- [x] `[C9]` Создать `stat-tile.tsx`, `progress-ring.tsx`
- [x] `[C9]` Рефактор `faq.tsx` на новый `Accordion`

---

## 0.4 Глобальные правки (layout/chrome)

### `components/layout/header.tsx`

- **Announcement bar** над шапкой (редактируемая строка, dismissible, в dict).
- **Mega-menu** для «Курсы»: при наведении выпадает панель с уровнями A1–C1 и категориями (general/exam/intensive/…).
- **Glass-фон** на скролле: `glass-strong` вместо текущего `bg-background/80 backdrop-blur-xl`.
- **Magnetic CTA** в десктопе (через `MagneticButton`).
- **Активное состояние** подсвечивать gradient-underline.
- **Мобильное меню** — полноэкранная overlay-панель с staggered-анимацией пунктов.

### `components/layout/footer.tsx`

- **Newsletter-форма** в первой колонке (email + кнопка, post на тот же `/api/lead` с типом `newsletter`).
- **Back-to-top** плавающая кнопка (появляется после скролла).
- Соц-ссылки вынести в `lib/site.ts` (конфиг), убрать placeholder-URL.
- Платежи вынести из хардкода в `messages/*.ts` (массив ключей) + маппинг.
- 4-я колонка → «Компания» (about/careers/blog) вместо дублирования.

### `components/layout/logo.tsx`

- SVG-версия логотипа (вместо div-сетки точек).
- Dark-вариант (инверсия/бледнее).
- Hover: лёгкое вращение + glow.
- Цвета из CSS-переменных, не хардкод hex.

### Тема и локаль

- `theme-toggle.tsx` → системный fallback (если localStorage пуст — `prefers-color-scheme`).
- `locale-switcher.tsx` → `<Link>` вместо `router.push` (префетч/статика), флаги + полные имена (PL/Русский), красивый dropdown на мобильном.

### A11y (сквозное)

- Skip-link в `layout.tsx` («Перейти к содержимому»).
- `prefers-reduced-motion` во всех motion-примитивах.
- Фокус-ловушка в мобильном меню и модалках.
- `aria-*` на аккордеонах, табах, marquee (aria-live off), progress.
- Контраст-проверка всех текстовых комбинаций (минимум AA).

### Чек-лист 0.4

- [x] `[C10]` Header: announcement bar + mega-menu для Courses
- [x] `[C10]` Header: glass-фон, magnetic CTA, gradient-underline active
- [x] `[C10]` Header: полноэкранное мобильное меню со stagger
- [x] `[C11]` Footer: newsletter-форма + back-to-top
- [x] `[C11]` Footer: соц-ссылки в `lib/site.ts`, платежи в dict
- [x] `[C11]` Footer: переработать колонки
- [x] `[C12]` Logo: SVG-версия, dark-вариант, hover-glow
- [x] `[C12]` Theme-toggle: системный fallback
- [x] `[C12]` Locale-switcher: `<Link>`, флаги, dropdown
- [x] `[C13]` A11y: skip-link, reduced-motion во всех примитивах, aria, фокус-ловушки
- [x] `[C13]` Убрать весь хардкод нелокализованных строк → `messages/types.ts` + `ru.ts` + `pl.ts`

---

# Часть 1 — Homepage

**Файл:** `app/[locale]/page.tsx` + `components/sections/*`

> 14 секций. Каждая — отдельный чанк. Можно параллелить по терминалам после завершения Части 0.

## 1.1 Hero — cinematic

**Файл:** `components/sections/hero.tsx`

**Концепция:** Полноэкранный (min-h-dvh) cinematic hero. Mesh-bg + многослойная aurora с parallax. Слева — заголовок с `text-shimmer`-акцентом, magnetic CTA, live-счётчик. Справа — живой «Google Meet» мокап: реальный преподаватель (не хардкод индекса — `dict.hero.teacherIndex` или рандом из `dict.teachers`), pulse-«online», анимированный bar-chart, floating-чипы с counter.

**Новые элементы:**
- `mesh-bg` фон + 3 `ParallaxLayer` aurora-круга на разной скорости.
- `CursorGlow` на всю секцию.
- `TextShimmer` на акцентной части h1.
- `MagneticButton` для обеих CTA.
- Floating-чипы с `Counter` («+200 учеников», «B1 · 90/100»).
- Decorative scroll-indicator внизу (анимированная стрелка/мышь).
- SpotlightCard для мокапа встречи.

**Правки контента:**
- Убрать хардкод «+200 / мес» → `dict.hero.floatingCards` расширить.
- Убрать хардкод индекса преподавателя `[1]` → `dict.hero.teacherId` или `pick(teachers)`.

**Чек-лист:**
- [x] `[H1]` Mesh-bg + parallax aurora слои
- [x] `[H1]` TextShimmer на h1, MagneticButton на CTA
- [x] `[H1]` Мокап встречи на SpotlightCard + реальный преподаватель + counter-чипы
- [x] `[H1]` Scroll-indicator, мобильная адаптация, убрать хардкод строк

## 1.2 Marquee платформ (НОВЫЙ блок)

**Файл:** `components/sections/platforms-marquee.tsx` (новый)

**Концепция:** Под hero — бесконечная лента логотипов платформ отзывов (`/platforms/*.png`) + возможные «как_seen_on» медиа. `Marquee` компонент, `pauseOnHover`, grayscale → color на hover.

**Чек-лист:**
- [x] `[H2]` Создать блок, внедрить после Hero в `page.tsx`
- [x] `[H2]` Grayscale→color на hover, pauseOnHover

## 1.3 Stats

**Файл:** `components/sections/stats.tsx`

**Концепция:** Крупные `StatTile` (новый примитив) — иконка, значение (Counter с поддержкой дробей), подпись, мини-тренд-стрелка/sparkline. Glass-панель-обёртка. 4 тайла.

**Чек-лист:**
- [x] `[H3]` Перевести на `StatTile`, добавить иконки и тренды
- [x] `[H3]` Glass-обёртка, проверка дробных значений

## 1.4 HowItWorks

**Файл:** `components/sections/how-it-works.tsx`

**Концепция:** Горизонтальный step-timeline (desktop) / вертикальный (mobile). Соединительная градиентная линия с анимацией заполнения при скролле (`whileInView`). Иконки подобраны семантически (не index-cycle) — вынести в dict `how.items[].icon`. SpotlightCard на каждый шаг.

**Чек-лист:**
- [x] `[H4]` Timeline с gradient-линией, semantic иконки в dict
- [x] `[H4]` SpotlightCard, адаптация mobile

## 1.5 Levels

**Файл:** `components/sections/levels.tsx`

**Концепция:** Интерактивная дорожка A1→C1. При hover — карточка раскрывается (expand) с деталями. Клик → `/level-test?from=A2` (пресет). Цвета из тон-шкал токенов (не хардкод HUES). «You are here» маркер, если в URL/query есть результат теста.

**Чек-лист:**
- [x] `[H5]` Заменить HUES на токены, hover-expand, CTA с пресетом уровня
- [x] `[H5]` You-are-here маркер, mobile-режим

## 1.6 Formats

**Файл:** `components/sections/formats.tsx`

**Концепция:** `Tabs`-переключатель (стационарно/онлайн/видео) с анимированным индикатором (`layoutId`). При смене таба — анимированная смена контента (AnimatePresence). Сравнительная мини-таблица преимуществ под каждым табом.

**Чек-лист:**
- [x] `[H6]` Tabs с layoutId-индикатором, AnimatePresence смена контента
- [x] `[H6]` Мини-таблица преимуществ, mobile

## 1.7 BusinessTeaser

**Файл:** `components/sections/business-teaser.tsx`

**Концепция:** Glass-панель с parallax-фоном. Слева — текст + magnetic CTA → `/business`. Справа — реальная статистика B2B (counter), убрать хардкод «IT/Dev/Produkcja/Logistyka» → в dict. Progress-bars с gradient-pan анимацией.

**Чек-лист:**
- [x] `[H7]` Glass-панель, parallax, magnetic CTA
- [x] `[H7]` Убрать хардкод меток → dict, gradient-pan на прогресс-барах

## 1.8 WhyUs

**Файл:** `components/sections/why-us.tsx`

**Концепция:** Bento-grid — разноразмерные карточки (не один шаблон). Каждая со своей иконкой/иллюстрацией (семантически). Одна крупная featured-карточка с фоновым паттерном/иллюстрацией. SpotlightCard + TiltCard на главных.

**Чек-лист:**
- [x] `[H8]` Bento-grid разноразмерных карточек, semantic иконки
- [x] `[H8]` Featured-карточка с паттерном, tilt на главных

## 1.9 TeachersPreview

**Файл:** `components/sections/teachers-preview.tsx`

**Концепция:** Карусель/горизонтальный скролл **кураторской подборки** (4–6, не все). SpotlightCard + tilt на hover. CTA «записаться на пробное» → `/contact?teacher=ID`. Раскрытие предметов/уровней на hover.

**Чек-лист:**
- [x] `[H9]` Карусель подборки, spotlight+tilt на hover
- [x] `[H9]` CTA с пресетом teacher, раскрытие предметов

## 1.10 Steps

**Файл:** `components/sections/steps.tsx`

**Концепция:** Вертикальный timeline с parallax-номерами (большие gradient-цифры на фоне). Иконки на каждом шаге (в dict). Соединительная линия с анимацией заполнения.

**Чек-лист:**
- [x] `[H10]` Вертикальный timeline, parallax-номера
- [x] `[H10]` Иконки в dict, animated connector

## 1.11 Reviews

**Файл:** `components/sections/reviews.tsx`

**Концепция:** `Marquee` отзывов (две строки в противоположных направлениях) ИЛИ карусель с drag. Hover-tilt карточек. Видео-отзывы-плейсхолдеры (play-button overlay). Ссылки на платформы (не просто логотипы внизу).

**Чек-лист:**
- [x] `[H11]` Marquee/carousel отзывов, tilt на hover
- [x] `[H11]` Видео-плейсхолдеры, ссылки на платформы

## 1.12 FAQ

**Файл:** `components/sections/faq.tsx`

**Концепция:** Поиск по вопросам (client-filter). Группировка по категориям (dict `faq.categories[]`). Внизу — CTA «остались вопросы?» → `/contact`.

**Чек-лист:**
- [x] `[H12]` Поиск, категории, refactor на `Accordion`
- [x] `[H12]` CTA «остались вопросы»

## 1.13 LeadForm

**Файл:** `components/sections/lead-form.tsx`

**Концепция:** Glass-карточка с gradient-glow. Новые поля: RODO-чекбокс (обязательный), `select` курса (с пресетом из `?course=` query), валидация телефона (по локали). Success-state с автосбросом через 5с. Promo-поле с валидацией.

**Чек-лист:**
- [x] `[H13]` Glass-карточка + glow, RODO-чекбокс, select курса с пресетом
- [x] `[H13]` Валидация телефона, success-автосброс, promo-валидация

## 1.14 FinalCTA

**Файл:** `components/sections/final-cta.tsx`

**Концепция:** Полноэкранный gradient-mesh (mesh-bg + animated blobs с parallax). Крупный заголовок, номер телефона (click-to-call), urgency-элемент (counter мест на курс / таймер акции). Magnetic кнопки.

**Чек-лист:**
- [x] `[H14]` Mesh-bg + parallax blobs, click-to-call
- [x] `[H14]` Urgency-элемент, magnetic CTA

---

# Часть 2 — Внутренние страницы

> Каждая страница — независимый раздел. Можно раздавать по терминалам параллельно после Части 0.
> Общий паттерн: уникальный hero (не одинаковый PageHeader) + содержательные секции + contextual CTA.

## 2.1 Courses — `/[locale]/courses`

**Файл:** `app/[locale]/courses/page.tsx`

**Цель:** Каталог курсов с фильтрацией, сравнением и контекстным CTA.

### Секции

1. **Hero** — уникальный: фоновый паттерн книжных обложек/уровней, kicker, h1, subtitle, быстрый фильтр-вход (chips A1–C1).
2. **Filter bar** (sticky под шапкой) — чипы: уровень, категория (general/exam/intensive/speaking/special/school), формат. Сброс. Счётчик результатов.
3. **Mega-grid курсов** — `SpotlightCard` с tilt. Badge уровня (цвет по тон-шкале), название, частота/длительность/цена, hover-раскрытие «что внутри программы». CTA → `/contact?course=ID`.
4. **Сравнительная таблица** — toggle «плитки/таблица». Колонки: название, уровень, частота, длительность, цена.
5. **CTA-панель** — «не нашли свой курс?» → contact с пресетом.

### Контент/dict
- `dict.pages.courses.groups[].courses[]` добавить `id`, `icon`, `syllabus[]` (короткие пункты).
- Использовать существующие `headCourse/headFreq/headDuration/headPrice` в таблице.

### Чек-лист
- [x] `[CO1]` Уникальный hero с chips-фильтром
- [x] `[CO1]` Sticky filter bar (уровень/категория/формат)
- [x] `[CO2]` Mega-grid на SpotlightCard+tilt, hover-раскрытие syllabus
- [x] `[CO2]` CTA с `?course=ID`
- [x] `[CO2]` Сравнительная таблица (toggle вид), `head*` из dict

## 2.2 Teachers — `/[locale]/teachers`

**Файл:** `app/[locale]/teachers/page.tsx`

**Цель:** Витрина преподавателей с фильтрами и контекстным бронированием.

### Секции

1. **Hero** — уникальный: коллаж аватаров с parallax, kicker, h1, subtitle.
2. **Filter bar** — язык, уровень, специальность (в dict `teachers[].languages[]`, `teachers[].levels[]`, `teachers[].specialties[]`).
3. **Bento-grid карточек** — SpotlightCard + tilt. Аватар с gradient-ring, имя, роль, предметы (TagChip), языки (Pill), опыт. CTA «пробный урок» → `/contact?teacher=ID`.
4. (Опционально) **Детальные страницы** `teachers/[id]` — био, образование, отзывы, расписание-плейсхолдер.

### Контент/dict
- Расширить `dict.teachers[]`: `id`, `languages[]`, `levels[]`, `specialties[]`, `bio`.

### Чек-лист
- [x] `[TE1]` Hero с parallax-коллажем, filter bar (язык/уровень/специальность)
- [x] `[TE1]` Расширить `dict.teachers[]` (id/languages/levels/specialties/bio)
- [x] `[TE2]` Bento-grid на SpotlightCard+tilt, TagChip предметов, CTA с `?teacher=ID`
- [ ] `[TE2]` (опц.) Детальные страницы `teachers/[id]`

## 2.3 Level Test — `/[locale]/level-test`

**Файл:** `app/[locale]/level-test/page.tsx`, `components/sections/level-quiz.tsx`

**Цель:** Immersive тест с конверсией в лид.

### Секции

1. **Hero** — уникальный: gradient-mesh, прогресс-кольцо в превью, h1, subtitle, CTA «начать».
2. **Quiz** — `ProgressRing` (SVG), прогресс-бар, аудио-плейсхолдер (иконка + waveform-анимация, кнопка play disabled с подписью «скоро»). Анимация перехода вопросов (spring). Боковая панель с таймером.
3. **Result** — крупный badge уровня (gradient), описание, рекомендация курсов (карточки с CTA `?course=ID`), **lead-capture форма** (имя+email → отправка с результатом), share-кнопка (скопировать ссылку/результат).

### Контент/dict
- Расширить `dict.pages.levelTest`: `question.audio?` (placeholder), result `recommendedCourses[]`.

### Чек-лист
- [x] `[LT1]` Hero с ProgressRing-превью, gradient-mesh
- [x] `[LT1]` Quiz: ProgressRing, аудио-плейсхолдер, spring-переходы, таймер
- [x] `[LT2]` Result: рекомендация курсов, lead-capture форма, share

## 2.4 Business — `/[locale]/business`

**Файл:** `app/[locale]/business/page.tsx`

**Цель:** Премиум B2B-лендинг с ценами и кейсами.

### Секции

1. **Hero** — premium: mesh-bg + gold-accent aurora, h1, subtitle, CTA. Badge «B2B» из dict.
2. **Intro** — glass-панель с ParallaxLayer.
3. **Benefits** — bento-grid, semantic иконки (в dict `benefits[].icon`).
4. **Stats** — `StatTile` с counter (дроби!), gold-accent.
5. **Packages** — pricing-карточки с **ценами** (в dict `packages[].price`), средняя выделена ring+gradient+badge «популярный».
6. **Process** — timeline с parallax-номерами (как Steps на homepage).
7. **Кейсы** (новый) — 2–3 карточки кейсов с результатами (dict `cases[]`).
8. **FAQ** (новый) — короткий, на `Accordion`.
9. **CTA** — gradient-mesh + parallax blobs, форма или кнопка.

### Контент/dict
- `dict.pages.business`: `packages[].price`, `cases[]`, `faq[]`, `benefits[].icon`, убрать хардкод «B2B».

### Чек-лист
- [x] `[BU1]` Premium hero (gold aurora, mesh), badge из dict
- [x] `[BU1]` Benefits bento-grid с semantic иконками
- [x] `[BU2]` Stats на StatTile (дроби), packages с ценами + «популярный»
- [x] `[BU2]` Process timeline, кейсы, FAQ
- [x] `[BU2]` CTA gradient-mesh, убрать хардкод «B2B»

## 2.5 Blog (список) — `/[locale]/blog`

**Файл:** `app/[locale]/blog/page.tsx`

**Цель:** Живой блог-хаб с фильтрацией.

### Секции

1. **Hero** — уникальный: фоновый паттерн из gradient-обложек, h1, subtitle.
2. **Featured post** — крупная карточка последнего/featured поста (большая обложка, excerpt, CTA).
3. **Filter bar** — чипы категорий + поиск (client-filter).
4. **Grid постов** — masonry или grid, SpotlightCard, hover-tilt, BlogCover с паттерном/SVG-обложкой (не только градиент).
5. (Опц.) **Pagination** или «load more».

### Контент/dict
- `content/blog.ts`: `featured` flag, `tags[]`, `author`.

### Чек-лист
- [ ] `[BL1]` Hero с паттерном, featured-пост
- [ ] `[BL1]` Filter bar (категории + поиск), расширить `content/blog.ts`
- [ ] `[BL2]` Grid на SpotlightCard+tilt, обложки с паттерном/SVG
- [ ] `[BL2]` (опц.) Pagination/load more

## 2.6 Blog post — `/[locale]/blog/[slug]`

**Файл:** `app/[locale]/blog/[slug]/page.tsx`

**Цель:** Статья как у premium-издания.

### Секции

1. **Reading progress** — `ScrollProgress` сверху статьи.
2. **Header** — category pill, h1, byline (автор + дата + время чтения), share-кнопки (Twitter/LinkedIn/Copy).
3. **Cover** — улучшенный BlogCover (паттерн/SVG, не только градиент).
4. **TOC** (sidebar на desktop, sticky) — якоря из h2 секций body.
5. **Body** — добавить callout-блоки (info/warning/tip), цитаты, нумерованные списки. Структура body расширить в `content/blog.ts`.
6. **CTA-панель** — после статьи.
7. **Related** — по тегам/категории (не «first 2 others»).

### Контент/dict
- `content/blog.ts`: `body[]` расширить типами (`callout`, `quote`), `tags[]`, `author`.

### Чек-лист
- [ ] `[BP1]` ScrollProgress, byline, share-кнопки
- [ ] `[BP1]` TOC sidebar (sticky), улучшенный cover
- [ ] `[BP2]` Body: callout/quote-блоки, расширить типы в `content/blog.ts`
- [ ] `[BP2]` Related по тегам

## 2.7 Contact — `/[locale]/contact`

**Файл:** `app/[locale]/contact/page.tsx`

**Цель:** Тёплая контактная страница с быстрыми каналами.

### Секции

1. **Hero** — уникальный, компактный.
2. **Каналы связи** — bento-grid: email, phone (click-to-call), WhatsApp/Telegram deep-links (из `lib/site.ts`), часы, адрес.
3. **Карта** — embed (Google Maps iframe) ИЛИ стилизованная иллюстрация-карта с пином.
4. **LeadForm** — расширенная (как на homepage), с пресетом из query (`?course=`, `?teacher=`).

### Контент/dict
- `lib/site.ts`: `whatsapp`, `telegram` URL.
- `dict.contactInfo`: расширить.

### Чек-лист
- [ ] `[CT1]` Bento каналов с deep-links (WhatsApp/Telegram)
- [ ] `[CT1]` Карта-embed или стилизованная иллюстрация
- [ ] `[CT2]` Расширенная LeadForm с пресетом из query

## 2.8 Partnership — `/[locale]/partnership`

**Файл:** `app/[locale]/partnership/page.tsx`

**Цель:** Партнёрская программа с калькулятором и заявкой.

### Секции

1. **Hero** — уникальный, с gold-accent.
2. **Perks** — bento-grid, semantic иконки.
3. **Комиссионный калькулятор** (новый, client) — слайдер количества учеников → расчёт комиссии (простая формула из dict).
4. **Логотипы партнёров** (новый) — marquee/grid (плейсхолдеры).
5. **Форма заявки** — отдельная мини-форма (или пресет в `/contact?type=partnership`).
6. **CTA**.

### Контент/dict
- `dict.pages.partnership`: `perks[].icon`, `calculator{rate, tiers[]}`, `partners[]`.
- Починить баг: kicker использует `nav.contact` → добавить `nav.partnership` или `pages.partnership.kicker`.

### Чек-лист
- [ ] `[PA1]` Hero с gold-accent, починить kicker-баг
- [ ] `[PA1]` Perks bento-grid, semantic иконки
- [ ] `[PA2]` Комиссионный калькулятор (client)
- [ ] `[PA2]` Логотипы партнёров, форма заявки/пресет

## 2.9 Legal — `/[locale]/legal/[doc]`

**Файл:** `app/[locale]/legal/[doc]/page.tsx`

**Цель:** Читабельные документы с навигацией.

### Секции

1. **Hero** — компактный, с переключателем между тремя документами (Tabs или sidebar).
2. **Sidebar** (desktop, sticky) — список документов + in-page TOC (якоря секций).
3. **Content** — типографика для длинного текста, effective-date выделен, нумерованные секции.
4. **Cross-links** между документами (ссылки «см. также»).

### Контент/dict
- `dict.pages.legal.*`: `sections[].id` (для якорей).

### Чек-лист
- [ ] `[LE1]` Sidebar с переключателем документов + TOC
- [ ] `[LE1]` Типографика, effective-date, cross-links, `sections[].id`

## 2.10 B1 Exercises — `/[locale]/b1-exercises`

**Файл:** `app/[locale]/b1-exercises/page.tsx`

**Цель:** Переосмыслить страницу. Сейчас это teasер, URL обещает упражнения.

### Решение: гибрид

1. **Hero** — уникальный, с реальным примером задания в превью.
2. **Topics grid** — как сейчас, но с **кликабельными темами**.
3. **Демо-задания** (новый, client) — 2–3 интерактивных мини-задания (drag-drop / multiple-choice / fill-blank) как «попробуй бесплатно». Полная версия → `/courses?level=B1`.
4. **Sample materials** — downloadable PDF-плейсхолдеры или превью.
5. **CTA** → courses с пресетом B1.

### Контент/dict
- `dict.pages.b1`: `topics[].icon` (semantic), `demoExercises[]` (вопросы для мини-квиза).

### Чек-лист
- [ ] `[B1-1]` Hero с примером задания, semantic иконки в dict
- [ ] `[B1-1]` Демо-задания (2–3 интерактивных)
- [ ] `[B1-2]` Sample materials (PDF-плейсхолдеры), CTA с пресетом B1

---

# Часть 3 — Контент и данные

## 3.1 `messages/types.ts` + `ru.ts` + `pl.ts`

Расширения (синхронно в обеих локалях):

- `nav.announcement` — строка announcement-bar.
- `nav.partnership` — отдельный лейбл (починить баг в partnership).
- `hero.teacherId` — выбор преподавателя для hero-мокапа.
- `hero.floatingCards[]` — расширить (убрать хардкод «+200/мес»).
- `how.items[].icon` — имя иконки (semantic).
- `levels.items[].color` — ключ тон-шкалы (не хардкод hex).
- `business.benefits[].icon`, `business.packages[].price`, `business.cases[]`, `business.faq[]`, `business.badge` (вместо хардкод «B2B»).
- `b1.topics[].icon`, `b1.demoExercises[]`.
- `partnership.perks[].icon`, `partnership.calculator{}`, `partnership.partners[]`.
- `faq.categories[]`.
- `lead.consent` — текст RODO-чекбокса.
- `footer.payments[]` — массив ключей (вместо хардкода).
- `footer.newsletter*` — тексты формы.
- `contactInfo.whatsapp`, `contactInfo.telegram`.
- `teachers[]`: `id`, `languages[]`, `levels[]`, `specialties[]`, `bio`.
- `pages.courses.groups[].courses[]`: `id`, `icon`, `syllabus[]`.
- `pages.levelTest.result.recommendedCourses[]`.

## 3.2 `content/blog.ts`

- Добавить `author`, `tags[]`, `featured` (boolean).
- Расширить типы `body[]`: `callout {variant, text}`, `quote {text, cite?}`, `list-ordered`.
- Related-логика: по тегам (intersection), fallback по категории.
- Обложки: опционально `coverImage` (путь), иначе pattern/SVG на основе slug.

## 3.3 `lib/site.ts`

- `SOCIAL` объект: `{ instagram, youtube, tiktok, telegram }` (реальные URL).
- `WHATSAPP`, `TELEGRAM_CONTACT` URL.
- `PARTNERS` массив (для partnership-страницы).

## Чек-лист Части 3
- [ ] `[D1]` Расширить `types.ts` всеми новыми полями
- [ ] `[D1]` Синхронно обновить `ru.ts` и `pl.ts`
- [ ] `[D2]` Расширить `content/blog.ts` (author/tags/featured/body types/related)
- [ ] `[D2]` Расширить `lib/site.ts` (SOCIAL/WHATSAPP/TELEGRAM/PARTNERS)

---

# Часть 4 — Verification & Acceptance

## 4.1 Автоматические проверки

После **каждого** чанка:
```bash
npm run lint
npm run build
```

После завершения всех чанков страницы — полный прогон.

## 4.2 Визуальный чек-лист (per page)

Для каждой страницы проверить:

- [ ] Light mode корректен
- [ ] Dark mode корректен
- [ ] Mobile (375px) — нет горизонтального скролла, текст читаем
- [ ] Tablet (768px)
- [ ] Desktop (1280px) и wide (1536px)
- [ ] Все CTA ведут куда нужно (с пресетами в query)
- [ ] Локаль переключается (pl ↔ ru) без потерь контекста
- [ ] Шрифты загружаются (Nunito/Nunito Sans)
- [ ] Изображения оптимизированы (next/image где применимо)
- [ ] Нет layout shift (CLS)
- [ ] Нет хардкод-строк (всё из dict)

## 4.3 A11y-чек-лист

- [ ] Skip-link работает
- [ ] Tab-навигация логична, виден фокус
- [ ] Все интерактивные элементы доступны с клавиатуры
- [ ] `prefers-reduced-motion` отключает анимации
- [ ] Контраст текста AA минимум
- [ ] Изображения имеют alt
- [ ] aria-атрибуты на аккордеонах/табах/marquee

## 4.4 Performance

- [ ] Lighthouse Performance ≥ 90 (desktop)
- [ ] LCP < 2.5s
- [ ] Изображения в `next/image` или SVG
- [ ] Шрифты с `display: swap` + preconnect
- [ ] Motion-библиотека не тормозит (devtools performance)

## 4.5 Финальный прогон

- [ ] `npm run lint` — без ошибок
- [ ] `npm run build` — без ошибок
- [ ] Все страницы рендерятся в обеих локалях
- [ ] Sitemap (`app/sitemap.ts`) корректен
- [ ] robots.ts корректен
- [ ] OpenGraph-мета на всех страницах

---

# Приложение A — Распределение по терминалам (рекомендация)

Для максимального параллелизма. Зависимости: **Часть 0 сначала** (минимум 0.1–0.3), потом страницы параллельно.

| Терминал | Чанки (порядок) | Охват |
|-----------|-----------------|-------|
| T1 | C1 → C2 → C3 → C4 | Токены + первые motion-примитивы |
| T2 | C5 → C6 → C7 → C8 → C9 | Motion + UI-примитивы |
| T3 | C10 → C11 → C12 → C13 | Layout/chrome (после C1–C3) |
| T4 | H1 → H2 → H3 → H4 | Homepage 1–4 |
| T5 | H5 → H6 → H7 → H8 | Homepage 5–8 |
| T6 | H9 → H10 → H11 → H12 → H13 → H14 | Homepage 9–14 |
| T7 | CO1 → CO2 → TE1 → TE2 | Courses + Teachers |
| T8 | LT1 → LT2 → BU1 → BU2 | Level Test + Business |
| T9 | BL1 → BL2 → BP1 → BP2 | Blog list + post |
| T10 | CT1 → CT2 → PA1 → PA2 | Contact + Partnership |
| T11 | LE1 → B1-1 → B1-2 | Legal + B1 |
| T12 | D1 → D2 (после старта T4–T11) | Контент/dict-синхронизация |

> **Важно:** T12 (контент) должен идти **опережающе** или параллельно — страницы зависят от dict-полей. Рекомендуется стартовать T12 вместе с T1–T3.

---

# Приложение B — Глоссарий новых компонентов

| Компонент | Файл | Где используется |
|-----------|------|-----------------|
| `SpotlightCard` | `components/motion/spotlight-card.tsx` | Повсеместно |
| `MagneticButton` | `components/motion/magnetic-button.tsx` | Все CTA |
| `TextShimmer` | `components/motion/text-shimmer.tsx` | Hero, FinalCTA |
| `Marquee` | `components/motion/marquee.tsx` | Platforms, Reviews |
| `ScrollProgress` | `components/motion/scroll-progress.tsx` | Blog post, layout |
| `ParallaxLayer` | `components/motion/parallax-layer.tsx` | Hero, Business, FinalCTA |
| `CursorGlow` | `components/motion/cursor-glow.tsx` | Глобально |
| `Card` | `components/ui/card.tsx` | Повсеместно |
| `Tabs` | `components/ui/tabs.tsx` | Formats, Legal |
| `Accordion` | `components/ui/accordion.tsx` | FAQ, Business FAQ |
| `StatTile` | `components/ui/stat-tile.tsx` | Stats, Business |
| `ProgressRing` | `components/ui/progress-ring.tsx` | Level Test |
| `TagChip` | `components/ui/tag-chip.tsx` | Teachers, Blog |
| `Pill` | `components/ui/pill.tsx` | Levels, Badges |

---

_План зафиксирован. Начинать с Части 0._
