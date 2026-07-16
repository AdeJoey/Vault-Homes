const steps = [
  {
    number: "01",
    title: "Submit your property",
    description: "Fill out our private intake form with basic details about your property. No photos required upfront.",
  },
  {
    number: "02",
    title: "We review & qualify",
    description: "Our team reviews your submission and conducts a discreet assessment within 24–48 hours.",
  },
  {
    number: "03",
    title: "Matched with buyers",
    description: "We match your property to verified, serious buyers or investors in our private network.",
  },
  {
    number: "04",
    title: "Private introduction",
    description: "You decide who you want to meet. We facilitate a private introduction on your timeline.",
  },
];

export function SellProcess() {
  return (
    <section className="bg-[#E0E3EA] min-h-screen py-24 px-4 md:px-16 w-full flex flex-col justify-center">
      <div className="w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
          <div className="px-5 py-2 rounded-full border border-gray-400 bg-transparent">
            <span className="text-sm font-semibold text-gray-800">How it works for sellers</span>
          </div>
          <h2 className="text-[36px] md:text-[48px] font-bold text-black max-w-xl leading-[1.1] tracking-[-0.02em]">
            Four steps to a discreet, successful sale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[32px] p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-[48px] font-bold text-[#E5ED64] leading-none">{step.number}</span>
              <div>
                <h3 className="text-[20px] font-bold text-black mb-3">{step.title}</h3>
                <p className="text-[15px] text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
