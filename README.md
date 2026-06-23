# MOVASchool — сайт школы польского языка

Современный мультиязычный (PL / RU) сайт онлайн-школы польского языка, вдохновлённый
[movaschool.pl](https://movaschool.pl): лендинг, курсы, преподаватели, интерактивный тест
уровня, раздел для бизнеса (B2B), SEO-блог и юридические страницы.

## Стек

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (токены через `@theme` в `app/globals.css`)
- **motion** (Framer Motion) — анимации, с уважением к `prefers-reduced-motion`
- **lucide-react** — иконки
- Свой лёгкий слой i18n (без внешних зависимостей)

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000 → редирект на /pl
npm run build    # продакшен-сборка
npm run start    # запуск собранного приложения
```

## Мультиязычность

- Маршруты: `/[locale]/...`, локали `pl` (по умолчанию) и `ru` — см. `lib/i18n/config.ts`.
- `proxy.ts` (в Next 16 middleware переименован в proxy) редиректит пути без локали,
  учитывая заголовок `Accept-Language`.
- Все тексты интерфейса и контент страниц — в `messages/pl.ts` и `messages/ru.ts`
  (общий тип `messages/types.ts` гарантирует, что обе локали совпадают по структуре).
- Статьи блога — в `content/blog.ts` (тоже на двух языках).

## Структура

```
app/[locale]/        # страницы: главная, courses, teachers, level-test,
                     # business, blog, contact, partnership, b1-exercises, legal/[doc]
app/api/lead/        # приём заявок формы (заглушка — см. ниже)
app/sitemap.ts       # sitemap.xml (все локали + блог)
app/robots.ts        # robots.txt
components/sections/ # секции главной и блоки страниц
components/motion/    # Reveal, Stagger, Counter, Aurora, TiltCard
components/layout/    # Header, Footer, LocaleSwitcher, ThemeToggle, Logo
components/ui/        # Button, Container, Badge, SectionHeading
messages/, content/  # контент (двуязычный)
public/teachers, /payments, /platforms, /logo.png  # ассеты с movaschool.pl
```

## Форма заявки

Форма шлёт `POST /api/lead`. Сейчас обработчик (`app/api/lead/route.ts`) только логирует
данные — замените `console.log` на реальную интеграцию (CRM, e-mail, Telegram-бот,
Google Sheets и т.п.).

## Заметки

- **Шрифты** (Nunito + Nunito Sans) подключены через `<link>` Google Fonts в
  `app/[locale]/layout.tsx`, а не через `next/font`. Причина: в текущем окружении HTTPS
  перехватывается и Node не доверяет цепочке сертификатов, из-за чего `next/font` падает при
  загрузке на этапе сборки. Когда сертификат окружения будет исправлен, можно вернуться к
  `next/font` для self-hosting.
- **Тёмная тема** — через класс `.dark` на `<html>`, переключатель в шапке, без мигания
  (инлайн-скрипт `ThemeScript`).
- **SEO** — на статьях блога есть JSON-LD (`Article`), у страниц `generateMetadata`,
  есть `sitemap.xml` и `robots.txt`, `alternates.languages` для pl/ru.
- **Дизайн** — палитра и стиль согласованы с движком ui-ux-pro-max (бренд-синий + зелёный
  акцент, мягкие тени, скругления, Soft UI). Логотип воссоздан в коде для чёткости и
  адаптации к тёмной теме.
- Обложки статей блога — on-brand градиенты (без стоковых картинок). При желании их легко
  заменить на изображения, сгенерированные ИИ.
