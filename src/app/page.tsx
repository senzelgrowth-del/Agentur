import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { CaseTeaser } from "@/components/sections/CaseTeaser";
import { WhyNow } from "@/components/sections/WhyNow";
import { About } from "@/components/sections/About";
import { VideoShowcase } from "@/components/sections/VideoShowcase";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Structured data so search engines understand who offers what (facts from the imprint and the site itself)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SenzelGrowth",
  url: "https://senzelgrowth.com",
  logo: "https://senzelgrowth.com/logo-sg.png",
  image: "https://senzelgrowth.com/opengraph-image.jpg",
  description: "Content Creation und Performance Marketing (Meta Ads) für Selbstständige und kleine Unternehmen.",
  email: "senzelgrowth@gmail.com",
  founder: { "@type": "Person", name: "Celvin Senzel" },
  address: { "@type": "PostalAddress", postalCode: "61194", addressLocality: "Niddatal", addressCountry: "DE" },
  areaServed: "DE",
  knowsAbout: ["Content Creation", "Social Media Marketing", "Meta Ads", "Leadgenerierung"],
  sameAs: ["https://www.linkedin.com/in/celvin-senzel-84a7a2298/", "https://instagram.com/senzelgrowth"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <VideoShowcase />
        <WhyNow />
        <Offer />
        <Portfolio />
        <CaseTeaser />
        <About />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
