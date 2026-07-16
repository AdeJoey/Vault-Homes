"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function SellHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black pt-24">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Assets/Hero desktop.png"
          alt="Sell privately background"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
      >
        <div className="px-5 py-2 rounded-full border border-[#E5ED64]/60 bg-transparent mb-2">
          <span className="text-[13px] font-semibold text-[#E5ED64] tracking-widest uppercase">For Sellers</span>
        </div>
        <h1 className="text-[44px] md:text-[64px] font-bold text-white leading-[1.1] tracking-[-0.03em]">
          Sell your home.<br />On your terms.
        </h1>
        <p className="text-[17px] md:text-[20px] text-white/80 max-w-xl font-medium leading-relaxed">
          No public listings. No time-wasters. Just discreet, qualified buyers matched to your property.
        </p>
      </motion.div>
    </section>
  );
}
