import { useRef } from "react";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ExperienceShowcase from "@/components/ExperienceShowcase";
import PartnersSection from "@/components/PartnersSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import EmailModal from "@/components/EmailModal";
import SuccessModal from "@/components/SuccessModal";
import React from "react";

export default function Home() {
  const featuresRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);

  const scrollToSection = (section: "features" | "about" | "pricing") => {
    if (section === "features" && featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "about" && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "pricing" && pricingRef.current) {
      pricingRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(`Section '${section}' not found on the page.`);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <BackgroundEffects />
      <Navbar onScrollToSection={scrollToSection} />
      <HeroSection onScrollToFeatures={() => scrollToSection("features")} />
      <FeaturesSection ref={featuresRef} />
      <ExperienceShowcase ref={aboutRef} />
      <PartnersSection />
      <CTASection ref={pricingRef} />
      <Footer />
      <EmailModal />
      <SuccessModal />
    </div>
  );
}
