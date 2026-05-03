import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import IndustriesSection from "@/components/IndustriesSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function MoldMasterPage() {
  return (
    <main className="bg-[#FAF9F6]">
      <Navigation />
      <HeroSection />
      <IndustriesSection />
      <ServicesSection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
