import Link from "next/link";
import { Fragment } from "react";
import { paragraphs } from "./essay";

const linkClass = "underline underline-offset-4 decoration-zanah/30 hover:text-zanah transition-colors";

const illustrations: Record<number, {
  src: string; alt: string; width: number; height: number;
  caption: string; source: string; credit: string;
}> = {
  2: {
    src: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1092790/ss_7bfe728822807d232398df1cb1a5d64addd3d8fb.1920x1080.jpg?t=1768517864",
    alt: "The Trapper holding a cleaver beneath the words PLEASE. CONSIDER ME PELTS!",
    width: 1920, height: 1079,
    caption: "The Trapper making his case.",
    source: "https://store.steampowered.com/app/1092790/Inscryption/",
    credit: "Official screenshot / Steam",
  },
  8: {
    src: "https://b3313143.smushcdn.com/3313143/wp-content/uploads/2023/09/Inscryption-Screen-1.jpg?lossy=2&strip=1&webp=1",
    alt: "Five spear-carrying survivors surround a creature card at the campfire, with dialogue describing a survivor wiping drool from their mouth.",
    width: 1280, height: 720,
    caption: "The campfire survivors.",
    source: "https://explosionnetwork.com/inscryption-review/",
    credit: "Explosion Network",
  },
  13: {
    src: "https://www.dazeland.com/images/PC-consoles/Inscryption-8.jpg",
    alt: "Eight Grizzly cards fill both opposing rows beneath Leshy’s red eyes, with scissors visible beside the board.",
    width: 1920, height: 1080,
    caption: "Eight bears, with scissors on the right. The French dialogue reads ‘Too fast, too soon.’",
    source: "https://www.dazeland.com/en/PC-consoles/Inscryption.html",
    credit: "Dazeland",
  },
};

export default function Inscryption() {
  return (
    <main className="min-h-screen bg-black animate-fade-in">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-16 py-8 bg-gradient-to-b from-black via-black/80 to-transparent">
        <Link href="/blog" className="text-zanah/50 font-scp text-sm hover:text-zanah transition-colors">
          &larr; back
        </Link>
      </nav>

      <article className="max-w-2xl mx-auto px-8 sm:px-12 pt-32 pb-16">
        <header className="mb-12">
          <p className="text-zanah/40 font-scp text-xs tracking-widest mb-6">
            ongoing · started <time dateTime="2026-10-06">Oct 6, 2026</time>
          </p>
          <h1 className="dot-text text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis mb-6">
            I fucking hate the trader
          </h1>
          <p className="text-zanah/50 font-scp text-sm leading-relaxed">
            Spoilers for Inscryption&apos;s cabin, including the boons and deathcards.
          </p>
        </header>

        {paragraphs.map((paragraph, index) => (
          <Fragment key={index}>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed mb-8">
              {index === 5 ? (
                <>
                  This is what reminded me of <a href="https://gwern.net/backstop" className={linkClass}>Gwern&apos;s <em>Evolution as Backstop for Reinforcement Learning</em></a>, which <Link href="/blog/optimizing-for-reality" className={linkClass}>I wrote about before</Link>{paragraph.slice(paragraph.indexOf(": intermediate"))}
                </>
              ) : paragraph}
            </p>
            {illustrations[index] && (
              <figure className="my-12 sm:-mx-8">
                <a href={illustrations[index].source} target="_blank" rel="noopener noreferrer" aria-label={`Image source: ${illustrations[index].credit}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={illustrations[index].src}
                    alt={illustrations[index].alt}
                    width={illustrations[index].width}
                    height={illustrations[index].height}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption className="mt-3 text-zanah/40 font-scp text-xs leading-relaxed">
                  {illustrations[index].caption}{" "}
                  <a href={illustrations[index].source} className={linkClass} target="_blank" rel="noopener noreferrer">{illustrations[index].credit}</a>
                </figcaption>
              </figure>
            )}
          </Fragment>
        ))}

        <aside className="border-t border-zanah/10 pt-8 mt-12 text-zanah/50 font-scp text-xs leading-relaxed">
          <p>
            Reading: <a className={linkClass} href="https://gwern.net/backstop">Evolution as Backstop for Reinforcement Learning</a>, Gwern Branwen.
          </p>
        </aside>
      </article>

      <footer className="px-8 sm:px-12 py-6">
        <div className="max-w-xl mx-auto flex justify-between items-center text-zanah/30 font-scp text-xs">
          <p>Tanay Gondil</p>
          <a href="https://www.linkedin.com/in/tgondil/" target="_blank" rel="noopener noreferrer" className="hover:text-zanah transition-colors">linkedin</a>
        </div>
      </footer>
    </main>
  );
}
