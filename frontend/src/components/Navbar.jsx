import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { NAV, CONTACT } from "../data/site";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/10"
          : "bg-gradient-to-b from-[#1A1A1A]/85 via-[#1A1A1A]/40 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-[72px]">
        <a href="#top" data-testid="nav-logo" className="flex items-center gap-3">
          <img
            src={CONTACT.logo}
            alt="Rafeek Homes"
            className="h-10 w-10 object-cover rounded-full border border-white/20"
          />
          <span className="font-display font-bold text-lg tracking-tight leading-none text-white">
            RAFEEK<span className="text-[#C25E40]">.</span>HOMES
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-testid={`nav-link-${n.label.toLowerCase()}`}
              className="link-underline text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors duration-200"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            data-testid="nav-call-btn"
            className="hidden md:inline-flex items-center gap-2 bg-[#C25E40] text-white text-sm font-medium px-5 h-11 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
          >
            <Phone size={15} /> Enquire
          </a>
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden w-11 h-11 flex items-center justify-center border border-white/25 text-white"
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden overflow-hidden bg-[#1A1A1A] border-b border-white/10"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-5 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-nav-${n.label.toLowerCase()}`}
                  className="py-3 text-lg font-display font-medium text-white border-b border-white/10"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`tel:${CONTACT.phoneRaw}`}
                className="mt-4 bg-[#C25E40] text-white text-center py-3 font-medium"
              >
                Call {CONTACT.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
