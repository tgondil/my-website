import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tanay Gondil",
  description: "Essays on building, reading, and research.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
