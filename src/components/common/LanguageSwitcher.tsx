import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $lang, setLanguage, languages } from "../../store";
import type { Lang } from "../../store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

import flagEn from "../../assets/flags/us.svg";
import flagEs from "../../assets/flags/co.svg";
import flagPt from "../../assets/flags/br.svg";
import flagZh from "../../assets/flags/cn.svg";
import flagAr from "../../assets/flags/sa.svg";

const flags = {
    en: flagEn,
    es: flagEs,
    pt: flagPt,
    zh: flagZh,
    ar: flagAr,
};

interface LanguageSwitcherProps {
    align?: "left" | "right";
}

export default function LanguageSwitcher({ align = "right" }: LanguageSwitcherProps = {}) {
    const currentLang = useStore($lang);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (lang: Lang) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLanguageObj = languages.find((l) => l.code === currentLang) || languages[0];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-[#1E0A3C] hover:bg-[#2A0E54] transition-colors text-white cursor-pointer"
            >
                <img src={flags[currentLang as keyof typeof flags]} alt={currentLanguageObj.name} className="w-5 h-4 rounded-sm object-cover" />
                <span className="text-sm font-medium">{currentLanguageObj.name}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <M.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute mt-2 py-2 w-40 rounded-xl shadow-2xl z-50 overflow-hidden ${align === "right" ? "right-0" : "left-0"
                            }`}
                        style={{
                            background: "#160539",
                            border: "1px solid rgba(255,255,255,0.08)",
                        }}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleLanguageChange(lang.code as Lang)}
                                className={`w-full flex items-center justify-between px-4 py-2 hover:bg-white/5 transition-colors cursor-pointer ${currentLang === lang.code ? "bg-[#2A0E54]" : ""
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <img src={flags[lang.code as keyof typeof flags]} alt={lang.name} className="w-5 h-4 rounded-sm object-cover" />
                                    <span className="text-sm text-white/90">{lang.name}</span>
                                </div>
                                {currentLang === lang.code && (
                                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </M.div>
                )}
            </AnimatePresence>
        </div>
    );
}
