/**
 * Vault Homes — Central SEO Metadata & Keywords
 * 100+ targeted keywords covering all buyer/seller/investor intent signals
 * for the Lagos private property market.
 */

import type { Metadata } from "next";

const SITE_NAME = "Vault Homes";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vaulthomes.com";

// ─── Master keyword list (100+ keywords) ───────────────────────────────────
export const GLOBAL_KEYWORDS = [
  // Core brand & concept
  "Vault Homes",
  "private property Lagos",
  "off-market property Lagos",
  "off-market real estate Lagos",
  "private real estate Nigeria",
  "discreet property sale Lagos",
  "confidential property sale Nigeria",
  "exclusive property Lagos",
  "private listing Lagos",
  "unlisted property Lagos",

  // Seller intent
  "sell property privately Lagos",
  "sell home privately Nigeria",
  "sell house off-market Lagos",
  "how to sell property privately in Lagos",
  "sell luxury home Lagos",
  "sell without agent Lagos",
  "discreet home sale Lagos",
  "quiet sale property Nigeria",
  "sell property without listing Lagos",
  "private property seller Lagos",

  // Investor intent
  "buy off-market property Lagos",
  "Lagos property investment",
  "real estate investment Lagos Nigeria",
  "off-market deals Lagos",
  "Lagos property investor",
  "invest in Lagos real estate",
  "exclusive property deals Lagos",
  "curated property deals Nigeria",
  "high value property Lagos",
  "Nigeria property investment opportunities",

  // Location — Lagos neighbourhoods
  "Ikoyi real estate",
  "Victoria Island property",
  "Lekki property for sale",
  "Banana Island real estate",
  "Eko Atlantic property",
  "Oniru real estate Lagos",
  "Magodo property Lagos",
  "GRA Ikeja property",
  "Surulere real estate Lagos",
  "Ajah property Lagos",
  "Sangotedo real estate",
  "Chevron Drive property",
  "Osapa London Lagos real estate",
  "Parkview Estate Ikoyi",
  "Old Ikoyi property",

  // Property types
  "luxury apartment Lagos",
  "duplex for sale Lagos",
  "penthouse Lagos",
  "townhouse Lagos",
  "detached house Lagos",
  "semi-detached Lagos",
  "commercial property Lagos",
  "land for sale Lagos",
  "luxury villa Nigeria",
  "waterfront property Lagos",
  "serviced apartment Lagos",
  "smart home Lagos",

  // Market & process terms
  "Lagos real estate market 2025",
  "Lagos real estate market 2026",
  "Nigeria property market",
  "Lagos property market trends",
  "real estate Nigeria",
  "Lagos house prices",
  "property valuation Lagos",
  "real estate agent Lagos",
  "property deal Nigeria",
  "real estate broker Lagos",
  "private buyer Lagos",
  "serious buyers Lagos property",
  "qualified investors Nigeria",
  "property network Lagos",
  "curated property access",
  "verified buyers Lagos",

  // Trust & experience signals
  "trusted real estate Lagos",
  "reputable property company Nigeria",
  "professional property Lagos",
  "secure property transaction Nigeria",
  "vetted buyers Lagos",
  "transparent property process Nigeria",
  "no hidden fees property Lagos",

  // Insights & market education
  "Lagos property insights",
  "Nigeria real estate blog",
  "Lagos property market news",
  "property investment tips Nigeria",
  "real estate guide Lagos",
  "off-market property guide",
  "how to buy property Lagos",
  "how to invest in Nigerian real estate",
  "Lagos homeowners guide",
  "Nigeria property law basics",

  // High-intent long-tail
  "sell my house fast Lagos",
  "find off-market property Lagos",
  "access private property deals Lagos",
  "discreet real estate Lagos Nigeria",
  "property management Lagos",
  "connect with property buyers Lagos",
  "real estate investment network Nigeria",
  "private property sale ikoyi lekki VI",
];

// ─── Default / Homepage metadata ──────────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Vault Homes — Private Property Access in Lagos",
    template: "%s | Vault Homes",
  },
  description:
    "Vault Homes connects discreet Lagos property owners with serious, pre-vetted buyers and investors. Private sales in Ikoyi, Victoria Island, Lekki & beyond. No public listings. Just qualified interest.",
  keywords: GLOBAL_KEYWORDS,
  authors: [{ name: "Vault Homes", url: SITE_URL }],
  creator: "Vault Homes",
  publisher: "Vault Homes",
  category: "Real Estate",
  classification: "Real Estate, Property, Investment",
  icons: {
    icon: "/Assets/Favicon.png",
    shortcut: "/Assets/Favicon.png",
    apple: "/Assets/Favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
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
      "Private, curated property access for discreet Lagos sellers and serious investors. Off-market deals in Ikoyi, Victoria Island, Lekki & beyond.",
    images: [
      {
        url: "/Assets/Hero desktop.png",
        width: 1200,
        height: 630,
        alt: "Vault Homes — Private Property Access in Lagos",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vaulthomesng",
    creator: "@vaulthomesng",
    title: "Vault Homes — Private Property Access in Lagos",
    description:
      "Private, curated property access for discreet Lagos sellers and serious investors.",
    images: ["/Assets/Hero desktop.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Lagos, Nigeria",
    "geo.position": "6.5244;3.3792",
    "ICBM": "6.5244, 3.3792",
  },
};

// ─── Per-page metadata ─────────────────────────────────────────────────────
export const pageMetadata = {
  home: {
    title: "Get First Access to Private Lagos Property",
    description:
      "Vault Homes gives serious sellers and investors first access to off-market Lagos property. Private sales in Ikoyi, Lekki, Victoria Island & more. Submit your property or join as an investor today.",
    keywords: [
      ...GLOBAL_KEYWORDS,
      "first access Lagos property",
      "private property network Lagos",
      "off-market Lagos homes 2026",
      "how vault homes works",
    ],
    canonical: `${SITE_URL}/`,
    ogImage: "/Assets/Hero desktop.png",
  },

  sellPrivately: {
    title: "Sell Your Property Privately in Lagos",
    description:
      "Sell your Lagos home privately with Vault Homes. No public listings, no noise — just pre-vetted, serious buyers matched to your property. Ikoyi, Victoria Island, Lekki, Banana Island & more.",
    keywords: [
      "sell property privately Lagos",
      "sell home off-market Lagos",
      "private property sale Lagos",
      "discreet home sale Lagos",
      "sell luxury property Lagos",
      "sell without estate agent Lagos",
      "private seller Lagos Nigeria",
      "quiet property sale Lagos",
      "sell Ikoyi property privately",
      "sell Victoria Island property",
      "sell Lekki property privately",
      "how to sell property without listing Lagos",
      "property seller network Lagos",
      "exclusive property buyer Lagos",
      "sell home fast Lagos Nigeria",
    ],
    canonical: `${SITE_URL}/sell-privately`,
    ogImage: "/Assets/Hero desktop.png",
  },

  findDeals: {
    title: "Access Private Property Investment Deals in Lagos",
    description:
      "Join the Vault Homes investor network. Get curated, off-market Lagos property leads matched to your investment criteria. Ikoyi, Lekki, Victoria Island, Banana Island & beyond.",
    keywords: [
      "Lagos property investment deals",
      "off-market property investor Lagos",
      "find property deals Lagos",
      "buy off-market Lagos",
      "exclusive property investment Nigeria",
      "real estate investor Lagos",
      "Lagos property deal access",
      "private buyer network Lagos",
      "investment property Lagos 2026",
      "high yield property Lagos",
      "luxury property investment Nigeria",
      "find deals Lagos real estate",
      "curated investor deals Lagos",
      "pre-vetted property Lagos",
      "buy property Ikoyi Victoria Island Lekki",
    ],
    canonical: `${SITE_URL}/find-deals`,
    ogImage: "/Assets/Hero desktop.png",
  },

  about: {
    title: "About Vault Homes — Private Property, Lagos",
    description:
      "Learn about Vault Homes: Nigeria's private property network for discreet sellers and serious investors. Based in Lagos, focused on Ikoyi, Victoria Island, Lekki, and beyond.",
    keywords: [
      "about vault homes",
      "vault homes Nigeria",
      "vault homes Lagos",
      "who is vault homes",
      "Lagos private property company",
      "Nigeria real estate startup",
      "discreet property network Nigeria",
      "real estate company Lagos",
      "property brand Nigeria",
      "Lagos property service",
    ],
    canonical: `${SITE_URL}/about`,
    ogImage: "/Assets/Hero desktop.png",
  },

  insights: {
    title: "Lagos Property Insights — Market Tips for Sellers & Investors",
    description:
      "Read Lagos-focused property insights from Vault Homes. Market trends, off-market strategies, investor guides, and homeowner tips for Nigeria's private real estate market.",
    keywords: [
      "Lagos property insights",
      "Nigeria real estate market blog",
      "off-market property tips Lagos",
      "Lagos real estate news 2026",
      "property market analysis Lagos",
      "real estate guide Nigeria",
      "Lagos investor insights",
      "homeowner tips Lagos",
      "property selling guide Nigeria",
      "Lagos luxury real estate trends",
    ],
    canonical: `${SITE_URL}/insights`,
    ogImage: "/Assets/slide1.jpg",
  },

  faq: {
    title: "FAQ — How Vault Homes Works",
    description:
      "Answers to common questions about Vault Homes. Learn how private property sales work, what areas we cover, our fees, privacy policies, and how to get started as a seller or investor in Lagos.",
    keywords: [
      "vault homes FAQ",
      "how does vault homes work",
      "private property sale FAQ Lagos",
      "off-market real estate questions",
      "Lagos property sale process",
      "how to join vault homes",
      "vault homes fees",
      "vault homes privacy",
      "real estate FAQ Nigeria",
      "property questions Lagos",
    ],
    canonical: `${SITE_URL}/faq`,
    ogImage: "/Assets/Hero desktop.png",
  },

  contact: {
    title: "Contact Vault Homes — Lagos Private Property Enquiries",
    description:
      "Get in touch with Vault Homes. Send a message, WhatsApp us, or email directly for private property enquiries in Lagos. Sellers, investors, and partners welcome.",
    keywords: [
      "contact vault homes",
      "vault homes WhatsApp",
      "vault homes email",
      "Lagos property enquiry",
      "real estate contact Lagos",
      "property enquiry Nigeria",
      "vault homes phone number",
      "reach vault homes",
      "Lagos property contact",
      "Nigeria real estate enquiry",
    ],
    canonical: `${SITE_URL}/contact`,
    ogImage: "/Assets/Hero desktop.png",
  },

  privacyPolicy: {
    title: "Privacy Policy — Vault Homes",
    description:
      "Vault Homes privacy policy. How we collect, use, and protect your personal information when you use our private property platform in Lagos, Nigeria.",
    canonical: `${SITE_URL}/privacy-policy`,
    keywords: ["vault homes privacy policy", "property platform privacy Nigeria"],
  },

  termsOfUse: {
    title: "Terms of Use — Vault Homes",
    description:
      "Terms of use for the Vault Homes platform. Informational content only — not a licensed brokerage or marketplace. Read before using our services.",
    canonical: `${SITE_URL}/terms-of-use`,
    keywords: ["vault homes terms of use", "property platform terms Nigeria"],
  },
} as const;

// ─── Helper: build per-insight metadata ────────────────────────────────────
export function buildInsightMetadata(insight: {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  author: string;
  date: string;
}): Metadata {
  return {
    title: insight.title,
    description: insight.excerpt,
    keywords: [
      ...GLOBAL_KEYWORDS,
      insight.category,
      insight.title,
      "Lagos property article",
      "Nigeria real estate insight",
    ],
    authors: [{ name: insight.author }],
    openGraph: {
      type: "article",
      locale: "en_NG",
      url: `${SITE_URL}/insights/${insight.slug}`,
      siteName: SITE_NAME,
      title: `${insight.title} | Vault Homes`,
      description: insight.excerpt,
      images: [
        {
          url: "/Assets/slide1.jpg",
          width: 1200,
          height: 630,
          alt: insight.title,
        },
      ],
      publishedTime: new Date().toISOString(),
      authors: [insight.author],
      section: "Real Estate",
      tags: ["Lagos", "Real Estate", "Property", insight.category],
    },
    twitter: {
      card: "summary_large_image",
      title: `${insight.title} | Vault Homes`,
      description: insight.excerpt,
      images: ["/Assets/slide1.jpg"],
    },
    alternates: {
      canonical: `${SITE_URL}/insights/${insight.slug}`,
    },
  };
}
