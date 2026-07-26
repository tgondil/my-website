"use client";
import React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

function Spoiler({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      onClick={() => setOpen(true)}
      title={open ? undefined : "spoiler, click to reveal"}
      className={open ? "" : "blur-sm cursor-pointer select-none"}
    >
      {children}
    </span>
  );
}

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
            <h1 className="dot-text text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis mb-6">
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
              className="group flex items-center gap-6 text-left max-w-lg mx-auto cursor-pointer"
            >
              <img
                src="/blog/calvin-spoilers.webp"
                alt="Calvin, clutching Hobbes: HE SPOILS ALL THE GOOD PARTS TOO! HE YELLS OUT WHAT'S HAPPENING WHILE HE'S READING!"
                className="w-28 sm:w-36 shrink-0"
              />
              <span className="text-base sm:text-lg text-zanah/60 group-hover:text-zanah font-cv leading-relaxed transition-all">
                This has spoilers. If you haven&apos;t read the book, you will regret not reading it first for the rest of your life, because you will never forget the killer.
              </span>
            </button>
          </div>
          )}

          {revealed && (
          <div className="animate-fade-in">

          <p className={pClass}>
            <em>The Murder of Roger Ackroyd</em> is my favorite mystery novel ever, and it just turned a hundred years old. The setup is as generic as the genre gets. There&apos;s a rich man dead in his study, a super gossipy village, for whatever reason Hercule Poirot has retired next door growing vegetables, and we&apos;ve got the local doctor, Dr. Sheppard, narrating the case (a doctor narrating a detective, where have I heard that before?).
          </p>

          <p className={pClass}>
            BUT THE DOCTOR DID IT. He was blackmailing the woman who dies on page one. The murder happens in chapter four of the book he&apos;s writing. And throughout his account, he never lies once. He tells you the letter came at twenty to nine. He also tells you he left at ten to nine, having done &ldquo;the little there was to be done&rdquo;. Both statements were completely true. The murder is inside that sentence. But everyone still read right past it.
          </p>

          <p className={pClass}>
            The ending&apos;s power isn&apos;t in revealing new clues, it&apos;s in reinterpreting the ones you&apos;ve already seen. By the last chapters you already have every single piece you need to solve the mystery: the missing ten minutes, the dead man&apos;s voice through a locked door. Poirot just tells you what they meant.
          </p>

          <p className={pClass}>
            Funnily enough, people in 1926 called it cheating. But Christie didn&apos;t break any rules, she broke an assumption nobody had ever said out loud: you suspect everyone in a detective story except the person telling it. Sheppard never had to earn the reader&apos;s trust, the reader just gave it away for free since the very beginning.
          </p>

          <p className={pClass}>
            Another great point: Sheppard was writing the book as the record of the great Poirot&apos;s failure, to be published once the murder went unsolved. But when Poirot corners him, he writes one last chapter, overdoses, and the trophy becomes the confession. THE BOOK IS EVIDENCE INSIDE ITS OWN PLOT. Poirot did not need that ego boost.
          </p>

          <p className={pClass}>
            A lot of people have copied the unreliable narrator since. But few have done it this cleanly. The ones that come closest for me are <Spoiler><em>Andhadhun</em> and <em>The Usual Suspects</em>, and they earn the comparison because they run the same con: the person telling you the story is the person the story is protecting</Spoiler>. And nobody can ever do it like Christie did, because it needed readers who had never suspected a narrator before, and she converted all of them in one book. DAMN YOU AGATHA CHRISTIE. We all check now. This book is why we check.
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
