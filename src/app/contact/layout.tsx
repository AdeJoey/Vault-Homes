import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

const p = pageMetadata.contact;

export const metadata: Metadata = {
  title: p.title,
  description: p.description,
  keywords: p.keywords as string[],
  alternates: { canonical: p.canonical },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: p.canonical,
    siteName: "Vault Homes",
    title: p.title,
    description: p.description,
  },
  twitter: {
    card: "summary_large_image",
    title: p.title,
    description: p.description,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
