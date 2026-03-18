import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSection,
  FinanceSection,
  MarketplaceSection,
  AppsSection,
  CommunitySection,
  NuricionSection,
  AIFinanceSection,
  MentalHealthSection,
  MusicSection,
} from "./Module";

import buttonIcon from "../assets/animicon/button.png";
import arrowRightIcon from "../assets/animicon/arrow-rigth.png";
import mobileLeftArrow from "../assets/images/left_arrow.svg";
import mobileRightArrow from "../assets/images/right_arrow.svg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

const sections = [
  MessageSection,
  FinanceSection,
  MarketplaceSection,
  AppsSection,
  CommunitySection,
  AIFinanceSection,
  NuricionSection,
  MentalHealthSection,
  MusicSection,
];

export default function Home() {
  const [activeIndices, setActiveIndices] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);
  const autoScrollIntervalRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current);
    autoScrollIntervalRef.current = setInterval(() => {
      handleManualScroll("right");
    }, 5000) as unknown as number;
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [activeIndices]);

  const handleManualScroll = (dir: "left" | "right") => {
    startAutoScroll();
    setTransitionKey((prev) => prev + 1);
    setActiveIndices((prev) => {
      if (dir === "right") return (prev + 1) % sections.length;
      return (prev - 1 + sections.length) % sections.length;
    });
  };

  const CurrentSection = sections[activeIndices];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      
       
        <div
          
        />
      

     

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence>
          <M.div
            key={transitionKey}
            className="absolute inset-0 w-full h-full"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <CurrentSection />
          </M.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <>
          <M.button
            className="absolute left-2 md:left-4 lg:left-4 xl:left-10 top-1/2 -translate-y-1/2 z-20 opacity-70 hover:opacity-100 transition-opacity disabled:opacity-30"
            onClick={() => handleManualScroll("left")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={buttonIcon} alt="Previous" className="hidden lg:block w-[60px] h-[60px] xl:w-20 xl:h-20" />
            <img src={mobileLeftArrow} alt="Previous" className="block lg:hidden w-12 h-12 md:w-14 md:h-14" />
          </M.button>

          <M.button
            className="absolute right-2 md:right-4 lg:right-4 xl:right-10 top-1/2 -translate-y-1/2 z-20 opacity-70 hover:opacity-100 transition-opacity"
            onClick={() => handleManualScroll("right")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src={arrowRightIcon} alt="Next" className="hidden lg:block w-[60px] h-[60px] xl:w-20 xl:h-20" />
            <img src={mobileRightArrow} alt="Next" className="block lg:hidden w-12 h-12 md:w-14 md:h-14" />
          </M.button>
      </>
    </div>
  );
}
