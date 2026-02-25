import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import PricingPreview from "@/components/landing/PricingPreview";
import InsightsCTA from "@/components/landing/InsightsCTA";
import ChatFAB from "@/components/landing/ChatFAB";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070d14] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <PricingPreview />
      <InsightsCTA />
      <Footer />
      <ChatFAB />
    </main>
  );
}
