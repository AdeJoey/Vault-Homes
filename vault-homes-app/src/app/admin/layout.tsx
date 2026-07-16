"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Home, LogOut, Link2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const links = [
    {
      label: "Overview",
      href: "/admin",
      icon: <LayoutDashboard className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Seller Leads",
      href: "/admin/leads/sellers",
      icon: <Home className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Investor Leads",
      href: "/admin/leads/investors",
      icon: <Users className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Match Log",
      href: "/admin/matches",
      icon: <Link2 className="text-neutral-700 h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div className={cn("flex flex-col md:flex-row bg-neutral-100 w-full flex-1 h-screen overflow-hidden")}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => {
                const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
                
                // When active, clone the icon with white color
                const iconElement = React.cloneElement(link.icon as React.ReactElement<any>, {
                  className: cn(
                    (link.icon as React.ReactElement<any>).props.className,
                    isActive ? "text-white" : "text-neutral-700"
                  )
                });

                return (
                  <SidebarLink 
                    key={idx} 
                    link={{ ...link, icon: iconElement }} 
                    className={cn("rounded-lg px-2", isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100")}
                  />
                );
              })}
            </div>
          </div>
          <div className="px-2">
            <button onClick={handleLogout} className="flex items-center justify-start gap-2 group/sidebar py-2 w-full cursor-pointer">
               <LogOut className="text-red-600 h-5 w-5 flex-shrink-0" />
               <motion.span
                 animate={{
                   display: open ? "inline-block" : "none",
                   opacity: open ? 1 : 0,
                 }}
                 className="text-red-600 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
               >
                 Logout
               </motion.span>
            </button>
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#F8F9FA] md:rounded-tl-2xl border border-neutral-200 relative">
        <header className="hidden md:flex sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
             <span className="text-gray-900">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
               <span className="text-xs font-bold text-gray-600">VH</span>
             </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex space-x-2 items-center py-2 relative z-20 px-2"
    >
      <Image 
        src="/Assets/LogoDesktopHero.png" 
        alt="Vault Homes" 
        width={112} 
        height={39} 
        className="h-6 w-auto" 
        priority 
      />
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="/admin"
      className="font-normal flex justify-center items-center py-2 relative z-20 px-2 w-full"
    >
      <div className="h-7 w-7 bg-black rounded-lg flex items-center justify-center text-[#E5ED64] font-bold text-sm shadow-md">
        V
      </div>
    </Link>
  );
};
