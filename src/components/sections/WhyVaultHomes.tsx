import Image from "next/image";

export function WhyVaultHomes() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center py-24 overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Assets/vault.png" // Placeholder background
          alt="Lagos background"
          fill
          className="object-cover opacity-50 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] leading-tight flex flex-col">
          <span>Why Vault</span>
          <span>Homes</span>
        </h2>
      </div>

      {/* Infographic Container */}
      <div className="relative w-full max-w-5xl h-[500px] mx-auto z-10 hidden md:block">
        
        {/* Node 1: Lagos-focused */}
        <div className="absolute left-[45%] top-[10%] flex flex-col items-center">
           <div className="flex items-center gap-4 relative left-12">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-xl font-bold text-white max-w-[200px]">Lagos-focused, not generic.</p>
           </div>
           {/* Vertical line down */}
           <div className="absolute top-4 left-2 w-[1px] h-[460px] bg-white/20"></div>
        </div>

        {/* Node 2: Simple lead capture */}
        <div className="absolute left-[78%] top-[25%] flex flex-col items-center">
           <div className="flex items-center gap-4 relative left-12">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-xl font-bold text-white max-w-[150px]">Simple lead capture, fast response.</p>
           </div>
           <div className="absolute top-4 left-2 w-[1px] h-[310px] bg-white/20"></div>
        </div>

        {/* Node 3: Curated, not crowded */}
        <div className="absolute left-[20%] top-[40%] flex flex-col items-center">
           <div className="flex items-center gap-4 relative left-12">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-xl font-bold text-white max-w-[150px]">Curated, not crowded.</p>
           </div>
           <div className="absolute top-4 left-2 w-[1px] h-[260px] bg-white/20"></div>
        </div>

        {/* Node 4: Private, not noisy */}
        <div className="absolute left-[-5%] top-[65%] flex flex-col items-center">
           <div className="flex items-center gap-4 relative left-12">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-xl font-bold text-white max-w-[150px]">Private, not noisy.</p>
           </div>
           <div className="absolute top-4 left-2 w-[1px] h-[135px] bg-white/20"></div>
        </div>

        {/* Node 5: Built for serious buyers */}
        <div className="absolute left-[58%] top-[80%] flex flex-col items-center">
           <div className="flex items-center gap-4 relative left-12">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-xl font-bold text-white max-w-[150px]">Built for serious buyers and owners.</p>
           </div>
           <div className="absolute top-4 left-2 w-[1px] h-[60px] bg-white/20"></div>
        </div>
      </div>

      {/* Mobile view fallback (simple list) */}
      <div className="relative z-10 md:hidden flex flex-col gap-8 px-8">
        {[
          "Lagos-focused, not generic.",
          "Simple lead capture, fast response.",
          "Curated, not crowded.",
          "Private, not noisy.",
          "Built for serious buyers and owners."
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
             <div className="w-4 h-4 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center bg-black flex-shrink-0">
               <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"></div>
             </div>
             <p className="text-lg font-bold text-white">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
