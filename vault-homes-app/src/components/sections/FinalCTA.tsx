import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center text-center px-4 overflow-visible bg-transparent">

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-6 leading-tight">
          Ready to access private property opportunities?
        </h2>
        <p className="text-lg text-white/90 mb-10 max-w-xl font-medium">
          Join Vault Homes as a seller or investor and start with a private review.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pb-16">
          <Link href="/sell-privately" className="w-full sm:w-auto">
            <Button variant="gradient" size="lg" className="w-full sm:w-48 text-base">
              Sell Privately
            </Button>
          </Link>
          <Link href="/find-deals" className="w-full sm:w-auto">
            <Button variant="white" size="lg" className="w-full sm:w-56 text-base">
              Get Investor Access.
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
