"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, User, Building, MapPin, DollarSign, Search, CheckCircle2, Link2, Copy, Check } from "lucide-react";
import Link from "next/link";

interface Lead {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  leadType: string;
  status: string;
  propertyLocation?: string;
  propertyType?: string;
  priceExpectation?: string;
  sellingTimeline?: string;
  preferredArea?: string;
  assetType?: string;
  budgetMin?: number;
  budgetMax?: number;
  cashBuyer?: boolean;
  createdAt: string;
}

interface MatchResult {
  id: string;
  fullName: string;
  budgetMax?: number;
  preferredArea?: string;
  email?: string;
  phone?: string;
}

interface ConfirmedMatch {
  id: string;
  investorId: string;
  notes?: string;
  confirmedAt: string;
  investor: Lead;
}

export default function LeadDetail() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [confirmedMatches, setConfirmedMatches] = useState<ConfirmedMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [searching, setSearching] = useState(false);
  const [activeNotes, setActiveNotes] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/admin/leads/${id}`).then(r => r.json()),
      fetch(`/api/admin/matches`).then(r => r.json()),
    ]).then(([leadData, matchData]) => {
      setLead(leadData.lead);
      // Filter confirmed matches for this seller
      const allMatches: ConfirmedMatch[] = matchData.matches || [];
      setConfirmedMatches(allMatches.filter((m: any) => m.sellerId === id));
      setLoading(false);
    });
  }, [id]);

  const updateStatus = async (status: string) => {
    setUpdating(true);
    await fetch(`/api/admin/leads/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setLead(prev => prev ? { ...prev, status } : prev);
    setUpdating(false);
  };

  const findMatches = async () => {
    setSearching(true);
    const res = await fetch(`/api/admin/leads/${id}/matches`);
    const data = await res.json();
    setMatches(data.matches || []);
    setSearching(false);
  };

  const confirmIntroduction = async (investorId: string) => {
    setConfirming(investorId);
    await fetch(`/api/admin/matches`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sellerId: id, investorId, notes: activeNotes[investorId] || "" }),
    });
    // Refresh confirmed matches & update lead status locally
    const matchData = await fetch(`/api/admin/matches`).then(r => r.json());
    const allMatches: ConfirmedMatch[] = matchData.matches || [];
    setConfirmedMatches(allMatches.filter((m: any) => m.sellerId === id));
    setLead(prev => prev ? { ...prev, status: "matched" } : prev);
    setConfirming(null);
  };

  const copyEmailTemplate = (investor: MatchResult) => {
    if (!lead) return;
    const template = `Subject: Introduction — ${lead.fullName} × ${investor.fullName}

Hi ${investor.fullName},

I hope this message finds you well. I'm reaching out on behalf of Vault Homes to introduce you to an off-market property opportunity that aligns closely with your investment criteria.

We have a seller — ${lead.fullName} — with a ${lead.propertyType || "property"} located in ${lead.propertyLocation || "an area of interest"}, listed at ${lead.priceExpectation || "a competitive price"}. Based on your preference for properties in ${investor.preferredArea || "your target area"} with a budget of up to ${investor.budgetMax?.toLocaleString() || "your stated budget"}, this appears to be a strong fit.

We would love to facilitate a private introduction between both parties. Please let us know your availability for a call or site visit.

Best regards,
The Vault Homes Team`;

    navigator.clipboard.writeText(template);
    setCopied(investor.id);
    setTimeout(() => setCopied(null), 2500);
  };

  const isAlreadyConfirmed = (investorId: string) =>
    confirmedMatches.some(m => m.investorId === investorId);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
    </div>
  );

  if (!lead) return <div>Lead not found.</div>;

  const statusColors: Record<string, string> = {
    new: "bg-blue-500",
    reviewing: "bg-yellow-500",
    approved: "bg-green-500",
    matched: "bg-[#C9D42C]",
    closed: "bg-gray-400",
    archived: "bg-gray-300",
  };

  return (
    <div className="pb-20">
      <Link
        href={`/admin/leads/${lead.leadType.toLowerCase()}s`}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-6 font-medium text-sm transition-colors"
      >
        <ArrowLeft size={16} /> Back to {lead.leadType.toLowerCase()}s
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{lead.fullName}</h1>
        <p className="text-gray-500 text-sm flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium text-xs">{lead.leadType}</span>
          Submitted on {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Pane */}
        <div className="flex-1 space-y-6">

          {/* Contact Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-6">
              <User size={16} className="text-gray-400" /> Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: "Email Address", value: lead.email },
                { label: "Phone Number", value: lead.phone },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-1">{label}</span>
                  <p className="font-medium text-gray-900 text-sm">{value || "N/A"}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2 mb-6">
              <Building size={16} className="text-gray-400" />
              {lead.leadType?.toUpperCase() === "SELLER" ? "Property Details" : "Investment Criteria"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.leadType?.toUpperCase() === "SELLER" ? (
                <>
                  {[
                    { label: "Location", value: lead.propertyLocation, icon: <MapPin size={13} className="text-gray-400" /> },
                    { label: "Property Type", value: lead.propertyType, icon: <Building size={13} className="text-gray-400" /> },
                    { label: "Expected Price", value: lead.priceExpectation, icon: <DollarSign size={13} className="text-green-600" /> },
                    { label: "Selling Timeline", value: lead.sellingTimeline, icon: null },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-1">{label}</span>
                      <p className="font-medium text-gray-900 text-sm flex items-center gap-1">{icon}{value || "N/A"}</p>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { label: "Preferred Area", value: lead.preferredArea, icon: <MapPin size={13} className="text-gray-400" /> },
                    { label: "Asset Type", value: lead.assetType, icon: <Building size={13} className="text-gray-400" /> },
                    { label: "Budget Range", value: lead.budgetMin && lead.budgetMax ? `${lead.budgetMin.toLocaleString()} – ${lead.budgetMax.toLocaleString()}` : "N/A", icon: <DollarSign size={13} className="text-green-600" /> },
                    { label: "Cash Buyer", value: lead.cashBuyer ? "Yes" : "No", icon: null },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <span className="text-gray-400 text-[11px] font-semibold uppercase tracking-wider block mb-1">{label}</span>
                      <p className="font-medium text-gray-900 text-sm flex items-center gap-1">{icon}{value}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Discovery Engine — Seller only */}
          {lead.leadType?.toUpperCase() === "SELLER" && (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_40px_rgb(0,0,0,0.06)] overflow-hidden">
              <div className="h-1.5 bg-[#E5ED64] w-full" />
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Discovery Engine</h2>
                    <p className="text-gray-500 text-sm">Scan the private investor network for compatible matches.</p>
                  </div>
                  <button
                    onClick={findMatches}
                    disabled={searching}
                    className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-black/90 transition-all shadow-md disabled:opacity-60 cursor-pointer"
                  >
                    {searching ? (
                      <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Scanning...</>
                    ) : (
                      <><Search size={16} /> Run Match Analysis</>
                    )}
                  </button>
                </div>

                {/* Match Results */}
                {matches.length > 0 ? (
                  <div className="space-y-4">
                    {matches.map(investor => {
                      const confirmed = isAlreadyConfirmed(investor.id);
                      return (
                        <div key={investor.id} className={`rounded-2xl border p-6 transition-all ${confirmed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${confirmed ? "bg-green-100 text-green-700" : "bg-white shadow-sm border border-gray-100 text-gray-700"}`}>
                                {confirmed ? <CheckCircle2 size={22} className="text-green-600" /> : investor.fullName.charAt(0)}
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-base">{investor.fullName}</p>
                                <p className="text-sm text-gray-500">
                                  Budget up to <span className="font-semibold text-gray-800">₦{investor.budgetMax?.toLocaleString()}</span> · {investor.preferredArea}
                                </p>
                                {confirmed && (
                                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 mt-1">
                                    <CheckCircle2 size={12} /> Introduction Confirmed
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={() => copyEmailTemplate(investor)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all cursor-pointer"
                              >
                                {copied === investor.id ? <><Check size={14} className="text-green-600" /> Copied!</> : <><Copy size={14} /> Email Template</>}
                              </button>
                              <Link href={`/admin/leads/${investor.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all">
                                <Link2 size={14} /> View Profile
                              </Link>
                            </div>
                          </div>

                          {/* Notes + Confirm */}
                          {!confirmed && (
                            <div className="mt-5 pt-5 border-t border-gray-200 space-y-3">
                              <textarea
                                value={activeNotes[investor.id] || ""}
                                onChange={(e) => setActiveNotes(prev => ({ ...prev, [investor.id]: e.target.value }))}
                                placeholder="Add private introduction notes (e.g. agreed on a site visit for next Thursday…)"
                                rows={2}
                                className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-black transition-colors resize-none placeholder:text-gray-400"
                              />
                              <button
                                onClick={() => confirmIntroduction(investor.id)}
                                disabled={confirming === investor.id}
                                className="w-full flex items-center justify-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-black/90 transition-all disabled:opacity-60 cursor-pointer"
                              >
                                {confirming === investor.id ? (
                                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Confirming...</>
                                ) : (
                                  <><CheckCircle2 size={16} /> Confirm Introduction & Mark Both as Matched</>
                                )}
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-2xl p-10 text-center border border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                      <Search className="text-gray-300" size={24} />
                    </div>
                    <h3 className="text-gray-900 font-semibold mb-1">No matches run yet</h3>
                    <p className="text-gray-400 text-sm max-w-sm mx-auto">Click "Run Match Analysis" to scan the current investor pool against this seller's criteria.</p>
                  </div>
                )}

                {/* Already-confirmed connections */}
                {confirmedMatches.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500" /> Confirmed Connections ({confirmedMatches.length})
                    </h3>
                    <div className="space-y-3">
                      {confirmedMatches.map(m => (
                        <div key={m.id} className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{m.investor?.fullName}</p>
                            {m.notes && <p className="text-xs text-gray-500 mt-0.5 italic">"{m.notes}"</p>}
                            <p className="text-[11px] text-gray-400 mt-1">
                              Confirmed {new Date(m.confirmedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                            </p>
                          </div>
                          <Link href={`/admin/leads/${m.investorId}`} className="text-xs font-medium text-gray-600 hover:text-black transition-colors">
                            View →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Pane - Sticky Summary */}
        <div className="w-full lg:w-[300px] flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] sticky top-28">
            <h3 className="text-base font-bold text-gray-900 mb-6">Lead Summary</h3>
            <div className="space-y-3 mb-6">
              {[
                { label: "Status", value: <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusColors[lead.status] || "bg-gray-400"}`} />
                    <span className="font-semibold text-gray-900 text-sm capitalize">{lead.status}</span>
                  </div> },
                { label: "Type", value: <span className="font-medium text-gray-900 text-sm">{lead.leadType}</span> },
                { label: "Connections", value: <span className="font-medium text-gray-900 text-sm">{confirmedMatches.length} confirmed</span> },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-500 text-sm">{label}</span>
                  {value}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Update Status</label>
              <div className="relative">
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(e.target.value)}
                  disabled={updating}
                  className="w-full appearance-none bg-white border border-gray-200 text-gray-900 font-medium text-sm rounded-lg py-2.5 pl-4 pr-10 outline-none focus:border-black transition-colors cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="approved">Approved</option>
                  <option value="matched">Matched</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
