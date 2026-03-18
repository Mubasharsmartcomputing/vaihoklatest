import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { $lang } from "../store";
import { t } from "../i18n";
import ComingSoonModal from "../components/ComingSoonModal";

import mobileBg from "../assets/images/mobilelayout.png";
import phoneImg from "../assets/pages/benifits.png";
import buttonIcon from "../assets/animicon/button.png";
import anim7qr from "../assets/animicon/anim7qr.png";
import anim3money from "../assets/animicon/anim3money.png";
import anim3mon from "../assets/animicon/anim3mon.png";
import appStoreIcon from "../assets/subsection/app-store-badge.svg";
import playStoreIcon from "../assets/subsection/google-play-badge.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

export default function Benifits() {
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
          className="hidden lg:block absolute inset-0 z-0"
         
        >
         
          
        </div>

        {/* ── Mobile Background ── */}
        <img
          src={mobileBg}
          alt=""
          className="block lg:hidden absolute inset-0 w-full h-full object-cover z-0"
        />
       

        {/* ══ DESKTOP ══ */}
        <div
          className="hidden lg:flex relative z-10 h-full items-center px-16 xl:px-24"
          style={{ paddingTop: "88px" }}
        >
          {/* Left — content */}
          <M.div
            className={`w-1/2 flex flex-col gap-3 xl:gap-4 ${isRTL ? "pr-4" : "pl-4"}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back arrow — sits above the heading */}
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
              dangerouslySetInnerHTML={{ __html: t("benefits.title") }}
            />
            <p className="text-base xl:text-lg font-semibold opacity-95 leading-snug max-w-[48ch]">
              {t("benefits.subtitle")}
            </p>

            <div className="text-sm xl:text-base leading-relaxed space-y-1 max-w-[50ch]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <p key={i}>
                  <span className="font-bold">{t(`benefits.item${i}.title`)}</span>
                  <span className="opacity-80"> {t(`benefits.item${i}.desc`)}</span>
                </p>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-1">
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
                src={phoneImg}
                alt="Benefits"
                className="w-full h-full object-contain object-bottom drop-shadow-2xl relative z-20"
              />
              {/* QR code — top right */}
              <M.img
                src={anim7qr}
                alt="QR"
                className="absolute drop-shadow-xl z-30"
                style={{
                  top: "8%",
                  ...(isRTL ? { left: "5%" } : { right: "5%" }),
                  width: "120px",
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              {/* Credit card — left of phone */}
              <M.img
                src={anim3mon}
                alt="Card"
                className="absolute drop-shadow-xl z-10"
                style={{
                  bottom: "20%",
                  ...(isRTL ? { right: "-10%" } : { left: "-10%" }),
                  width: "200px",
                }}
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />
              {/* Money — behind/below */}
              <M.img
                src={anim3money}
                alt="Money"
                className="absolute drop-shadow-xl z-0"
                style={{
                  bottom: "-10%",
                  ...(isRTL ? { right: "-20%" } : { left: "-20%" }),
                  width: "260px",
                }}
                animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
            </div>
          </M.div>
        </div>

        {/* ══ MOBILE ══ */}
        <div className="lg:hidden relative z-10 flex flex-col items-center text-center h-full px-6 pt-10">
          {/* Back arrow above heading */}
          <M.button
            className="mb-3 opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => navigate("/home")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={buttonIcon}
              alt="Back"
              className="w-10 h-10"
              style={isRTL ? { transform: "scaleX(-1)" } : {}}
            />
          </M.button>

          <M.h1
            className="font-black italic text-[34px] sm:text-[42px] leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            dangerouslySetInnerHTML={{ __html: t("benefits.title") }}
          />
          <M.p
            className="text-sm sm:text-base font-medium opacity-90 leading-snug w-[85%] mt-3 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {t("benefits.subtitle")}
          </M.p>
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
              <img src={phoneImg} alt="Benefits" className="w-full object-contain drop-shadow-2xl relative z-20" />
              <M.img
                src={anim7qr}
                alt="QR"
                className={`absolute top-[5%] ${isRTL ? "left-[-10%]" : "right-[-10%]"} w-[80px] drop-shadow-xl z-30`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <M.img
                src={anim3mon}
                alt="Card"
                className={`absolute bottom-[25%] ${isRTL ? "right-[-12%]" : "left-[-12%]"} w-[110px] drop-shadow-xl z-10`}
                animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
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
