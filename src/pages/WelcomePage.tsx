import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $lang } from "../store";
import { t } from "../i18n";

import bgWelcome from "../assets/logo/bgwelcome.png";
import logoWelcome from "../assets/logo/logowelcome.png";
import logoMobile from "../assets/logo/logo.png";
import introVideo from "../assets/animations/Intro.webm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

export default function WelcomePage() {
  useStore($lang);
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const characterY = useTransform(scrollY, [0, 400], [0, 60]);
  const textOpacity = useTransform(scrollY, [0, 250], [1, 0]);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">

      {/* ── DESKTOP background ── */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg,#5B1A8C 0%,#841DC0 45%,#841DC0 55%,#5B1A8C 100%)" }}
        />
        <img
          src={bgWelcome}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ mixBlendMode: "soft-light", opacity: 0.85 }}
        />
        {/* left dark panel */}
        <div className="absolute inset-y-0 left-0 w-[18%] pointer-events-none"
          style={{ background: "linear-gradient(to right,rgba(15,4,30,0.92) 0%,transparent 100%)" }} />
        {/* right dark panel */}
        <div className="absolute inset-y-0 right-0 w-[18%] pointer-events-none"
          style={{ background: "linear-gradient(to left,rgba(15,4,30,0.92) 0%,transparent 100%)" }} />
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top,rgba(15,4,30,0.7) 0%,transparent 100%)" }} />
      </div>

      {/* ── MOBILE background ── */}
      <div className="block md:hidden absolute inset-0 z-0">
        {/* dark purple radial glow like the mobile Figma */}
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 75%,#7B1FA2 0%,#4A0072 40%,#0d0120 100%)" }} />
      </div>

      {/* ── CONTENT ── */}
      {/* DESKTOP layout */}
      <div className="hidden md:flex relative z-20 min-h-screen items-center px-16 lg:px-24 xl:px-32">

        {/* Left column */}
        <M.div
          style={{ opacity: textOpacity }}
          className="flex flex-col justify-center w-1/2 text-white space-y-6"
        >
          <img src={logoWelcome} alt="Vaihok" className="w-48 lg:w-56 xl:w-64 h-auto mb-4" />

          <M.h1
            className="font-bold text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            dangerouslySetInnerHTML={{ __html: t("welcome.title") }}
          />

          <M.p
            className="font-semibold text-xl lg:text-2xl xl:text-3xl leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
          >
            {t("welcome.subtitle")}
          </M.p>

          <M.p
            className="text-base lg:text-lg xl:text-xl leading-relaxed opacity-90 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            {t("welcome.description")}
          </M.p>

          <M.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <button
              onClick={() => navigate("/home")}
              className="px-10 py-4 bg-black/85 hover:bg-black text-white font-semibold text-base rounded-full border border-white/10 transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              {t("welcome.button")}
            </button>
          </M.div>
        </M.div>

        {/* Right column — character */}
        <M.div
          style={{ y: characterY }}
          className="w-1/2 flex items-end justify-center h-screen"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <video
            src={introVideo}
            autoPlay loop muted playsInline
            className="w-full h-full object-contain object-bottom"
          />
        </M.div>
      </div>

      {/* MOBILE layout */}
      <div className="flex md:hidden relative z-20 flex-col min-h-screen">

        {/* Top text area */}
        <M.div
          style={{ opacity: textOpacity }}
          className="flex flex-col items-center text-center text-white px-6 pt-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={logoMobile} alt="Vaihok" className="w-40 h-auto mb-2" />

          <h1
            className="font-bold text-4xl sm:text-5xl leading-tight"
            dangerouslySetInnerHTML={{ __html: t("welcome.title") }}
          />

          <p className="font-semibold text-base sm:text-lg leading-snug opacity-95">
            {t("welcome.subtitle")}
          </p>

          <p className="text-sm sm:text-base leading-relaxed opacity-80 max-w-xs">
            {t("welcome.description")}
          </p>

          <button
            onClick={() => navigate("/home")}
            className="mt-2 px-10 py-4 rounded-full text-white font-semibold text-base cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(90deg,#6A1BA0 0%,#9C27B0 50%,#6A1BA0 100%)",
              boxShadow: "0 0 24px rgba(156,39,176,0.5)",
            }}
          >
            {t("welcome.button")}
          </button>
        </M.div>

        {/* Character video — bottom half */}
        <M.div
          style={{ y: characterY }}
          className="flex-1 flex items-end justify-center"
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <video
            src={introVideo}
            autoPlay loop muted playsInline
            className="w-full max-w-[320px] sm:max-w-[380px] object-contain"
          />
        </M.div>
      </div>

    </section>
  );
}
