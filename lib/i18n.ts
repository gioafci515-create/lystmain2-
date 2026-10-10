import { ge } from "./dict/ge";
import { en } from "./dict/en";
import { ru } from "./dict/ru";

export const locales = ["ge", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof ge;

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

const dicts: Record<Locale, Dict> = { ge, en, ru };
export const getDict = (l: Locale): Dict => dicts[l];

export const htmlLang: Record<Locale, string> = { ge: "ka", en: "en", ru: "ru" };
export const localeLabel: Record<Locale, string> = { ge: "GE", en: "EN", ru: "RU" };
