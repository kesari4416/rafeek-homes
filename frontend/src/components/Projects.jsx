import { motion } from "framer-motion";
import { PROJECTS } from "../data/site";
import { fadeUp } from "../lib/motion";

export const Projects = () => {
  return (
    <section id="projects" data-testid="projects" className="bg-[#F9F8F6] py-24 md:py-32 border-b border-black/10">
      <div className="px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
              [ Selected work ]
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-none tracking-tight mt-5">
              Homes we've delivered
            </h2>
          </div>
          <a
            href="#contact"
            data-testid="projects-enquire-link"
            className="link-underline text-sm font-medium tracking-wide"
          >
            Enquire about availability →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[280px] md:auto-rows-[300px]">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              data-testid={`project-${i}`}
              className={`group relative overflow-hidden bg-[#EFEBE3] ${
                p.span === "lg" ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/10 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C25E40] mb-2">
                  {p.meta}
                </div>
                <h3 className="font-display font-bold text-2xl md:text-3xl text-white tracking-tight">
                  {p.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
