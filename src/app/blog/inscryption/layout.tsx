import type { Metadata } from "next";

const title = "I fucking hate the trader";
const description = "How I play Inscryption: farming teeth, burning cards, building a Geck engine, and preparing for eight bears with scissors and five damage.";

export const metadata: Metadata = {
  title: `${title} | Tanay Gondil`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    publishedTime: "2026-10-06",
    images: ["/stars.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
