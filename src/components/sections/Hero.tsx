"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-start items-center text-center px-4 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Assets/Hero desktop.png"
          alt="Vault Homes background"
          fill
          className="object-cover hidden md:block"
          priority
          loading="eager"
          sizes="100vw"
          quality={100}
        />
        {/* For iPhone 14 & lower (screens shorter than 850px) */}
        <Image
          src="/Assets/Hero Mobilei Phone14and15 lower.png"
          alt="Vault Homes background"
          fill
          className=" block [@media(min-height:850px)]:hidden md:!hidden object-top"
          priority
          sizes="100vw"
          quality={100}
        />
        {/* For taller mobile screens (Pro Max, etc) */}
        <Image
          src="/Assets/Hero Mobile.png"
          alt="Vault Homes background"
          fill
          className="object-cover hidden [@media(min-height:850px)]:block md:!hidden object-top"
          priority
          sizes="100vw"
          quality={100}
        />
        {/* Overlay: #797B82 at 13% */}
        {/* <div className="absolute inset-0" style={{ backgroundColor: "#797B82", opacity: 0.13 }} /> */}
        {/* Bottom gradient blending into next section - hidden on mobile */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#E0E3EA] to-transparent z-10 hidden md:block" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full max-w-5xl mx-auto flex flex-col justify-between pt-[22vh] pb-[6vh] md:justify-start md:pt-[200px] md:pb-0 items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center w-full"
        >
          {/* Headline */}
          <h1 className="text-[40px] md:text-[55px] font-medium text-black tracking-[-0.03em] mb-6 md:mb-4 leading-[1.05] max-w-[340px] md:max-w-none">
            Get first access<br className="md:hidden" /> to private Lagos<br className="md:hidden" /> homes
          </h1>

          {/* Sub-line */}
          <p className="text-[15px] md:text-[20px] text-black mb-10 max-w-[300px] md:max-w-2xl font-normal leading-[1.3]">
            Vault Homes connects<br className="md:hidden" /> discreet sellers with serious<br className="md:hidden" /> buyers and investors.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-[14px] md:gap-4 w-[88%] max-w-[400px] sm:w-auto px-0 md:mt-6"
        >
          <Link href="/sell-privately" className="w-full sm:w-auto flex justify-center">
            <Button
              variant="gradient"
              size="lg"
              className="w-full md:w-[220px] h-[58px] text-[16px] font-medium rounded-full shadow-sm"
            >
              Sell Privately
            </Button>
          </Link>
          <Link href="/find-deals" className="w-full sm:w-auto flex justify-center">
            <Button
              variant="white"
              size="lg"
              className="w-full md:w-[220px] h-[58px] text-[16px] font-medium rounded-full shadow-sm bg-[#E6E8EC] md:bg-white"
            >
              Get Investor Access.
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Desktop-only Trust Strip at the bottom */}
      <div className="absolute bottom-12 left-0 right-0 z-30 px-16 hidden md:flex justify-between items-end w-full">
        {/* Left: tagline stack */}
        <div className="flex flex-col items-start text-left text-sm font-bold text-black leading-tight">
          <span>Private.</span>
          <span>Curated.</span>
          <span>Lagos-focused</span>
        </div>

        {/* Middle: decorative pill image */}
        <div className="w-[180px] h-[50px] relative rounded-full overflow-hidden border border-white/40">
          <Image src="/Assets/Hero desktop.png" alt="Property" fill className="object-cover" sizes="180px" />
        </div>

        {/* Right: avatar stack + social proof */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative shadow-md">
                <Image src="/Assets/Hero desktop.png" alt="Avatar" fill className="object-cover" sizes="40px" />
              </div>
            ))}
          </div>
          <p className="text-sm font-light text-black">
            Loved by <span className="font-bold">30+</span> happy customers
          </p>
        </div>
      </div>
    </section>
  );
}
