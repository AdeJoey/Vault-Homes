"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col w-full bg-white">
      <Header />
      <section className="relative w-full py-32 px-4 md:px-16 flex flex-col items-center pt-48 min-h-[700px]">
        <div className="max-w-xl mx-auto w-full flex flex-col gap-8">
          <div>
            <h1 className="text-[44px] md:text-[56px] font-bold text-black leading-[1.1] tracking-[-0.02em] mb-4">
              Get in touch
            </h1>
            <p className="text-[18px] text-gray-600 font-medium">
              Have questions? Our team is available 24/7 on WhatsApp or via email.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a href="https://wa.me/2348117682654" target="_blank" rel="noreferrer">
              <Button variant="gradient" className="w-full h-14 text-[16px]">
                Chat on WhatsApp
              </Button>
            </a>
            <a href="mailto:hello@vaulthomes.com">
              <Button variant="outline" className="w-full h-14 text-[16px]">
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
