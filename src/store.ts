import { atom } from "nanostores";

export type Lang = "en" | "es" | "pt" | "zh" | "ar";

export const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "zh", name: "中文" },
  { code: "ar", name: "العربية" },
];

export const $lang = atom<Lang>("en");

export function setLanguage(lang: Lang) {
  $lang.set(lang);
}
