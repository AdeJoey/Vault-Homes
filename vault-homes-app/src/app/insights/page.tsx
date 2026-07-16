import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";

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
