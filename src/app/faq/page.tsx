import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FAQSection } from "@/components/sections/FAQ";

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
