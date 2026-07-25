import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Cursor from "./components/cursor";
import Analytics from "./components/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://tanaygondil.com"),
  title: "Tanay Gondil | Full Stack Developer and ML/AI Engineer",
  description:
    "Hi, I'm Tanay. I make specialized tools that make life easier for people, and I really enjoy it.",
  openGraph: {
    siteName: "Tanay Gondil",
    type: "website",
    images: ["/stars.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://tanaygondil.com/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Cursor />
        <Analytics />
        {children}
        <script
          data-goatcounter="https://tanaygondil.goatcounter.com/count"
          async
          src="https://gc.zgo.at/count.js"
        ></script>
      </body>
    </html>
  );
}
