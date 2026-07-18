import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { pageMetadata } from "@/lib/metadata";

const p = pageMetadata.about;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  keywords: [...p.keywords],
  alternates: { canonical: p.canonical },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: p.canonical,
    siteName: "Vault Homes",
    title: p.title,
    description: p.description,
  },
  twitter: {
    card: "summary_large_image",
    title: p.title,
    description: p.description,
  },
};


export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Header />
      <section className="relative w-full py-32 px-4 md:px-16 flex flex-col items-center pt-48">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
          <div className="px-5 py-2 rounded-full border border-gray-400 bg-transparent mb-2">
            <span className="text-[13px] font-semibold text-gray-800 tracking-widest uppercase">About Us</span>
          </div>
          <h1 className="text-[44px] md:text-[64px] font-bold text-black leading-[1.1] tracking-[-0.03em]">
            Redefining privacy in Lagos real estate.
          </h1>
          <p className="text-[18px] md:text-[22px] text-gray-600 max-w-2xl font-medium leading-relaxed">
            We built Vault Homes because we realized that the best properties often never hit the open market. We act as a discreet bridge between sellers who value their privacy and buyers looking for exclusive opportunities.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
