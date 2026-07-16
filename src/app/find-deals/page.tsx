"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function FindDealsPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredArea: "",
    assetType: "",
    buyingTimeline: "",
    budgetMin: "",
    budgetMax: "",
    useCase: "",
    cashBuyer: "",
    riskPreference: "",
  });

  const updateForm = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const submitLead = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          cashBuyer: formData.cashBuyer === "yes",
          source: "website",
          sourcePage: "find-deals",
        }),
      });
      if (res.ok) {
        nextStep(); // Go to step 4 (success)
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#E0E3EA] flex flex-col items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-black/60 hover:text-black transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
      </div>

      <div className="w-full max-w-xl bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-black/5 relative overflow-hidden">
        
        {/* Progress Bar */}
        {step < 4 && (
          <div className="w-full bg-gray-100 h-1.5 rounded-full mb-10 overflow-hidden">
            <motion.div 
              className="h-full bg-black"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Get Investor Access</h1>
                <p className="text-gray-500">Join our private network for exclusive off-market deals.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => updateForm({ fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => updateForm({ email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="+234..."
                    value={formData.phone}
                    onChange={(e) => updateForm({ phone: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                variant="gradient" 
                size="lg" 
                className="w-full h-14 mt-4"
                onClick={nextStep}
                disabled={!formData.fullName || (!formData.email && !formData.phone)}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Buying Criteria</h1>
                <p className="text-gray-500">What are you looking to buy?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Preferred Area</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="e.g. Victoria Island, Lekki"
                    value={formData.preferredArea}
                    onChange={(e) => updateForm({ preferredArea: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Asset Type</label>
                    <select 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                      value={formData.assetType}
                      onChange={(e) => updateForm({ assetType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Timeline</label>
                    <select 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                      value={formData.buyingTimeline}
                      onChange={(e) => updateForm({ buyingTimeline: e.target.value })}
                    >
                      <option value="">Select timeline</option>
                      <option value="Ready to buy">Ready to buy</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Min Budget (₦)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 50,000,000"
                      value={formData.budgetMin}
                      onChange={(e) => updateForm({ budgetMin: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Max Budget (₦)</label>
                    <input 
                      type="text" 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                      placeholder="e.g. 200,000,000"
                      value={formData.budgetMax}
                      onChange={(e) => updateForm({ budgetMax: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="white" className="w-1/3 h-14" onClick={prevStep}>Back</Button>
                <Button 
                  variant="gradient" 
                  className="w-2/3 h-14"
                  onClick={nextStep}
                  disabled={!formData.preferredArea || !formData.assetType || !formData.buyingTimeline}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Qualification</h1>
                <p className="text-gray-500">Help us send you the most relevant opportunities.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Use Case</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                    value={formData.useCase}
                    onChange={(e) => updateForm({ useCase: e.target.value })}
                  >
                    <option value="">Select strategy</option>
                    <option value="Hold & Rent">Hold & Rent</option>
                    <option value="Fix & Flip">Fix & Flip</option>
                    <option value="Develop">Develop</option>
                    <option value="Personal Use">Personal Use</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Financing</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                    value={formData.cashBuyer}
                    onChange={(e) => updateForm({ cashBuyer: e.target.value })}
                  >
                    <option value="">Select type</option>
                    <option value="yes">Cash Buyer</option>
                    <option value="no">Financed / Mortgage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Risk Preference</label>
                  <select 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                    value={formData.riskPreference}
                    onChange={(e) => updateForm({ riskPreference: e.target.value })}
                  >
                    <option value="">Select preference</option>
                    <option value="Low">Low (Turnkey properties)</option>
                    <option value="Medium">Medium (Light rehab)</option>
                    <option value="High">High (Distressed/Land)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="white" className="w-1/3 h-14" onClick={prevStep} disabled={loading}>Back</Button>
                <Button 
                  variant="gradient" 
                  className="w-2/3 h-14"
                  onClick={submitLead}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Join List"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10 gap-6"
            >
              <div className="w-20 h-20 rounded-full border-[2.5px] border-[#E5ED64] flex items-center justify-center mb-2 bg-black shadow-[0_0_25px_rgba(229,237,100,0.35)]">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E5ED64"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-10 h-10"
                >
                  <motion.path
                    d="M20 6 9 17l-5-5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  />
                </motion.svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-3">Welcome Aboard</h1>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Thanks — you’re on the investor access list. We’ll contact you when relevant opportunities are available.
                </p>
              </div>
              <Link href="/" className="w-full mt-6">
                <Button variant="white" className="w-full h-14">Return Home</Button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
