import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "../data/site";
import { fadeUp } from "../lib/motion";

const ROLES = [
  { title: "Site Engineers", type: "Full-time · Sivaganga" },
  { title: "Masons & Finishers", type: "Contract · On-site" },
  { title: "Sales & Client Relations", type: "Full-time · Sivaganga" },
  { title: "Interior Designers", type: "Full-time · Sivaganga" },
];

export const Careers = () => {
  return (
    <section id="careers" data-testid="careers" className="bg-[#EFEBE3] py-24 md:py-32 border-b border-black/10">
      <div className="px-5 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
            [ Careers ]
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[0.95] tracking-tight mt-5">
            Build the next home with us.
          </h2>
          <p className="mt-6 text-[#4A4A4A] text-lg leading-relaxed max-w-md">
            We're always looking for craftspeople and professionals who take pride in their work.
            If you want to build homes that families love, we'd love to hear from you.
          </p>
        </div>

        <div className="lg:col-span-7">
          {ROLES.map((r, i) => (
            <motion.a
              key={r.title}
              href={`tel:${CONTACT.phoneRaw}`}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              data-testid={`career-${i}`}
              className="group flex items-center justify-between py-7 border-t border-black/15 last:border-b hover:px-3 transition-[padding] duration-300"
            >
              <div>
                <div className="font-display font-bold text-2xl md:text-3xl tracking-tight">{r.title}</div>
                <div className="text-sm text-[#4A4A4A] mt-1">{r.type}</div>
              </div>
              <span className="w-12 h-12 flex items-center justify-center border border-black/20 group-hover:bg-[#1A1A1A] group-hover:text-white group-hover:border-[#1A1A1A] transition-colors duration-300">
                <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
