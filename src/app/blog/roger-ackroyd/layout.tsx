import type { Metadata } from "next";

const title = "The Perfect Murder Mystery";
const description = "It's The Murder of Roger Ackroyd by Agatha Christie.";

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
