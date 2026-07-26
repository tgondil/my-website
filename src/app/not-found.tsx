import Link from "next/link";
import Halftone from "./components/halftone";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center px-8 gap-8 overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <Halftone src="/stars.webp" mobileSrc="/mobilestars.webp" cell={4} fit="tile" floor={0} gamma={0.7} boost={1.2} lift={1.15} className="absolute inset-0" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="dot-text text-7xl sm:text-9xl gradient font-invis">404</h1>
        <p className="text-zanah/60 font-cv text-base sm:text-lg max-w-sm leading-relaxed">
          This page went exploring and never came back.
        </p>
        <Link
          href="/"
          className="font-scp text-sm text-zanah/50 hover:text-zanah border-b border-zanah/20 hover:border-zanah pb-0.5 transition-all"
        >
          let&apos;s go home
        </Link>
      </div>
    </main>
  );
}
