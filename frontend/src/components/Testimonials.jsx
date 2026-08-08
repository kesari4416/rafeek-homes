import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "../data/site";
import { fadeUp } from "../lib/motion";

export const Testimonials = () => {
  return (
    <section data-testid="testimonials" className="bg-[#F9F8F6] py-24 md:py-32 border-b border-black/10">
      <div className="px-5 md:px-10">
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
          [ Owners' words ]
        </span>
        <h2 className="font-display font-bold text-4xl md:text-6xl leading-none tracking-tight mt-5 max-w-3xl">
          Families who now call it home.
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-black/10 border border-black/10 mt-14">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              data-testid={`testimonial-${i}`}
              className="bg-[#F9F8F6] p-8 md:p-10 flex flex-col"
            >
              <Quote size={32} className="text-[#C25E40]" />
              <p className="mt-6 text-lg leading-relaxed text-[#1A1A1A] flex-1">"{t.quote}"</p>
              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="font-display font-bold text-lg tracking-tight">{t.name}</div>
                <div className="text-sm text-[#4A4A4A]">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
