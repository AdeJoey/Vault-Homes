/**
 * Vault Homes — Site Configuration
 * Single source of truth for all site-wide constants.
 */

export const siteConfig = {
  name: "Vault Homes",
  tagline: "Private. Curated. Lagos-focused.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vaulthomes.com",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348117682654",
    get url() {
      return `https://wa.me/${this.number}`;
    },
    get displayNumber() {
      return "0811 768 2654";
    },
  },
  social: {
    instagram: "https://instagram.com/vaulthomes",
    twitter: "https://twitter.com/vaulthomes",
    facebook: "https://facebook.com/vaulthomes",
  },
  email: "hello@vaulthomes.com",
  location: "Lagos, Nigeria",
  nav: [
    { label: "Sell Privately", href: "/sell-privately" },
    { label: "Find Deals", href: "/find-deals" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
} as const;
