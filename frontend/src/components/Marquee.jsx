import Marquee from "react-fast-marquee";

const WORDS = ["Premium Villas", "Sivagangai", "Turnkey Construction", "Rafeek Homes", "Interior Design", "Homes For Sale"];

export const BrandMarquee = ({ dark = false }) => {
  return (
    <div
      data-testid="brand-marquee"
      className={`py-6 border-y ${dark ? "bg-[#1A1A1A] border-white/10" : "bg-[#EFEBE3] border-black/10"}`}
    >
      <Marquee speed={40} gradient={false} autoFill>
        {WORDS.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display font-semibold text-2xl md:text-4xl tracking-tight px-8 ${
                dark ? "text-white" : "text-[#1A1A1A]"
              }`}
            >
              {w}
            </span>
            <span className="text-[#C25E40] text-2xl md:text-4xl">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
};
