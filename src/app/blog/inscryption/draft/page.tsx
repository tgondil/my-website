import type { Metadata } from "next";
import InscryptionEssay from "../essay-view";

export const metadata: Metadata = {
  title: "Let your cards be eaten — strategy draft | Tanay Gondil",
  description: "A deeper draft on Inscryption’s campfires, draw probabilities, sacrifice loops, and solving the bear wall.",
  robots: { index: false, follow: false },
  openGraph: { title: "Let your cards be eaten — strategy draft", description: "A deeper draft on Inscryption strategy and the mathematics of a run." },
};

export default function StrategyDraft() { return <InscryptionEssay draft />; }
