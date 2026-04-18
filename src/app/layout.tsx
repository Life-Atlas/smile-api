import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://smile.winniio.io";
const siteName = "S.M.I.L.E. — Sustainable Methodology for Impact Lifecycle Enablement";
const siteDescription =
  "Turn any project into a continuously learning digital twin. Upload your project plan and get SMILE scores, AEST temporal analysis, NUDEDA maturity assessment, and actionable revision suggestions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | S.M.I.L.E.",
  },
  description: siteDescription,
  keywords: [
    "SMILE methodology",
    "digital twin methodology",
    "project analysis",
    "AEST temporal model",
    "NUDEDA maturity",
    "impact lifecycle enablement",
    "project digital twin",
    "sustainability methodology",
    "WINNIIO",
    "Nicolas Waern",
  ],
  authors: [{ name: "WINNIIO AB", url: "https://winniio.io" }],
  creator: "WINNIIO AB",
  publisher: "WINNIIO AB",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_EU",
    url: siteUrl,
    siteName: "S.M.I.L.E.",
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    creator: "@winniio_io",
  },
  alternates: { canonical: siteUrl },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
