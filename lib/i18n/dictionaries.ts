import type { Locale } from "./config";
import type { Dictionary } from "@/messages/types";

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  pl: () => import("@/messages/pl").then((m) => m.pl),
  ru: () => import("@/messages/ru").then((m) => m.ru),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
