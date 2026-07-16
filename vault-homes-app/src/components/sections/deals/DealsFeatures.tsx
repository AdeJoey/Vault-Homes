import Image from "next/image";

const features = [
  {
    title: "Vetted Opportunities",
    description: "Every property is strictly vetted by our team before being presented to the network.",
  },
  {
    title: "Direct to Seller",
    description: "Avoid middle-men chains. We connect you directly to the verified decision-makers.",
  },
  {
    title: "High-Yield Focus",
    description: "We prioritize properties with strong fundamentals in Lagos' most resilient neighbourhoods.",
  },
];

export function DealsFeatures() {
  return (
    <section className="bg-white py-24 px-4 md:px-16 w-full flex flex-col justify-center">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2">
            <div className="px-5 py-2 rounded-full border border-gray-400 bg-transparent inline-flex mb-8">
              <span className="text-sm font-semibold text-gray-800">Why Join</span>
            </div>
            <h2 className="text-[36px] md:text-[48px] font-bold text-black leading-[1.1] tracking-[-0.02em] mb-12">
              Curated access.<br />Zero noise.
            </h2>
            
            <div className="flex flex-col gap-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#E5ED64] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-[20px] font-bold text-black mb-2">{feature.title}</h3>
                    <p className="text-[16px] text-gray-600 leading-relaxed max-w-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
             <div className="aspect-square w-full max-w-[500px] bg-[#E0E3EA] rounded-[40px] overflow-hidden relative mx-auto border-2 border-[#E5ED64]">
                <Image src="/Assets/slide2.jpg" alt="Investor opportunities" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
