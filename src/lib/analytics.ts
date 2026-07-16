/**
 * Google Analytics 4 event tracking for Vault Homes.
 * All events are strongly typed. Only fires in production.
 */

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// ---- Event Type Definitions ----
type VaultHomesEvent =
  | {
      event: "cta_click";
      properties: { cta_label: string; cta_location: string; page: string };
    }
  | {
      event: "seller_form_submit";
      properties: { page: string; timeline: string };
    }
  | {
      event: "investor_form_submit";
      properties: { page: string; budget: string; asset_type: string };
    }
  | {
      event: "contact_form_submit";
      properties: { page: string };
    }
  | {
      event: "whatsapp_click";
      properties: { page: string; location: string };
    }
  | {
      event: "insight_article_click";
      properties: { article_slug: string; article_title: string };
    }
  | {
      event: "scroll_depth";
      properties: { page: string; depth: number };
    }
  | {
      event: "form_start";
      properties: {
        form_type: "seller" | "investor" | "contact";
        page: string;
      };
    }
  | {
      event: "form_error";
      properties: { form_type: string; field: string; error: string };
    };

// ---- Track Event ----
export function trackEvent({ event, properties }: VaultHomesEvent): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[Analytics]", event, properties);
    return;
  }
  if (!window.gtag) return;

  window.gtag("event", event, properties);
}

// ---- Page View ----
export function trackPageView(url: string, measurementId: string): void {
  if (typeof window === "undefined") return;
  if (process.env.NODE_ENV !== "production") return;
  if (!window.gtag) return;

  window.gtag("config", measurementId, {
    page_path: url,
  });
}
