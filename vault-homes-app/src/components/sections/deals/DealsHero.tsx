"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function DealsHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black pt-24">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Assets/HowItworks2.jpg"
          alt="Investor access background"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        <div className="px-5 py-2 rounded-full border border-[#E5ED64]/60 bg-transparent mb-2">
          <span className="text-[13px] font-semibold text-[#E5ED64] tracking-widest uppercase">For Investors</span>
        </div>
        <h1 className="text-[44px] md:text-[64px] font-bold text-white leading-[1.1] tracking-[-0.03em]">
          Private deals.<br />Before the market sees them.
        </h1>
        <p className="text-[17px] md:text-[20px] text-white/80 max-w-xl font-medium leading-relaxed">
          Join a curated network of serious investors with early access to Lagos&apos; most sought-after off-market properties.
        </p>
      </motion.div>
    </section>
  );
}
