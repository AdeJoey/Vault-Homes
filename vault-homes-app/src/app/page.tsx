import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhyVaultHomes } from "@/components/sections/WhyVaultHomes";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Header />
      <Hero />
      <HowItWorks />
      <WhoItsFor />
      <WhyVaultHomes />
      <FeaturedInsights />
      <FAQSection />
      
      {/* Container for CTA and Footer sharing the background video */}
      <div className="relative w-full overflow-hidden bg-black flex flex-col items-center">
        {/* Shared Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/Assets/FooterBackground.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <FinalCTA />
        
        <div className="w-full relative z-20 pb-12">
          <Footer />
        </div>
      </div>
    </main>
  );
}
