import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
import { lineReveal } from "../lib/motion";

const LINES = ["We build homes", "worth coming", "home to."];

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.42, 0.7]);

  return (
    <section ref={ref} id="top" data-testid="hero" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
          alt="Luxury villa by Rafeek Homes"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div style={{ opacity: overlay }} className="absolute inset-0 bg-[#1A1A1A]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/70 via-transparent to-[#1A1A1A]/20" />

      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-10 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#F9F8F6]/90">
            Est. Sivagangai · Tamil Nadu
          </span>
          <span className="h-px w-10 bg-[#C25E40]" />
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white bg-[#C25E40] px-2 py-1">
            Rafeek Construction
          </span>
        </motion.div>

        <h1 className="font-display font-bold text-white leading-[0.92] tracking-tight text-[15vw] md:text-[10.5vw] lg:text-[8.5rem]">
          {LINES.map((line, i) => (
            <span key={i} className="reveal-mask">
              <motion.span
                custom={i}
                variants={lineReveal}
                initial="hidden"
                animate="show"
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <p className="max-w-md text-white/80 text-base md:text-lg leading-relaxed">
            Turnkey luxury villas & individual homes for sale across Sivagangai — designed,
            built and finished by one team you can trust.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#projects"
              data-testid="hero-projects-btn"
              className="group inline-flex items-center gap-2 bg-[#C25E40] text-white px-7 h-14 font-medium hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
            >
              View Our Homes
              <ArrowDownRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>
            <a
              href="#contact"
              data-testid="hero-contact-btn"
              className="inline-flex items-center gap-2 border border-white/40 text-white px-7 h-14 font-medium hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300"
            >
              Book a Visit
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 right-5 md:right-10 z-10 hidden md:flex items-center gap-2 -rotate-90 origin-right">
        <MapPin size={14} className="text-white/70" />
        <span className="text-[11px] tracking-[0.2em] uppercase text-white/70">Muthu Nagar · 630561</span>
      </div>
    </section>
  );
};
