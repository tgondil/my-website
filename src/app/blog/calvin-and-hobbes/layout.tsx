import type { Metadata } from "next";

const title = "What Calvin and Hobbes Taught Me About Saying Goodbye";
const description =
  "What Calvin and Hobbes taught me about saying goodbye before learning to say hello.";

export const metadata: Metadata = {
  title: `${title} | Tanay Gondil`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: ["/calvin.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
