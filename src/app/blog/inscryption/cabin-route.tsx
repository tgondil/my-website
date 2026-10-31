"use client";

import { useEffect, useRef, useState } from "react";

import { chapters } from "./cabin-chapters";

export function CabinRoute() {
  const [active, setActive] = useState(chapters[0].id);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = nav.current?.closest(".inscryption-page") as HTMLElement | null;
    const stops = chapters.map(chapter => document.getElementById(chapter.id));
    let frame = 0;
    function update() {
      frame = 0;
      let current = chapters[0].id;
      stops.forEach((stop, index) => {
        if (stop && stop.getBoundingClientRect().top < window.innerHeight * 0.4) current = chapters[index].id;
      });
      setActive(current);
      if (root) root.dataset.chapter = current;
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (root) delete root.dataset.chapter;
    };
  }, []);
  return <nav ref={nav} className="cabin-route" aria-label="Route through the essay">
    <span className="cabin-route-title">the route</span>
    <ol>{chapters.map(chapter => <li key={chapter.id}>
      <a href={`#${chapter.id}`} aria-label={chapter.label} aria-current={active === chapter.id ? "location" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/blog/inscryption/${chapter.icon}.png`} alt="" width={36} height={36} />
        <span>{chapter.label}</span>
      </a>
    </li>)}</ol>
  </nav>;
}
