import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisScroll from "@/components/SmoothScroll";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jal Jagran - Water Scarcity Awareness & Resource Hub",
  description:
    "An initiative by the Government of India to raise awareness about water scarcity and provide guides and tutorials on water conservation techniques.",
  keywords: [
    "water scarcity",
    "water conservation",
    "India",
    "Government of India",
    "Jal Jagran",
    "water resources",
    "water-saving tips",
  ],
  authors: [{ name: "Ministry of Jal Shakti, Government of India" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  applicationName: "Jal Jagran - Water Conservation",
  manifest: "/manifest.json",
  openGraph: {
    title: "Jal Jagran - Water Scarcity Awareness & Resource Hub",
    description:
      "Learn about water scarcity and discover resources to conserve water. Join the Government of India's efforts in safeguarding our water resources.",
    url: "https://jaljagran.gov.in",
    siteName: "Jal Jagran",
    images: [
      {
        url: "https://jaljagran.gov.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Water Scarcity Awareness - Jal Jagran",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@jaljagran",
    title: "Jal Jagran - Water Scarcity Awareness",
    description:
      "Join the movement to conserve water and learn how you can make a difference. Visit our platform for guides, tutorials, and resources.",
    images: ["https://jaljagran.gov.in/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://jaljagran.gov.in/",
    languages: {
      "en-IN": "https://jaljagran.gov.in/en",
    },
  },
  other: {
    charset: "UTF-8",
    refresh: "1300",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "black",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LenisScroll>
          <main>{children}</main>
        </LenisScroll>
      </body>
    </html>
  );
}
