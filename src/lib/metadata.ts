/**
 * Vault Homes — SEO Metadata
 * Central source of truth for all page title tags, descriptions, and OG tags.
 */

import type { Metadata } from "next";

const SITE_NAME = "Vault Homes";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vaulthomes.com";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vault Homes — Private Property Access in Lagos",
    template: "%s | Vault Homes",
  },
  description:
    "Vault Homes connects discreet Lagos property owners with serious buyers and investors. Private, curated, Lagos-focused.",
  keywords: [
    "private property Lagos",
    "off-market property Nigeria",
    "sell home privately Lagos",
    "Lagos real estate",
    "property investment Lagos",
    "discreet property sale",
  ],
  authors: [{ name: "Vault Homes" }],
  creator: "Vault Homes",
  publisher: "Vault Homes",
  icons: {
    icon: "/Assets/Favicon.png",
    shortcut: "/Assets/Favicon.png",
    apple: "/Assets/Favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Vault Homes — Private Property Access in Lagos",
    description:
      "Vault Homes connects discreet Lagos property owners with serious buyers and investors. Private, curated, Lagos-focused.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Vault Homes — Private Property Access in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vault Homes — Private Property Access in Lagos",
    description:
      "Vault Homes connects discreet Lagos property owners with serious buyers and investors.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// ---- Per-page metadata ----
export const pageMetadata = {
  home: {
    title: "Get First Access to Private Lagos Homes",
    description:
      "Vault Homes connects discreet property owners with serious buyers and investors in Lagos. Private sales. Curated opportunities. Fast response.",
    ogTitle: "Vault Homes — Private Property Access in Lagos",
    ogDescription:
      "Private, curated property access for serious Lagos sellers and investors.",
    canonical: `${SITE_URL}/`,
  },

  sellPrivately: {
    title: "Sell Your Home Privately in Lagos",
    description:
      "Submit your Lagos property to Vault Homes for a private, discreet review. No public listings. No noise. Just qualified interest.",
    ogTitle: "Sell Your Property Privately — Vault Homes",
    ogDescription:
      "Private property sales in Lagos. Submit your property for a discreet review.",
    canonical: `${SITE_URL}/sell-privately`,
  },

  findDeals: {
    title: "Access Private Property Deals in Lagos",
    description:
      "Join the Vault Homes investor network and receive curated, off-market Lagos property leads matched to your criteria.",
    ogTitle: "Find Private Property Deals — Vault Homes",
    ogDescription:
      "Curated off-market Lagos property opportunities for serious investors.",
    canonical: `${SITE_URL}/find-deals`,
  },

  about: {
    title: "About Vault Homes",
    description:
      "Vault Homes exists to make private property access in Lagos simpler, cleaner, and more discreet. Learn about our mission and brand principles.",
    ogTitle: "About Vault Homes — Private Property, Lagos",
    ogDescription:
      "Private property access in Lagos. Built for discreet sellers and serious investors.",
    canonical: `${SITE_URL}/about`,
  },

  insights: {
    title: "Property Insights for Lagos Sellers and Investors",
    description:
      "Practical, Lagos-focused property content for homeowners and investors. Private sales, off-market deals, and market notes.",
    ogTitle: "Vault Homes Insights — Lagos Property",
    ogDescription:
      "Lagos property insights for sellers and investors. Private sales, deals, and market notes.",
    canonical: `${SITE_URL}/insights`,
  },

  faq: {
    title: "Frequently Asked Questions",
    description:
      "Common questions about how Vault Homes works, privacy, fees, areas covered, and how to submit a property or join as an investor.",
    ogTitle: "FAQ — Vault Homes",
    ogDescription:
      "Answers to common questions about Vault Homes — how it works, privacy, and how to get started.",
    canonical: `${SITE_URL}/faq`,
  },

  contact: {
    title: "Contact Vault Homes",
    description:
      "Get in touch with Vault Homes. Send a message, WhatsApp us, or email directly. Lagos private property inquiries welcome.",
    ogTitle: "Contact Vault Homes",
    ogDescription:
      "Reach the Vault Homes team by form, WhatsApp, or email.",
    canonical: `${SITE_URL}/contact`,
  },

  privacyPolicy: {
    title: "Privacy Policy",
    description:
      "Vault Homes privacy policy. How we collect, use, and protect your personal information.",
    canonical: `${SITE_URL}/privacy-policy`,
  },

  termsOfUse: {
    title: "Terms of Use",
    description:
      "Terms of use for the Vault Homes website. Informational content only — not a brokerage or marketplace.",
    canonical: `${SITE_URL}/terms-of-use`,
  },
} as const;
