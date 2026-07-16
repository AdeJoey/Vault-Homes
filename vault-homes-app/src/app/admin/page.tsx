"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Inbox, Home, Users, Zap, TrendingUp, Clock, ChevronRight } from "lucide-react";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(d => {
        if (d?.error || !d?.stats) {
          setError(d?.error || "Failed to load stats");
        } else {
          setData(d);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error — could not reach the server.");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3">
      <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
        <span className="text-red-500 text-xl font-bold">!</span>
      </div>
      <p className="text-gray-700 font-semibold">Could not load dashboard</p>
      <p className="text-gray-400 text-sm">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-2 text-sm font-medium text-black underline underline-offset-2">Retry</button>
    </div>
  );

  const stats = [
    {
      title: "New Leads",
      value: data.stats.newLeads,
      icon: Inbox,
      trend: "Unreviewed submissions",
      href: "/admin/leads/sellers",
    },
    {
      title: "Total Sellers",
      value: data.stats.totalSellers,
      icon: Home,
      trend: "Property owners in network",
      href: "/admin/leads/sellers",
    },
    {
      title: "Total Investors",
      value: data.stats.totalInvestors,
      icon: Users,
      trend: "Active investors in pool",
      href: "/admin/leads/investors",
    },
    {
      title: "Matches Found",
      value: data.stats.matchesFound,
      icon: Zap,
      trend: "Private connections made",
      href: "/admin",
    },
  ];

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="pb-12 space-y-8">

      {/* Hero Welcome Banner */}
      <div className="relative bg-black rounded-3xl p-8 overflow-hidden">
        {/* Accent stripe */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#E5ED64]" />
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px"}} />
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#E5ED64] opacity-5 blur-3xl" />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[#E5ED64] text-sm font-semibold tracking-widest uppercase mb-1">{greeting}</p>
            <h1 className="text-4xl font-bold text-white tracking-tight mb-2">Vault Homes Admin</h1>
            <p className="text-gray-400 text-sm max-w-sm">Your private property network. Here's a live snapshot of your lead activity.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/leads/sellers" className="inline-flex items-center gap-2 bg-[#E5ED64] text-black px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#d4dc56] transition-colors shadow-lg">
              <Home size={16} /> View Sellers
            </Link>
            <Link href="/admin/leads/investors" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/15 transition-colors">
              <Users size={16} /> View Investors
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Link href={stat.href} key={i}>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-gray-200 transition-all duration-300 cursor-pointer group h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                    <Icon size={20} className="text-neutral-700" strokeWidth={1.8} />
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 tracking-tight mb-1">{stat.value}</h3>
                  <p className="text-gray-500 text-xs font-medium">{stat.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{stat.trend}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions + Recent Activity side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] p-6 flex flex-col gap-4">
          <h2 className="text-base font-semibold text-gray-900">Quick Actions</h2>
          <Link href="/admin/leads/sellers" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
              <Home size={17} className="text-neutral-700" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Seller Leads</p>
              <p className="text-xs text-gray-500">{data.stats.totalSellers} total entries</p>
            </div>
            <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </Link>
          <Link href="/admin/leads/investors" className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 hover:border-gray-200 transition-all group">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
              <Users size={17} className="text-neutral-700" strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Investor Leads</p>
              <p className="text-xs text-gray-500">{data.stats.totalInvestors} total entries</p>
            </div>
            <ChevronRight size={15} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
          </Link>
          <div className="mt-auto pt-2 border-t border-gray-50">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Clock size={12} />
              Updated just now
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-base font-semibold text-gray-900">Recent Submissions</h2>
            <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-full">
              Last {Math.min(data.recentActivity.length, 5)}
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {data.recentActivity.length === 0 && (
              <div className="p-12 text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Inbox size={20} className="text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm">No submissions yet.</p>
              </div>
            )}
            {data.recentActivity.map((lead: any) => (
              <div key={lead.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                    {lead.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lead.fullName}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} · {lead.leadType}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${lead.status === "new" ? "bg-blue-500" : lead.status === "matched" ? "bg-[#C9D42C]" : lead.status === "reviewing" ? "bg-yellow-500" : "bg-gray-400"}`} />
                    <span className="text-[11px] font-medium text-gray-600 capitalize">{lead.status}</span>
                  </div>
                  <Link href={`/admin/leads/${lead.id}`} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-all">
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
