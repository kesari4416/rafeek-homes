import { CONTACT, NAV } from "../data/site";

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#F9F8F6] pt-20 pb-10 px-5 md:px-10">
      <div className="grid md:grid-cols-12 gap-10 pb-16 border-b border-black/10">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3">
            <img src={CONTACT.logo} alt="Rafeek Homes" className="h-12 w-12 rounded-full object-cover border border-black/10" />
            <span className="font-display font-bold text-2xl tracking-tight">
              RAFEEK<span className="text-[#C25E40]">.</span>HOMES
            </span>
          </div>
          <p className="font-display font-bold text-3xl md:text-5xl tracking-tight mt-8 leading-[0.95] max-w-xl">
            Building homes worth coming home to, in Sivagangai.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#4A4A4A] mb-5">Explore</div>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-underline text-[#1A1A1A]">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-[#4A4A4A] mb-5">Reach us</div>
          <a href={`tel:${CONTACT.phoneRaw}`} className="link-underline block font-display font-semibold text-xl mb-3">
            {CONTACT.phone}
          </a>
          <p className="text-[#4A4A4A] leading-relaxed">{CONTACT.address}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-8 text-sm text-[#4A4A4A]">
        <span>© {new Date().getFullYear()} Rafeek Homes · Rafeek Construction, Sivaganga.</span>
        <span>Designed & built for families across Tamil Nadu.</span>
      </div>
    </footer>
  );
};
