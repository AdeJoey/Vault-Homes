import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  title: pageMetadata.insights.title,
  description: pageMetadata.insights.description,
  keywords: pageMetadata.insights.keywords as string[],
  alternates: { canonical: pageMetadata.insights.canonical },
  openGraph: {
    type: "website",
    url: pageMetadata.insights.canonical,
    title: pageMetadata.insights.title,
    description: pageMetadata.insights.description,
  },
};


export default function InsightsPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Header />
      <div className="pt-24">
        <FeaturedInsights />
      </div>
      <Footer />
    </main>
  );
}
