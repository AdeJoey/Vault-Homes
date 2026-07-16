"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Home, Users, ArrowRight } from "lucide-react";

export default function MatchLog() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/matches")
      .then(r => r.json())
      .then(d => {
        setMatches(d.matches || []);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
    </div>
  );

  return (
    <div className="pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Match Log</h1>
        <p className="text-gray-500 mt-1">All confirmed private introductions between sellers and investors.</p>
      </div>

      {matches.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] p-16 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <CheckCircle2 size={26} className="text-gray-300" />
          </div>
          <h3 className="text-gray-800 font-semibold mb-2">No matches confirmed yet</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto">Use the Discovery Engine on a Seller lead to find investors and confirm introductions.</p>
          <Link href="/admin/leads/sellers" className="inline-flex items-center gap-2 mt-6 bg-black text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-black/90 transition-all">
            <Home size={15} /> View Seller Leads
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50/80 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-5 border-b border-gray-100">Seller</th>
                  <th className="px-6 py-5 border-b border-gray-100">Investor</th>
                  <th className="px-6 py-5 border-b border-gray-100">Notes</th>
                  <th className="px-6 py-5 border-b border-gray-100">Confirmed On</th>
                  <th className="px-6 py-5 border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {matches.map((match) => (
                  <tr key={match.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600">
                          <Home size={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{match.seller?.fullName || "—"}</p>
                          <p className="text-xs text-gray-400">{match.seller?.propertyLocation || "No location"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                          <Users size={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{match.investor?.fullName || "—"}</p>
                          <p className="text-xs text-gray-400">{match.investor?.preferredArea || "No area"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[220px]">
                      <p className="text-gray-600 text-sm truncate italic">{match.notes ? `"${match.notes}"` : <span className="text-gray-300 not-italic">No notes</span>}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(match.confirmedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/leads/${match.sellerId}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all">
                          Seller <ArrowRight size={12} />
                        </Link>
                        <Link href={`/admin/leads/${match.investorId}`} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:bg-gray-50 text-gray-700 transition-all">
                          Investor <ArrowRight size={12} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
