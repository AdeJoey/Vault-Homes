import Image from "next/image";

export function WhoItsFor() {
  const homeownerBenefits = [
    "Want a private sale.",
    "Prefer discretion.",
    "Need fewer interruptions.",
  ];

  const investorBenefits = [
    "Want off-market access.",
    "Prefer curated opportunities.",
    "Need early deal visibility.",
  ];

  return (
    <section className="bg-white min-h-screen w-full flex items-center py-20 px-6 md:px-16">
      <div className="w-full max-w-[1100px] mx-auto flex flex-col lg:flex-row gap-0">

        {/* Left: Image + title — centered on mobile & tablet, left-aligned on desktop */}
        <div className="flex flex-col items-center lg:items-start lg:w-[38%] pb-12 md:pb-16 lg:pb-0 lg:py-20 flex-shrink-0">
          {/* Image */}
          <div className="relative w-[260px] h-[260px] rounded-[32px] overflow-hidden border border-[#E5ED64] shadow-sm">
            <Image
              src="/Assets/Whoisitfor.png"
              alt="Lagos Cityscape"
              fill
              className="object-cover"
            />
          </div>
          {/* Title */}
          <h2 className="text-[40px] font-bold text-black mt-8 leading-tight text-center lg:text-left">
            Who it&apos;s for
          </h2>
        </div>

        {/* Right: Two columns side by side */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-6 lg:gap-24 lg:w-[62%] h-full lg:pt-0 w-full md:justify-center lg:justify-start">

          {/* Homeowners Column */}
          <div className="flex flex-col">
            <h3 className="text-[17px] font-semibold text-black mb-6 md:mb-10">For homeowners</h3>
            <ul className="flex flex-col gap-10 md:gap-28">
              {homeownerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 lg:w-[104px] lg:h-[104px] rounded-full bg-[#E5ED64] flex-shrink-0" />
                  <span className="text-[14px] md:text-[15px] font-medium text-gray-800 leading-snug max-w-[130px]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors Column */}
          <div className="flex flex-col">
            <h3 className="text-[17px] font-semibold text-black mb-6 md:mb-10">For investors</h3>
            <ul className="flex flex-col gap-10 md:gap-28">
              {investorBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4 md:gap-5">
                  <div className="w-12 h-12 lg:w-[104px] lg:h-[104px] rounded-full bg-[#E5ED64] flex-shrink-0" />
                  <span className="text-[14px] md:text-[15px] font-medium text-gray-800 leading-snug max-w-[130px]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}
