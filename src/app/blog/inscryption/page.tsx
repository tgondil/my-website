import Link from "next/link";
import "./inscryption.css";
import { Fragment } from "react";
import { paragraphs } from "./essay";
import { CabinRoute } from "./cabin-route";
import { chapters } from "./cabin-chapters";

const linkClass = "cabin-link";

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
    <main className="inscryption-page">
      <div className="cabin-room" aria-hidden="true" />
      <div className="cabin-grain" aria-hidden="true" />
      <nav className="cabin-nav">
        <Link href="/blog">&larr; leave the cabin</Link>
        <span>INSCRYPTION / ACT I</span>
      </nav>
      <div className="cabin-intro">
        <div className="cabin-watcher" aria-hidden="true"><i /><i /></div>
        <p className="cabin-eyebrow">notes from the cabin</p>
        <h1>I fucking hate<br />the trader</h1>
        <div className="cabin-hand" aria-label="Geck and Wolf from my seventh archived run">
          <div className="cabin-table-slots" aria-hidden="true"><i /><i /><i /><i /></div>
          <SaveCard creature="geck" name="Geck" attack="1" health="1" rare />
          <SaveCard creature="wolf" name="Wolf" attack="6" health="4" />
        </div>
        <p className="cabin-deck-caption">two cards from my seventh run</p>
      </div>
      <CabinRoute />
      <article className="cabin-manuscript">
        <header className="cabin-preface">
          <p className="cabin-status">ongoing · started <time dateTime="2026-10-06">Oct 6, 2026</time></p>
          <p>Spoilers for the cabin, including the boons and deathcards.</p>
        </header>

        {paragraphs.map((paragraph, index) => {
          const chapter = chapters.find(chapter => chapter.paragraph === index);
          return (
          <Fragment key={index}>
            {chapter && (
              <div id={chapter.id} className="cabin-encounter" aria-label={chapter.label}>
                <span />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/blog/inscryption/${chapter.icon}.png`} alt="" width={49} height={49} />
                <span />
              </div>
            )}
            <p className="cabin-paragraph">
              {index === 5 ? (
                <>
                  This is what reminded me of <a href="https://gwern.net/backstop" className={linkClass}>Gwern&apos;s <em>Evolution as Backstop for Reinforcement Learning</em></a>, which <Link href="/blog/optimizing-for-reality" className={linkClass}>I wrote about before</Link>{paragraph.slice(paragraph.indexOf(": intermediate"))}
                </>
              ) : paragraph}
            </p>
            {index === 28 && <figure className="cabin-boons">
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/blog/inscryption/trial_ring.png" alt="The Trial of the Ring card" width={125} height={190} loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/blog/inscryption/boon_tutordraw.png" alt="The Magpie’s Eye boon, which lets me choose a card when drawing" width={125} height={190} loading="lazy" />
              </div>
              <figcaption className="cabin-caption">The Trial of the Ring and the Magpie’s Eye.</figcaption>
            </figure>}
            {illustrations[index] && (
              <figure className="cabin-figure">
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
                <figcaption className="cabin-caption">
                  {illustrations[index].caption}{" "}
                  <a href={illustrations[index].source} className={linkClass} target="_blank" rel="noopener noreferrer">{illustrations[index].credit}</a>
                </figcaption>
              </figure>
            )}
          </Fragment>
          );
        })}

        <aside className="cabin-colophon">
          <p>
            Reading: <a className={linkClass} href="https://gwern.net/backstop">Evolution as Backstop for Reinforcement Learning</a>, Gwern Branwen.
          </p>
          <p className="cabin-credit">Game artwork and textures from Inscryption, by Daniel Mullins Games. Cabin imagery from the <a className={linkClass} href="https://store.steampowered.com/app/1092790/Inscryption/">official screenshots</a>.</p>
        </aside>
      </article>

      <footer className="cabin-footer"><Link href="/blog">&larr; back to the essays</Link><p>Tanay Gondil</p></footer>
    </main>
  );
}

function SaveCard({ creature, name, attack, health, rare = false }: { creature: string; name: string; attack: string; health: string; rare?: boolean }) {
  return <div className={`cabin-card ${rare ? "cabin-card-rare" : ""}`}>
    <span className="cabin-card-name">{name}</span>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img className="cabin-portrait" src={`/blog/inscryption/portrait_${creature}.png`} alt="" />
    {rare && <div className="cabin-sigils">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/blog/inscryption/ability_drawcopyondeath.png" alt="Unkillable" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/blog/inscryption/ability_splitstrike.png" alt="Bifurcated Strike" />
    </div>}
    <span className="cabin-attack">{attack}</span><span className="cabin-health">{health}</span>
  </div>;
}
