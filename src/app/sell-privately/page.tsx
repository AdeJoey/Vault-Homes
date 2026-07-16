"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, UploadCloud } from "lucide-react";

export default function SellPrivatelyPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    propertyLocation: "",
    propertyType: "",
    sellingTimeline: "",
    priceExpectation: "",
    occupancyStatus: "",
    notes: "",
    photoUrls: [] as string[],
  });

  const updateForm = (fields: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleMockUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    setLoading(true);
    // Mock upload delay
    setTimeout(() => {
      updateForm({ photoUrls: [...formData.photoUrls, "https://mock-storage.vault-homes.com/property_photo.jpg"] });
      setLoading(false);
    }, 1000);
  };

  const submitLead = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads/seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          source: "website",
          sourcePage: "sell-privately",
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
                <h1 className="text-3xl font-bold tracking-tight mb-2">Sell Privately</h1>
                <p className="text-gray-500">We connect discreet sellers with serious buyers. Let's start with the basics.</p>
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
                <h1 className="text-3xl font-bold tracking-tight mb-2">Property Details</h1>
                <p className="text-gray-500">Tell us a bit about what you are selling.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location (Area)</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="e.g. Ikoyi, Lekki Phase 1"
                    value={formData.propertyLocation}
                    onChange={(e) => updateForm({ propertyLocation: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Property Type</label>
                    <select 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                      value={formData.propertyType}
                      onChange={(e) => updateForm({ propertyType: e.target.value })}
                    >
                      <option value="">Select type</option>
                      <option value="Apartment">Apartment / Flat</option>
                      <option value="House">House / Villa</option>
                      <option value="Land">Land</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Timeline</label>
                    <select 
                      className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                      value={formData.sellingTimeline}
                      onChange={(e) => updateForm({ sellingTimeline: e.target.value })}
                    >
                      <option value="">Select timeline</option>
                      <option value="ASAP">ASAP (0-30 days)</option>
                      <option value="1-3 months">1-3 months</option>
                      <option value="3+ months">3+ months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Estimated Price (₦)</label>
                  <input 
                    type="text" 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                    placeholder="e.g. 150,000,000"
                    value={formData.priceExpectation}
                    onChange={(e) => updateForm({ priceExpectation: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button variant="white" className="w-1/3 h-14" onClick={prevStep}>Back</Button>
                <Button 
                  variant="gradient" 
                  className="w-2/3 h-14"
                  onClick={nextStep}
                  disabled={!formData.propertyLocation || !formData.propertyType || !formData.sellingTimeline}
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
                <h1 className="text-3xl font-bold tracking-tight mb-2">Media & Extras</h1>
                <p className="text-gray-500">Upload photos or add private notes. (Optional)</p>
              </div>

              <div className="space-y-6">
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors relative cursor-pointer">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleMockUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={loading}
                  />
                  <UploadCloud className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="font-medium text-center text-sm mb-1">{loading ? "Uploading..." : "Tap to upload photos"}</p>
                  <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                </div>

                {formData.photoUrls.length > 0 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {formData.photoUrls.map((url, i) => (
                      <div key={i} className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 border border-gray-300 overflow-hidden relative">
                         <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                           <CheckCircle2 className="text-white w-6 h-6" />
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5">Private Notes</label>
                  <textarea 
                    className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none h-28"
                    placeholder="Anything specific we should know?"
                    value={formData.notes}
                    onChange={(e) => updateForm({ notes: e.target.value })}
                  />
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
                  {loading ? "Submitting..." : "Submit Property"}
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
                <h1 className="text-3xl font-bold tracking-tight mb-3">Submitted Successfully</h1>
                <p className="text-gray-500 max-w-xs mx-auto">
                  Thanks — your property has been submitted for private review. We'll contact you if it fits our network.
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
