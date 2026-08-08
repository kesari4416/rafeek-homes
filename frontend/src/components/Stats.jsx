import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "../data/site";

const CountUp = ({ target, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {val}
      <span className="text-[#C25E40]">{suffix}</span>
    </span>
  );
};

export const Stats = () => {
  return (
    <section data-testid="stats" className="bg-[#EFEBE3] py-20 md:py-28 border-b border-black/10">
      <div className="px-5 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-y-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            data-testid={`stat-${i}`}
            className="lg:border-l border-black/10 lg:pl-8"
          >
            <div className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-none">
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs md:text-sm font-medium tracking-[0.15em] uppercase text-[#4A4A4A]">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
