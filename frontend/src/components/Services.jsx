import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "../data/site";
import { fadeUp } from "../lib/motion";

export const Services = () => {
  return (
    <section id="services" data-testid="services" className="bg-[#1A1A1A] text-white py-24 md:py-32">
      <div className="px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
              [ What we do ]
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-none tracking-tight mt-5">
              Four ways we build
            </h2>
          </div>
          <p className="text-white/60 max-w-sm">
            One team, one point of contact, from your first drawing to the day you get your keys.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.tag}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              data-testid={`service-${i}`}
              className="group relative bg-[#1A1A1A] overflow-hidden"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C25E40]">
                    {s.tag}
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-white/40 group-hover:text-[#C25E40] group-hover:rotate-45 transition-all duration-300"
                  />
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl mt-4 tracking-tight">{s.title}</h3>
                <p className="mt-3 text-white/60 leading-relaxed max-w-md">{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
