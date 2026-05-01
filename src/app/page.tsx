import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function MoldMasterPage() {
  return (
    <main className="bg-[#FAF9F6]">
      <Navigation />
      <HeroSection />
      <IndustriesSection />
      <ServicesSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
