import { motion } from "framer-motion";
import { MANIFESTO } from "../data/site";
import { fadeUp } from "../lib/motion";

export const About = () => {
  return (
    <section id="about" data-testid="about" className="bg-[#F9F8F6] py-24 md:py-32 border-b border-black/10">
      <div className="px-5 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
              [ Who we are ]
            </span>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mt-6"
            >
              A builder from Sivagangai, building for families like yours.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-8 text-[#4A4A4A] text-lg leading-relaxed max-w-md"
            >
              For over a decade, Rafeek Homes has designed, built and handed over homes across
              Sivagangai — from cost-conscious 2BHKs to luxurious duplex villas. We do it all
              in-house, so quality and honesty stay in our hands.
            </motion.p>
          </div>

          <div className="lg:col-span-7 lg:border-l border-black/10 lg:pl-16">
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
              {MANIFESTO.map((m, i) => (
                <motion.div
                  key={m.no}
                  variants={fadeUp}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  data-testid={`manifesto-${m.no}`}
                >
                  <div className="font-display text-[#C25E40] text-5xl font-bold tracking-tight">{m.no}</div>
                  <h3 className="font-display font-bold text-xl md:text-2xl mt-4 tracking-tight">{m.title}</h3>
                  <p className="mt-3 text-[#4A4A4A] leading-relaxed">{m.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
