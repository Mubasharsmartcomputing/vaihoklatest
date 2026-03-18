import { $lang } from "./store";
import en from "./locales/en.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";
import ar from "./locales/ar.json";

const locales: Record<string, Record<string, unknown>> = { en, es, pt, zh, ar };

export function t(key: string): string {
  const lang = $lang.get();
  const locale = locales[lang] ?? locales["en"];
  // Try flat key first (e.g. "welcome.title"), then nested traversal
  const flat = (locale as Record<string, unknown>)[key];
  if (typeof flat === "string") return flat;
  const flatEn = (locales["en"] as Record<string, unknown>)[key];
  if (typeof flatEn === "string") return flatEn;
  // Nested traversal for keys like "subsections.music.title1"
  const parts = key.split(".");
  let cur: unknown = locale;
  for (const part of parts) {
    if (cur && typeof cur === "object") cur = (cur as Record<string, unknown>)[part];
    else return key;
  }
  return typeof cur === "string" ? cur : key;
}
