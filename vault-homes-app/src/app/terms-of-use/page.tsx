import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Header />
      <section className="relative w-full py-32 px-4 md:px-16 pt-48 max-w-4xl mx-auto min-h-[700px]">
        <h1 className="text-[40px] font-bold text-black mb-8">Terms of Use</h1>
        <div className="prose prose-lg text-gray-700">
          <p>
            Welcome to Vault Homes. By accessing our website, you agree to these terms and conditions.
          </p>
          <p className="mt-4">
            Our platform connects private sellers with verified investors. Access to off-market listings is granted at our sole discretion and requires verification.
          </p>
          <p className="mt-4">This page is a placeholder for the full legal Terms of Use.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
