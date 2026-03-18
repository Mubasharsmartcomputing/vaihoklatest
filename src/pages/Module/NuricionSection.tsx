

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $lang } from "../../store";
import { t } from "../../i18n";
import MessageSubsection from "../../components/detailPages/MessageSubsection";
import chatVideo from "../../assets/animations/Nutrition.webm";
import mobileBg from "../../assets/images/mobilelayout2.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

export default function NuricionSection() {
  useStore($lang);
  const [showSub, setShowSub] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {showSub ? (
        <M.div key="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <MessageSubsection onBack={() => setShowSub(false)} />
        </M.div>
      ) : (
        <M.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ══ DESKTOP ══ */}
          <div className="hidden md:flex items-end min-h-[calc(100vh-88px)] px-12 lg:px-20 xl:px-28 overflow-visible">
            {/* Left text */}
            <M.div
              className="w-1/2 flex flex-col justify-center text-white space-y-5 lg:space-y-6 pb-16"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="font-bold text-5xl lg:text-6xl xl:text-[72px] 2xl:text-8xl leading-[1.05]">
                {t("sections.nutrition.title1")}
                <br />
                {t("sections.nutrition.title2")}
              </h1>

              <p className="font-semibold text-xl lg:text-2xl xl:text-3xl leading-snug">
                {t("sections.nutrition.subtitle")}
              </p>

              <p
                className="text-base lg:text-lg xl:text-xl opacity-90 max-w-[42ch] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t("sections.nutrition.desc") }}
              />

              <button
                onClick={() => setShowSub(true)}
                className="w-fit px-10 py-4 bg-black/80 hover:bg-black text-white font-semibold text-base rounded-full border border-white/15 transition-all hover:scale-105 cursor-pointer mt-2"
              >
                {t("sections.discover_button")}
              </button>
            </M.div>

            {/* Right — character video overflows to top, attached to header */}
            <M.div
              className="w-1/2 flex items-end justify-center"
              style={{ height: "calc(100vh - 88px)" }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <video
                src={chatVideo}
                autoPlay loop muted playsInline
                className="w-full h-full object-contain object-bottom"
              />
            </M.div>
          </div>

          {/* ══ MOBILE ══ */}
          <div className="flex md:hidden flex-col min-h-[calc(100vh-64px)] relative overflow-hidden">
            {/* Mobile bg image fills entire section */}
            <div className="absolute inset-0 z-0">
              <img src={mobileBg} alt="" className="w-full h-full object-cover" />
              {/* purple radial glow on top */}
              <div
                className="absolute inset-0"
               
              />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-white text-center flex-1">
              {/* Title */}
              <M.div
                className="px-6 pt-6 space-y-1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-bold text-[38px] sm:text-5xl leading-tight">
                  {t("sections.nutrition.title1")}
                  <br />
                  {t("sections.nutrition.title2")}
                </h1>
                <p className="font-semibold text-base sm:text-lg opacity-95 mt-1">
                  {t("sections.nutrition.subtitle")}
                </p>
              </M.div>

              {/* Character video — center, large */}
              <M.div
                className="w-full flex items-center justify-center px-2 flex-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <video
                  src={chatVideo}
                  autoPlay loop muted playsInline
                  className="w-full max-w-[320px] sm:max-w-[400px] object-contain"
                />
              </M.div>

              {/* Description + dots + button */}
              <M.div
                className="px-6 pb-8 space-y-4 flex flex-col items-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p
                  className="text-sm sm:text-base opacity-80 max-w-[32ch] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t("sections.nutrition.mobile_desc") }}
                />

                {/* Pagination dots */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <div className="w-2 h-2 rounded-full border border-white/40" />
                  <div className="w-2 h-2 rounded-full border border-white/40" />
                </div>

                <button
                  onClick={() => setShowSub(true)}
                  className="px-12 py-4 rounded-full text-white font-semibold text-base cursor-pointer transition-all hover:scale-105 active:scale-95"
                  style={{
                    background: "linear-gradient(90deg,#6A1BA0 0%,#9C27B0 50%,#6A1BA0 100%)",
                    boxShadow: "0 0 28px rgba(156,39,176,0.5)",
                  }}
                >
                  {t("sections.discover_button")}
                </button>
              </M.div>
            </div>
          </div>
        </M.div>
      )}
    </AnimatePresence>
  );
}
