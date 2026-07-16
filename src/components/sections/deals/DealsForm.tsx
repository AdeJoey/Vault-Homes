"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function DealsForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/leads/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#E0E3EA] min-h-screen py-24 px-4 md:px-16 w-full flex flex-col justify-center">
      <div className="w-[90%] max-w-2xl mx-auto">
        <div className="mb-12">
          <h2 className="text-[40px] md:text-[52px] font-bold text-black leading-tight tracking-[-0.02em] mb-4">
            Request investor<br />access.
          </h2>
          <p className="text-[16px] text-gray-600">
            Apply to join our private network. We review all applications to ensure alignment with our off-market opportunities.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-white rounded-[24px] p-10 text-center flex flex-col items-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#E5ED64] flex items-center justify-center text-3xl">✓</div>
            <h3 className="text-[24px] font-bold text-black">Application received!</h3>
            <p className="text-gray-600">Our team will review your profile and reach out within 24–48 hours to discuss access.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Full Name / Company Name</label>
              <input
                name="name"
                required
                placeholder="e.g. Adebayo Okafor or XYZ Investments"
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Phone Number</label>
              <input
                name="phone"
                required
                placeholder="+234 800 000 0000"
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Email Address</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Target Neighbourhoods</label>
              <input
                name="locations"
                required
                placeholder="e.g. Ikoyi, Victoria Island, Lekki Phase 1"
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Target Price Range (₦)</label>
              <select
                name="priceRange"
                required
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors bg-white"
              >
                <option value="">Select range</option>
                <option>₦100M - ₦250M</option>
                <option>₦250M - ₦500M</option>
                <option>₦500M - ₦1B</option>
                <option>₦1B+</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-gray-700">Investment Strategy / Notes (optional)</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Tell us about what you're looking for..."
                className="border border-gray-300 rounded-[14px] px-5 py-4 text-[15px] outline-none focus:border-[#E5ED64] transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-500 text-[14px]">Something went wrong. Please try again or WhatsApp us directly.</p>
            )}

            <Button
              type="submit"
              variant="gradient"
              disabled={status === "loading"}
              className="h-[56px] text-[15px] font-semibold rounded-full mt-2 w-full"
            >
              {status === "loading" ? "Submitting…" : "Request Access"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
