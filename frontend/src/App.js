import "@/App.css";
import useLenis from "@/hooks/useLenis";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandMarquee } from "@/components/Marquee";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Stats } from "@/components/Stats";
import { VideoSection } from "@/components/VideoSection";
import { Testimonials } from "@/components/Testimonials";
import { Careers } from "@/components/Careers";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  useLenis();
  return (
    <div className="App grain">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <BrandMarquee />
        <About />
        <Services />
        <Stats />
        <Projects />
        <BrandMarquee dark />
        <VideoSection />
        <Testimonials />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
