import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function LegalPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Header />
      <section className="relative w-full py-32 px-4 md:px-16 pt-48 max-w-4xl mx-auto min-h-[700px]">
        <h1 className="text-[40px] font-bold text-black mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-700">
          <p>
            Your privacy is critically important to us. At Vault Homes, we have a few fundamental principles:
          </p>
          <ul className="list-disc pl-5 my-4 space-y-2">
            <li>We are thoughtful about the personal information we ask you to provide and the personal information that we collect about you.</li>
            <li>We store personal information for only as long as we have a reason to keep it.</li>
            <li>We aim for full transparency on how we gather, use, and share your personal information.</li>
          </ul>
          <p>This page is a placeholder for the full legal Privacy Policy.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
