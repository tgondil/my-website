"use client";
import React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function RogerAckroyd() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/blog');
    }, 300);
  };

  const pClass = "text-base sm:text-lg text-zanah/80 font-cv leading-relaxed mb-10";

  return (
    <>
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
    <NextUIProvider>
      <main className={`flex overscroll-none flex-col min-h-screen animate-fade-in bg-black ${isTransitioning ? 'animate-fade-to-black' : ''}`}>

        {/* Fixed navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-16 py-8 bg-gradient-to-b from-black via-black/80 to-transparent">
          <a onClick={handleBackClick} href="/blog" className="cursor-pointer inline-block">
            <span className="text-zanah/50 font-scp text-sm hover:text-zanah transition-all">
              &larr; back
            </span>
          </a>
        </nav>

        {/* Content */}
        <article className="max-w-2xl mx-auto px-8 sm:px-12 pt-32 pb-24">

          {/* Header */}
          <header className="mb-16">
            <p className="text-zanah/40 font-scp text-xs tracking-widest mb-6">
              Jul 21, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis mb-6">
              The <span className="gradient">Perfect</span> Murder Mystery
            </h1>
            <p className="text-base sm:text-lg text-zanah/50 font-scp leading-relaxed">
              It&apos;s <em>The Murder of Roger Ackroyd</em> by Agatha Christie.
            </p>
          </header>

          {/* Seal */}
          {!revealed && (
          <div className="text-center py-12">
            <button
              onClick={() => setRevealed(true)}
              className="text-base sm:text-lg text-zanah/60 hover:text-zanah font-cv leading-relaxed max-w-md mx-auto cursor-pointer transition-all"
            >
              This has spoilers. If you haven&apos;t read the book, you will regret not reading it first for the rest of your life, because you will never forget the killer.
            </button>
          </div>
          )}

          {revealed && (
          <div className="animate-fade-in">

          <p className={pClass}>
            <em>The Murder of Roger Ackroyd</em> is my favorite mystery novel ever, and it just turned a hundred. The setup is as stock as the genre gets: rich man dead in his study, gossipy village, Poirot retired next door growing vegetables, and the local doctor narrating the case (a doctor narrating a detective, where have I heard that before).
          </p>

          <p className={pClass}>
            BUT HE DID IT. The doctor was blackmailing the woman who dies on page one. The murder happens in chapter four of the book he&apos;s writing. And he never lies once. He tells you the letter came at twenty to nine. He tells you he left at ten to nine, having done the little there was to be done. Both true. The murder is inside that sentence. You read right past it.
          </p>

          <p className={pClass}>
            The ending tells you nothing new. By the last chapters you already have every piece, the missing ten minutes, the dead man&apos;s voice through a locked door. Poirot just tells you what they meant.
          </p>

          <p className={pClass}>
            People in 1926 called it cheating. But there&apos;s no lie to point at. Christie didn&apos;t break a rule, she broke an assumption nobody had ever said out loud: you suspect everyone in a detective story except the person telling it. Sheppard never earned that trust. You gave it away on page one like you always do.
          </p>

          <p className={pClass}>
            And the manuscript itself: Sheppard was writing it as the record of the great Poirot&apos;s failure, to be published once the murder went unsolved. A trophy. Poirot corners him, he writes one last chapter, takes an overdose, and the trophy becomes the confession. THE BOOK IS EVIDENCE INSIDE ITS OWN PLOT.
          </p>

          <p className={pClass}>
            Everyone has copied the unreliable narrator since. Nobody has done it this clean, and nobody can, because it needed readers who had never suspected a narrator before, and it converted all of them in one book. We all check now. This book is why we check.
          </p>

          {/* Reading */}
          <section className="border-t border-zanah/10 pt-12">
            <p className="text-zanah/40 font-scp text-xs mb-4">
              Reading
            </p>
            <p className="text-zanah/60 font-scp text-sm leading-relaxed">
              Agatha Christie, <em>The Murder of Roger Ackroyd</em> (1926).
            </p>
          </section>

          </div>
          )}

        </article>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 py-6 px-8 sm:px-16 z-30 pointer-events-none">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <p className="text-zanah/30 font-scp text-xs">
              Tanay Gondil
            </p>
            <a href="https://www.linkedin.com/in/tgondil/" target="_blank" className="pointer-events-auto text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
              linkedin
            </a>
          </div>
        </div>

      </main>
    </NextUIProvider>
    </>
  );
}
