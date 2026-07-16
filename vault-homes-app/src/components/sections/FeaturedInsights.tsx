"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { insights } from "@/lib/data/insights";

const variants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.35, ease: "easeIn" },
  }),
};

export function FeaturedInsights() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function goTo(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  }

  function prev() {
    goTo(index === 0 ? insights.length - 1 : index - 1);
  }
  function next() {
    goTo(index === insights.length - 1 ? 0 : index + 1);
  }

  const slide = insights[index];

  return (
    <section className="bg-white min-h-screen py-20 px-4 md:px-16 w-full flex flex-col justify-center">
      <div className="w-[90%] mx-auto flex flex-col">

        {/* Header row */}
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-[40px] md:text-[52px] font-bold text-black leading-tight tracking-[-0.02em]">
            Featured<br />insights
          </h2>
          <div className="flex gap-3">
            <button
              onClick={prev}
              aria-label="Previous insight"
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#E5ED64] hover:bg-[#E5ED64] transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-black" />
            </button>
            <button
              onClick={next}
              aria-label="Next insight"
              className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#E5ED64] hover:bg-[#E5ED64] transition-all group"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-black" />
            </button>
          </div>
        </div>

        {/* Slide content */}
        <div className="overflow-hidden relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center"
            >
              {/* Image */}
              <div className="w-full lg:w-[58%] aspect-[16/9] lg:aspect-[4/3] bg-[#E0E3EA] rounded-[32px] relative overflow-hidden flex-shrink-0 shadow-sm">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
                {/* Category badge */}
                <div className="absolute top-5 left-5 px-4 py-1.5 bg-black/60 backdrop-blur-sm rounded-full">
                  <span className="text-[12px] text-[#E5ED64] font-semibold tracking-wide uppercase">
                    {slide.category}
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-[42%] flex flex-col items-start gap-5">
                <span className="text-[13px] text-gray-400 font-medium">{slide.date}</span>
                <h3 className="text-[26px] md:text-[32px] font-bold text-gray-900 leading-snug">
                  {slide.title}
                </h3>
                <p className="text-gray-600 text-[16px] leading-relaxed">
                  {slide.excerpt}
                </p>
                <Link href={`/insights/${slide.slug}`}>
                  <Button variant="gradient" className="mt-2 w-40 h-11 text-[14px]">
                    Read More
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-12">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to insight ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === index
                  ? "w-8 h-3 bg-[#E5ED64]"
                  : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
