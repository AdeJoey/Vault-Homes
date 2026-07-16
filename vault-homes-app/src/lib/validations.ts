import { z } from "zod";

// Nigerian phone number regex
const nigerianPhoneRegex = /^(\+?234|0)[789]\d{9}$/;

// ---- Seller Lead Schema ----
export const sellerLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .trim(),
  phone: z
    .string()
    .regex(nigerianPhoneRegex, "Please enter a valid Nigerian phone number")
    .trim(),
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  propertyLocation: z
    .string()
    .min(3, "Please provide the property location")
    .max(200, "Location is too long")
    .trim(),
  propertyType: z.enum(
    ["apartment", "house", "duplex", "terrace", "land", "commercial", "other"],
    { error: "Please select a property type" }
  ),
  sellingTimeline: z.enum(
    ["immediately", "1-3months", "3-6months", "6-12months", "exploring"],
    { error: "Please select a selling timeline" }
  ),
  notes: z.string().max(500, "Notes must be under 500 characters").trim().optional(),
  pageSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().max(0, "").optional(),
});

export type SellerLeadSchema = z.infer<typeof sellerLeadSchema>;

// ---- Investor Lead Schema ----
export const investorLeadSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .trim(),
  phone: z
    .string()
    .regex(nigerianPhoneRegex, "Please enter a valid Nigerian phone number")
    .trim(),
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  preferredArea: z
    .string()
    .min(2, "Please specify your preferred area")
    .max(200, "Area description is too long")
    .trim(),
  budget: z.enum(
    ["below-50m", "50m-100m", "100m-200m", "200m-500m", "500m-1b", "above-1b"],
    { error: "Please select a budget range" }
  ),
  assetType: z.enum(
    ["residential", "commercial", "land", "mixed-use", "any"],
    { error: "Please select an asset type" }
  ),
  buyingTimeline: z.enum(
    ["immediately", "1-3months", "3-6months", "6-12months", "exploring"],
    { error: "Please select a timeline" }
  ),
  pageSource: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  honeypot: z.string().max(0, "").optional(),
});

export type InvestorLeadSchema = z.infer<typeof investorLeadSchema>;

// ---- Contact Schema ----
export const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .trim(),
  email: z.string().email("Please enter a valid email address").trim().toLowerCase(),
  message: z
    .string()
    .min(10, "Please write at least a brief message")
    .max(500, "Message must be under 500 characters")
    .trim(),
  honeypot: z.string().max(0, "").optional(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
