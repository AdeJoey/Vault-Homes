"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import { usePathname } from "next/navigation";

const MILESTONES = [25, 50, 75, 90, 100];

/**
 * Tracks scroll depth milestones (25%, 50%, 75%, 90%, 100%)
 * and fires GA4 events. Each milestone fires only once per page load.
 */
export function useScrollDepth() {
  const pathname = usePathname();
  const firedMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Reset on route change
    firedMilestones.current = new Set();

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (docHeight === 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (scrollPercent >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          trackEvent({
            event: "scroll_depth",
            properties: { page: pathname, depth: milestone },
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);
}
