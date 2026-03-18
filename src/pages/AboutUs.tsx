import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $lang } from "../store";
import { t } from "../i18n";
import ComingSoonModal from "../components/ComingSoonModal";

import mobileBg from "../assets/images/mobilelayout.png";
import aboutUsImg from "../assets/pages/aboutus.png";
import anim4mt from "../assets/animicon/anim4mt.png";
import anim4maret from "../assets/animicon/anim4maret.png";
import buttonIcon from "../assets/animicon/button.png";
import appStoreIcon from "../assets/subsection/app-store-badge.svg";
import playStoreIcon from "../assets/subsection/google-play-badge.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

export default function AboutUs() {
  const lang = useStore($lang);
  const isRTL = lang === "ar";
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState<"apple" | "google" | null>(null);

  return (
    <>
      <section
        className="relative w-full h-screen overflow-hidden text-white"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* ── Desktop Background ── */}
        <div
          
        >
         
          {/* Right/Left dark vignette */}
          <div
            className="absolute z-[1] pointer-events-none top-0 h-full w-[40%]"
            style={{
              ...(isRTL ? { left: 0 } : { right: 0 }),
              background: isRTL
                ? "linear-gradient(to right, rgba(5,0,10,0.92) 0%, rgba(5,0,10,0.6) 50%, transparent 100%)"
                : "linear-gradient(to left, rgba(5,0,10,0.92) 0%, rgba(5,0,10,0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* ── Mobile Background ── */}
        <img
          src={mobileBg}
          alt=""
          className="block lg:hidden absolute inset-0 w-full h-full object-cover z-0"
        />
        <div
          className="block lg:hidden absolute inset-0 z-[1]"
         
        />

        {/* ══ DESKTOP ══ */}
        <div className="hidden lg:flex relative z-10 h-full items-center px-16 xl:px-24" style={{ paddingTop: "88px" }}>
          {/* Left — text content */}
          <M.div
            className={`w-1/2 flex flex-col gap-3 xl:gap-4 ${isRTL ? "pr-4" : "pl-4"}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back arrow — above heading like Figma */}
            <M.button
              className="w-fit opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => navigate("/home")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={buttonIcon}
                alt="Back"
                className="w-12 h-12 xl:w-14 xl:h-14"
                style={isRTL ? { transform: "scaleX(-1)" } : {}}
              />
            </M.button>
            <h1
              className="font-black italic text-4xl xl:text-5xl 2xl:text-6xl leading-[1.05]"
              dangerouslySetInnerHTML={{ __html: t("about.title") }}
            />
            <p
              className="text-base xl:text-lg font-semibold opacity-95 leading-snug max-w-[48ch]"
              dangerouslySetInnerHTML={{ __html: t("about.subtitle") }}
            />
            <div className="text-sm xl:text-base opacity-85 leading-relaxed space-y-1 max-w-[50ch]">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowComingSoon("apple")}>
                <img src={appStoreIcon} alt="App Store" className="h-9 w-auto object-contain" />
              </button>
              <button onClick={() => setShowComingSoon("google")}>
                <img src={playStoreIcon} alt="Play Store" className="h-9 w-auto object-contain" />
              </button>
            </div>
          </M.div>

          {/* Right — phone + floating icons */}
          <M.div
            className={`absolute bottom-0 ${isRTL ? "left-0" : "right-0"} z-10`}
            style={{ width: "clamp(320px, 30vw, 700px)", height: "92%" }}
            initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <div className="relative w-full h-full">
              <img
                src={aboutUsImg}
                alt="About Vaihok"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl relative z-20"
              />
              {/* Floating box — top left of phone */}
              <M.img
                src={anim4mt}
                alt="Box"
                className="absolute drop-shadow-xl z-30"
                style={{
                  top: "22%",
                  ...(isRTL ? { right: "-8%" } : { left: "-8%" }),
                  width: "150px",
                }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Floating star tag — top right of phone */}
              <M.img
                src={anim4maret}
                alt="Star Tag"
                className="absolute drop-shadow-xl z-10"
                style={{
                  top: "8%",
                  ...(isRTL ? { left: "8%" } : { right: "8%" }),
                  width: "180px",
                  height: "180px",
                }}
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
            </div>
          </M.div>
        </div>

        {/* ══ MOBILE ══ */}
        <div className="lg:hidden relative z-10 flex flex-col items-center text-center h-full px-6 pt-10">
          <M.h1
            className="font-black italic text-[34px] sm:text-[42px] leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            dangerouslySetInnerHTML={{ __html: t("about.title") }}
          />
          <M.p
            className="text-sm sm:text-base font-medium opacity-90 leading-snug w-[85%] mt-3 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            dangerouslySetInnerHTML={{ __html: t("about.subtitle") }}
          />
          <M.div
            className="flex flex-row gap-3 mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <button onClick={() => setShowComingSoon("apple")}>
              <img src={appStoreIcon} alt="App Store" className="h-9 w-auto object-contain" />
            </button>
            <button onClick={() => setShowComingSoon("google")}>
              <img src={playStoreIcon} alt="Play Store" className="h-9 w-auto object-contain" />
            </button>
          </M.div>

          {/* Phone + floating icons */}
          <M.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
            style={{ width: "72%", maxWidth: "320px" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <img src={aboutUsImg} alt="About Vaihok" className="w-full object-contain drop-shadow-2xl relative z-20" />
              <M.img
                src={anim4mt}
                alt="Box"
                className={`absolute top-[18%] ${isRTL ? "right-[-15%]" : "left-[-15%]"} w-[110px] drop-shadow-xl z-30`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <M.img
                src={anim4maret}
                alt="Star Tag"
                className={`absolute top-[5%] ${isRTL ? "left-[-10%]" : "right-[-10%]"} w-[120px] h-[120px] drop-shadow-xl z-10`}
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
            </div>
          </M.div>
        </div>

        <ComingSoonModal
          isOpen={!!showComingSoon}
          type={showComingSoon || "apple"}
          onClose={() => setShowComingSoon(null)}
        />
      </section>
    </>
  );
}
