import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@nanostores/react";
import { $lang } from "../../store";
import { t } from "../../i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../../assets/logo/logo.png";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const M = motion as any;

interface NavLink {
  label: string;
  to: string;
  subLinks?: { label: string; to: string }[];
}

interface HeaderProps {
  onBackClick?: () => void;
}

function NavItemDesktop({
  link,
  location,
}: {
  link: NavLink;
  location: ReturnType<typeof useLocation>;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!link.subLinks) {
    return (
      <Link
        to={link.to}
        className={`text-sm font-medium px-3 py-1.5 transition-colors whitespace-nowrap ${
          location.pathname === link.to
            ? "text-white font-semibold"
            : "text-white/85 hover:text-white"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 text-white/85 hover:text-white transition-colors whitespace-nowrap cursor-pointer"
      >
        {link.label}
        <svg
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <M.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-48 rounded-xl py-2 z-50"
            style={{
              background: "rgba(22,5,57,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {link.subLinks.map((sub) => (
              <Link
                key={sub.to}
                to={sub.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm hover:bg-white/5 transition-colors ${
                  location.pathname === sub.to
                    ? "text-white font-semibold"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {sub.label}
              </Link>
            ))}
          </M.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ onBackClick }: HeaderProps = {}) {
  useStore($lang);
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getNavLinks = (): NavLink[] => [
    { label: t("menu.home"), to: "/home" },
    {
      label: t("menu.features"),
      to: "#",
      subLinks: [
        { label: t("menu.chat"), to: "/chat" },
        { label: t("menu.wallet"), to: "/wallet" },
        { label: t("menu.marketplace"), to: "/marketplace" },
        { label: t("menu.apps"), to: "/apps" },
        { label: t("menu.nutrition"), to: "/nutrition" },
        { label: t("menu.communities"), to: "/communities" },
        { label: t("menu.music"), to: "/musica" },
        { label: t("menu.mental-health"), to: "/salud-mental" },
        { label: t("menu.finance"), to: "/finance" },
      ],
    },
    { label: t("menu.services"), to: "/services" },
    { label: t("menu.benefits"), to: "/benefits" },
    { label: t("menu.about"), to: "/about" },
    { label: t("menu.contact"), to: "/contact" },
  ];

  const navLinks = getNavLinks();

  return (
    <M.header
      className="w-full z-50"
      style={{ background: "transparent" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* ── DESKTOP: transparent floating bar with gap ── */}
      <div className="hidden lg:block px-6 xl:px-10 pt-5">
        <div
          className="flex items-center justify-between px-8 xl:px-10 py-3 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img src={logo} alt="Vaihok" className="w-36 xl:w-44 h-auto object-contain" />
          </Link>

          {/* Nav + Language */}
          <div className="flex items-center gap-0.5 xl:gap-1 2xl:gap-3">
            {navLinks.map((link) => (
              <NavItemDesktop key={link.label} link={link} location={location} />
            ))}
            <div className="ml-3 shrink-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: logo centered + purple circle hamburger ── */}
      <div className="flex lg:hidden items-center justify-between px-5 pt-4 pb-2 relative" style={{ background: "transparent" }}>
        {/* Back or spacer */}
        {onBackClick ? (
          <button
            onClick={onBackClick}
            className="w-9 h-9 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-9" />
        )}

        {/* Centered logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <img src={logo} alt="Vaihok" className="w-32 h-auto object-contain" />
        </Link>

        {/* Purple circle hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-105 shrink-0"
          style={{
            background: "rgba(115,51,142,0.9)",
            border: "1px solid rgba(182,72,217,0.5)",
          }}
          aria-label={mobileOpen ? t("menu.close") : t("menu.open")}
        >
          {mobileOpen ? (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <M.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-[64px] z-40 flex flex-col px-6 py-6 overflow-y-auto"
            style={{
              background: "rgba(13,1,32,0.97)",
              backdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              maxHeight: "calc(100vh - 64px)",
            }}
          >
            {navLinks.map((link) =>
              link.subLinks ? (
                <div key={link.label} className="mb-2">
                  <p className="text-purple-400 text-xs uppercase tracking-widest mb-2 mt-3">
                    {link.label}
                  </p>
                  {link.subLinks.map((sub) => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pl-3 text-white/75 hover:text-white border-l border-purple-800 mb-1 text-sm"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 text-base font-medium border-b border-white/08 ${
                    location.pathname === link.to ? "text-purple-300" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-5">
              <LanguageSwitcher align="left" />
            </div>
          </M.div>
        )}
      </AnimatePresence>
    </M.header>
  );
}
