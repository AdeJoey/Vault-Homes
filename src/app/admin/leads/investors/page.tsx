"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function InvestorsList() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads?type=INVESTOR")
      .then(res => res.json())
      .then(data => {
        setLeads(data.leads || []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  return (
    <div className="pb-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Investor Leads</h1>
          <p className="text-gray-500 mt-1">Manage buyers and match them to inventory.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-5 border-b border-gray-100">Name</th>
                <th className="px-6 py-5 border-b border-gray-100">Preferred Area</th>
                <th className="px-6 py-5 border-b border-gray-100">Target Asset</th>
                <th className="px-6 py-5 border-b border-gray-100">Budget Range</th>
                <th className="px-6 py-5 border-b border-gray-100">Status</th>
                <th className="px-6 py-5 border-b border-gray-100">Date</th>
                <th className="px-6 py-5 border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-semibold text-xs">
                        {lead.fullName.charAt(0)}
                      </div>
                      {lead.fullName}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lead.preferredArea || "-"}</td>
                  <td className="px-6 py-4 text-gray-600">{lead.assetType || "-"}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {lead.budgetMin} - {lead.budgetMax}
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100">
                      <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'new' ? 'bg-blue-500' : lead.status === 'matched' ? 'bg-[#C9D42C]' : 'bg-gray-400'}`}></div>
                      <span className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider">
                        {lead.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/leads/${lead.id}`} className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-black transition-all shadow-sm">
                      View <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400 text-sm">
                    No investor leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
