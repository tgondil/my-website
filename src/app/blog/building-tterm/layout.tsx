import type { Metadata } from "next";

const title = "The Only Window I Need";
const description =
  "I spent my evenings this year building tterm, a terminal made for one person, shaped around one problem: the attention I spend verifying the model.";

export const metadata: Metadata = {
  title: `${title} | Tanay Gondil`,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    images: ["/blog/tterm-rows.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
