import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { WhyVaultHomes } from "@/components/sections/WhyVaultHomes";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { FAQSection } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { pageMetadata, GLOBAL_KEYWORDS } from "@/lib/metadata";

export const metadata: Metadata = {
  title: pageMetadata.home.title,
  description: pageMetadata.home.description,
  keywords: GLOBAL_KEYWORDS,
  alternates: { canonical: pageMetadata.home.canonical },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: pageMetadata.home.canonical,
    siteName: "Vault Homes",
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: [{ url: "/Assets/Hero desktop.png", width: 1200, height: 630, alt: "Vault Homes — Private Property Access in Lagos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageMetadata.home.title,
    description: pageMetadata.home.description,
    images: ["/Assets/Hero desktop.png"],
  },
};


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
