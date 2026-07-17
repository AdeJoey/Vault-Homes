import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

const p = pageMetadata.sellPrivately;

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
    images: [
      {
        url: p.ogImage,
        width: 1200,
        height: 630,
        alt: p.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: p.title,
    description: p.description,
    images: [p.ogImage],
  },
};

export default function SellPrivatelyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
