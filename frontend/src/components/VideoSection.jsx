import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Youtube } from "lucide-react";
import { VIDEOS, CONTACT } from "../data/site";
import { fadeUp } from "../lib/motion";

const VideoCard = ({ v, i }) => {
  const [play, setPlay] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      custom={i % 3}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      data-testid={`video-${i}`}
      className="group"
    >
      <div className="relative aspect-video overflow-hidden bg-[#1A1A1A] border border-white/10">
        {play ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlay(true)}
            data-testid={`video-play-${i}`}
            className="absolute inset-0 w-full h-full"
            aria-label={`Play ${v.title}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
              alt={v.title}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-[#1A1A1A]/20 group-hover:bg-[#1A1A1A]/10 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 flex items-center justify-center bg-[#C25E40] text-white group-hover:scale-110 transition-transform duration-300">
                <Play size={22} fill="currentColor" />
              </span>
            </div>
          </button>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-display font-semibold text-lg tracking-tight text-white leading-snug">{v.title}</h3>
        <p className="text-white/50 text-sm mt-1">{v.views}</p>
      </div>
    </motion.div>
  );
};

export const VideoSection = () => {
  return (
    <section id="films" data-testid="films" className="bg-[#1A1A1A] text-white py-24 md:py-32">
      <div className="px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
              [ From our channel ]
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl leading-none tracking-tight mt-5">
              Home tours & launches
            </h2>
          </div>
          <a
            href={CONTACT.youtube}
            target="_blank"
            rel="noreferrer"
            data-testid="youtube-channel-link"
            className="inline-flex items-center gap-2 border border-white/25 px-6 h-12 font-medium hover:bg-[#C25E40] hover:border-[#C25E40] transition-colors duration-300"
          >
            <Youtube size={18} /> Subscribe on YouTube
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.id} v={v} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
