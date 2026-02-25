import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import PricingPreview from "@/components/landing/PricingPreview";
import InsightsCTA from "@/components/landing/InsightsCTA";
import ChatFAB from "@/components/landing/ChatFAB";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
      <PricingPreview />
      <InsightsCTA />
      <Footer />
      <ChatFAB />
    </main>
  );
}
