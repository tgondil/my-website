import type { Metadata } from "next";

const title = "The Most Dangerous Thing You Can Optimize For";
const description =
  "Gwern's \"Evolution as Backstop for Reinforcement Learning,\" explained the way I'd explain it to myself: proxies, backstops, and what happens when you optimize the measure instead of the thing.";

export const metadata: Metadata = {
  title: `${title} | Tanay Gondil`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: ["/stars.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
