// Vault Homes — Shared TypeScript Types

export type LeadType = "seller" | "investor" | "contact";

export interface SellerLeadData {
  fullName: string;
  phone: string;
  email: string;
  propertyLocation: string;
  propertyType: string;
  sellingTimeline: string;
  notes?: string;
  // Analytics
  pageSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface InvestorLeadData {
  fullName: string;
  phone: string;
  email: string;
  preferredArea: string;
  budget: string;
  assetType: string;
  buyingTimeline: string;
  // Analytics
  pageSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface ContactData {
  fullName: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface InsightArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  ogImage: string;
}

export type NavLink = {
  label: string;
  href: string;
};

export type SocialPlatform = "instagram" | "twitter" | "facebook";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}
