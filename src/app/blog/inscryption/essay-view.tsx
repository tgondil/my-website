import Link from "next/link";
import "./inscryption.css";
import { Fragment } from "react";
import { paragraphs } from "./essay";
import { CabinRoute } from "./cabin-route";
import { chapters as publishedChapters } from "./cabin-chapters";
import { draftParagraphs, draftChapters, draftSources, draftMath } from "./strategy-draft";

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

export default function InscryptionEssay({ draft = false }: { draft?: boolean }) {
  const text = draft ? draftParagraphs : paragraphs;
  const chapters = draft ? draftChapters : publishedChapters;
  const pictures = draft ? { 16: illustrations[2], 7: illustrations[8], 11: illustrations[13] } as typeof illustrations : illustrations;
  const sourceNotes: Record<number, number> = { 6: 0, 18: 1, 25: 3, 24: 2, 26: 4 };
  return (
    <main className="inscryption-page">
      <div className="cabin-room" aria-hidden="true" />
      <div className="cabin-grain" aria-hidden="true" />
      <nav className="cabin-nav">
        <Link href="/blog" target="_blank" rel="noopener noreferrer">&larr; leave the cabin</Link>
        <span>INSCRYPTION / ACT I</span>
      </nav>
      <div className="cabin-intro">
        <div className="cabin-watcher" aria-hidden="true"><i /><i /></div>
        <h1>Let your cards<br />be eaten</h1>
        <div className="cabin-hand" aria-label="Geck and Wolf cards">
          <div className="cabin-table-slots" aria-hidden="true"><i /><i /><i /><i /></div>
          <SaveCard creature="geck" name="Geck" attack="1" health="1" rare />
          <SaveCard creature="wolf" name="Wolf" attack="6" health="4" />
        </div>
      </div>
      <CabinRoute chapters={chapters} />
      <article className="cabin-manuscript">
        <header className="cabin-preface">
          <p className="cabin-status">{draft ? <>strategy draft · <time dateTime="2026-11-06">Nov 6, 2026</time> · <Link href="/blog/inscryption" target="_blank" rel="noopener noreferrer">current essay</Link></> : <>ongoing · started <time dateTime="2026-10-06">Oct 6, 2026</time></>}</p>
          <p>Spoilers for the cabin, including the boons and deathcards.</p>
        </header>

        {text.map((paragraph, index) => {
          const chapter = chapters.find(chapter => chapter.paragraph === index);
          const figure = pictures[index];
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
              {!draft && index === 5 ? (
                <>
                  This is what reminded me of <a href="https://gwern.net/backstop" className={linkClass} target="_blank" rel="noopener noreferrer">Gwern&apos;s <em>Evolution as Backstop for Reinforcement Learning</em></a>, which <Link href="/blog/optimizing-for-reality" className={linkClass} target="_blank" rel="noopener noreferrer">I wrote about before</Link>{paragraph.slice(paragraph.indexOf(": intermediate"))}
                </>
              ) : draft ? <DraftText text={paragraph} /> : paragraph}
              {draft && sourceNotes[index] !== undefined && <sup className="cabin-source-note"><a href={draftSources[sourceNotes[index]].href} aria-label={draftSources[sourceNotes[index]].label} target="_blank" rel="noopener noreferrer">[{sourceNotes[index] + 1}]</a></sup>}
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
            {figure && (
              <figure className="cabin-figure">
                <a href={figure.source} target="_blank" rel="noopener noreferrer" aria-label={`Image source: ${figure.credit}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={figure.src}
                    alt={figure.alt}
                    width={figure.width}
                    height={figure.height}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
                <figcaption className="cabin-caption">
                  {figure.caption}{" "}
                  <a href={figure.source} className={linkClass} target="_blank" rel="noopener noreferrer">{figure.credit}</a>
                </figcaption>
              </figure>
            )}
          </Fragment>
          );
        })}

        <aside className="cabin-colophon">
          {draft && <>
            <p className="cabin-credit">Examples concern the original cabin, Act I, rather than Kaycee’s Mod.</p>
            <details className="cabin-draft-sources"><summary>Mechanics &amp; sources</summary><ol>{draftSources.map((source, i) => <li key={source.href}>[{i + 1}] <a className={linkClass} href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a></li>)}</ol></details>
          </>}
          <p>
            Reading: <a className={linkClass} href="https://gwern.net/backstop" target="_blank" rel="noopener noreferrer">Evolution as Backstop for Reinforcement Learning</a>, Gwern Branwen.
          </p>
          <p className="cabin-credit">Game artwork and textures from Inscryption, by Daniel Mullins Games. Cabin imagery from the <a className={linkClass} href="https://store.steampowered.com/app/1092790/Inscryption/" target="_blank" rel="noopener noreferrer">official screenshots</a>.</p>
        </aside>
      </article>

      <footer className="cabin-footer"><Link href="/blog" target="_blank" rel="noopener noreferrer">&larr; back to the essays</Link><p>Tanay Gondil</p></footer>
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

function DraftText({ text }: { text: string }) {
  const pattern = new RegExp(`(${draftMath.map(value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return <>{text.split(pattern).map((part, index) => draftMath.includes(part) ? <span key={index} className="cabin-inline-calculation">{part}</span> : part)}</>;
}
