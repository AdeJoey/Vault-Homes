"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface UTMParams {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
}

const SESSION_KEY = "vault_utm";

/**
 * Reads UTM parameters from the URL on first load and stores them in sessionStorage.
 * Returns the stored UTM params so they can be attached to form submissions.
 */
export function useUTMCapture(): UTMParams {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmContent = searchParams.get("utm_content");

    // Only overwrite if we have new UTM params
    if (utmSource || utmMedium || utmCampaign) {
      const params: UTMParams = {
        utmSource: utmSource ?? undefined,
        utmMedium: utmMedium ?? undefined,
        utmCampaign: utmCampaign ?? undefined,
        utmContent: utmContent ?? undefined,
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(params));
    }
  }, [searchParams]);

  // Return current stored params
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as UTMParams) : {};
  } catch {
    return {};
  }
}

/**
 * Standalone function to retrieve UTM params from sessionStorage.
 * Use in form submit handlers where hooks can't be called.
 */
export function getStoredUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? (JSON.parse(stored) as UTMParams) : {};
  } catch {
    return {};
  }
}
