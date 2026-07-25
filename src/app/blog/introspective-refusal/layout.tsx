import type { Metadata } from "next";

const title = "Do Language Models Know When They'll Refuse?";
const description =
  "Probing introspective awareness of safety boundaries across frontier models: 3,754 datapoints on whether models can predict their own refusals.";

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
