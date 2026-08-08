import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, MapPin, Youtube, Loader2 } from "lucide-react";
import { CONTACT } from "../data/site";
import { fadeUp } from "../lib/motion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const INTERESTS = ["Buy a Home", "Build a Home", "Villa Enquiry", "Interior Design", "General Enquiry"];

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "Buy a Home", message: "" });
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/contact`, form);
      if (data.status === "success") {
        toast.success("Thank you! We'll be in touch shortly.");
        setForm({ name: "", email: "", phone: "", interest: "Buy a Home", message: "" });
      }
    } catch (err) {
      toast.error("Something went wrong. Please call us instead.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full bg-transparent border-b border-white/25 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#C25E40] transition-colors duration-300";

  return (
    <section id="contact" data-testid="contact" className="bg-[#1A1A1A] text-white py-24 md:py-32">
      <div className="px-5 md:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#C25E40]">
            [ Get in touch ]
          </span>
          <h2 className="font-display font-bold text-4xl md:text-6xl leading-[0.95] tracking-tight mt-5">
            Let's build your home.
          </h2>
          <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-md">
            Tell us what you're looking for — a ready home, a plot to build on, or a full custom
            villa. We'll get back to you fast.
          </p>

          <div className="mt-12 space-y-8">
            <a href={`tel:${CONTACT.phoneRaw}`} data-testid="contact-phone" className="flex items-start gap-4 group">
              <span className="w-11 h-11 flex items-center justify-center border border-white/20 group-hover:bg-[#C25E40] group-hover:border-[#C25E40] transition-colors">
                <Phone size={18} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/40">Call / WhatsApp</div>
                <div className="font-display font-semibold text-xl">{CONTACT.phone}</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 flex items-center justify-center border border-white/20">
                <MapPin size={18} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/40">Office</div>
                <div className="text-white/85 max-w-xs">{CONTACT.address}</div>
              </div>
            </div>
            <a
              href={CONTACT.youtube}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-youtube"
              className="flex items-start gap-4 group"
            >
              <span className="w-11 h-11 flex items-center justify-center border border-white/20 group-hover:bg-[#C25E40] group-hover:border-[#C25E40] transition-colors">
                <Youtube size={18} />
              </span>
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/40">Watch our work</div>
                <div className="font-display font-semibold text-xl">Rafeek Homes on YouTube</div>
              </div>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 lg:border-l border-white/10 lg:pl-14">
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            onSubmit={submit}
            data-testid="contact-form"
            className="grid sm:grid-cols-2 gap-x-8 gap-y-8"
          >
            <div className="sm:col-span-1">
              <input data-testid="input-name" className={inputCls} placeholder="Your name" value={form.name} onChange={set("name")} />
            </div>
            <div className="sm:col-span-1">
              <input data-testid="input-phone" className={inputCls} placeholder="Phone number" value={form.phone} onChange={set("phone")} />
            </div>
            <div className="sm:col-span-2">
              <input data-testid="input-email" type="email" className={inputCls} placeholder="Email address" value={form.email} onChange={set("email")} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-[0.15em] text-white/40">I'm interested in</label>
              <div className="flex flex-wrap gap-3 mt-4">
                {INTERESTS.map((it) => (
                  <button
                    key={it}
                    type="button"
                    data-testid={`interest-${it.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => setForm((f) => ({ ...f, interest: it }))}
                    className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                      form.interest === it
                        ? "bg-[#C25E40] border-[#C25E40] text-white"
                        : "border-white/25 text-white/70 hover:border-white"
                    }`}
                  >
                    {it}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <textarea data-testid="input-message" rows={4} className={inputCls} placeholder="Tell us about your requirement" value={form.message} onChange={set("message")} />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="inline-flex items-center gap-2 bg-[#C25E40] text-white px-9 h-14 font-medium hover:bg-white hover:text-[#1A1A1A] transition-colors duration-300 disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? "Sending..." : "Send Enquiry"}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
