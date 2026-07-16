"use client";

import Image from "next/image";

// All trust strip items repeated twice so the seamless loop works at all viewport widths
const trustItems = [
  { type: "text", content: "Private property access" },
  { type: "image", src: "/Assets/slide1.jpg" },
  { type: "text", content: "Lagos market focus." },
  { type: "image", src: "/Assets/slide2.jpg" },
  { type: "text", content: "Curated opportunities." },
  { type: "image", src: "/Assets/slide1.jpg" },
  { type: "text", content: "Discreet. Verified. Fast." },
  { type: "image", src: "/Assets/slide2.jpg" },
];

function TrustItem({ item }: { item: (typeof trustItems)[0] }) {
  if (item.type === "image") {
    return (
      <div className="w-[140px] h-[52px] rounded-full overflow-hidden relative border border-[#E5ED64] flex-shrink-0">
        <Image src={item.src!} alt="Property" fill className="object-cover" sizes="140px" />
      </div>
    );
  }
  return (
    <div className="px-7 py-3 rounded-full border border-[#E5ED64] bg-transparent flex-shrink-0 flex items-center">
      <span className="text-gray-800 font-light text-[16px] whitespace-nowrap">{item.content}</span>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-[#E0E3EA] min-h-screen py-24 pt-32 px-4 md:px-16 w-full flex flex-col justify-center">
      <div className="w-[90%] mx-auto flex flex-col">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="px-5 py-2 rounded-full border border-gray-400 bg-transparent flex-shrink-0">
            <span className="text-sm font-semibold text-gray-800">How it works</span>
          </div>
          <h2 className="text-4xl md:text-[32px] font-bold text-black max-w-2xl text-left md:text-left leading-[1.1] tracking-[-0.02em]">
            3 simple steps to become <br />part of this leverage.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 w-full justify-between items-center">
          <div className="w-full max-w-[400px] lg:max-w-none relative overflow-hidden">
            <Image src="/Assets/HIW1.png" alt="Step 1" width={400} height={480} className="w-full h-auto object-contain" />
          </div>
          <div className="w-full max-w-[400px] lg:max-w-none relative overflow-hidden">
            <Image src="/Assets/HIW2.png" alt="Step 2" width={400} height={480} className="w-full h-auto object-contain" />
          </div>
          <div className="w-full max-w-[400px] lg:max-w-none relative overflow-hidden">
            <Image src="/Assets/HIW3.png" alt="Step 3" width={400} height={480} className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* ── Infinite Marquee Trust Strip ── */}
        <div className="mt-16 w-full overflow-hidden relative">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[#E0E3EA] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[#E0E3EA] to-transparent pointer-events-none" />

          {/* Scrolling track — duplicated for seamless loop */}
          <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused]">
            {[...trustItems, ...trustItems].map((item, idx) => (
              <TrustItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
