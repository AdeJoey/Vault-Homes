"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { AnimatePresence, motion } from "framer-motion";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 pt-6 pb-4 sm:px-8 md:px-14 md:pt-8 md:pb-6">
      {/* Logo */}
      <Link href="/" className="relative z-50">
        <Image
          src="/Assets/LogoDesktopHero.png"
          alt="Vault Homes"
          width={112}
          height={39}
          className="h-8 w-auto hidden md:block"
          priority
        />
        <Image
          src="/Assets/LogoMobileNavbar.png"
          alt="Vault Homes"
          width={129.72}
          height={45.17}
          className="h-8 w-auto md:hidden"
          priority
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8">
        {siteConfig.nav.filter(item => item.label !== "Sell Privately").map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[12px] font-medium text-black hover:opacity-70 transition-opacity"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Desktop CTA */}
      <div className="hidden md:block">
        <Link href="/find-deals">
          <Button variant="gradient" size="exact" className="text-[13px]">Get Access</Button>
        </Link>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden relative z-50 p-1"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="w-[52px] h-[36px] rounded-[8px] border-[1.5px] border-[#E5ED64] flex flex-col items-end justify-center gap-[5px] pr-[8px] bg-transparent cursor-pointer">
          <div className={`h-[2px] bg-black rounded-full transition-all duration-700 ease-in-out ${isMobileMenuOpen ? "w-[26px]" : "w-[14px]"}`}></div>
          <div className="h-[2px] bg-black rounded-full w-[20px] transition-all duration-700 ease-in-out"></div>
          <div className={`h-[2px] bg-black rounded-full transition-all duration-700 ease-in-out ${isMobileMenuOpen ? "w-[14px]" : "w-[26px]"}`}></div>
        </div>
      </button>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center space-y-8 p-6"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-2xl font-medium text-black"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/find-deals" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="gradient" size="exact" className="mt-4 text-[13px]">
                Get Access
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
