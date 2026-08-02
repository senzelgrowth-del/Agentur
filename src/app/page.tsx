import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Results } from "@/components/sections/Results";
import { Pricing } from "@/components/sections/Pricing";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoShowcase />
        <Services />
        <Results />
        <Pricing />
        <About />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
