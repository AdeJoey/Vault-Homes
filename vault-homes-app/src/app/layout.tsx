import type { Metadata } from "next";
import { Kufam } from "next/font/google";
import "./globals.css";
import { defaultMetadata } from "@/lib/metadata";

const kufam = Kufam({
  variable: "--font-kufam",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kufam.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
