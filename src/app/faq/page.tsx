import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQSection } from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: pageMetadata.faq.title,
  description: pageMetadata.faq.description,
  keywords: [...pageMetadata.faq.keywords],
  alternates: { canonical: pageMetadata.faq.canonical },
  openGraph: {
    type: "website",
    url: pageMetadata.faq.canonical,
    title: pageMetadata.faq.title,
    description: pageMetadata.faq.description,
  },
};


export default function FAQPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-[#E0E3EA]">
      <Header />
      <div className="pt-24">
        <FAQSection />
      </div>
      <Footer />
    </main>
  );
}
