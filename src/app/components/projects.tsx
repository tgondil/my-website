import React from 'react'
import Link from 'next/link'
import Halftone from './halftone'

type Project = {
  name: string;
  logo: string;
  logoAlt: string;
  desc: string;
  href: string;
  linkText: string;
  award: string;
};

const featured: Project = {
  name: "tterm",
  logo: "/project-logos/tterm.webp",
  logoAlt: "tterm logo",
  desc: "A terminal built for working with AI agents. Every project gets a row with its own Claude Code session, file explorer, and a real embedded browser.",
  href: "https://tterm.sh",
  linkText: "tterm.sh",
  award: "#11 on product hunt",
};

const projects: Project[] = [
  {
    name: "Artemis",
    logo: "/project-logos/artemis.webp",
    logoAlt: "artemis logo",
    desc: "A cognitive-state monitoring & workspace orchestration tool using eye-tracking, browser telemetry, and environment control.",
    href: "https://www.youtube.com/watch?v=9Qgm1yPk9os",
    linkText: "watch demo",
    award: "1st place · dubhacks '25",
  },
  {
    name: "Iris",
    logo: "/project-logos/iris.webp",
    logoAlt: "iris logo",
    desc: "A hands-free web-interface system with real-time eye tracking, voice commands, and AI agent control, built for users with paralysis or anyone in hands-free situations.",
    href: "https://www.youtube.com/watch?v=T3Psh8Hm7so",
    linkText: "watch demo",
    award: "2nd place · calhacks '25",
  },
  {
    name: "CS390 Course Platform",
    logo: "/project-logos/cs390.webp",
    logoAlt: "cs390 logo",
    desc: "A fully custom course platform built from scratch for the class I teach at Purdue. Interactive assignments, real-time grading, and student progress tracking.",
    href: "https://github.com/tgondil/cs390-wap",
    linkText: "github",
    award: "sole instructor · purdue",
  },
  {
    name: "SignBridge",
    logo: "/project-logos/signbridge.webp",
    logoAlt: "signbridge logo",
    desc: "An AI-powered system translating American Sign Language into text and speech in real time, with lip-syncing and personalized voice generation.",
    href: "https://devpost.com/software/signbridge",
    linkText: "devpost",
    award: "best use of auth0 · boilermake xii",
  },
  {
    name: "StaySafePurdue",
    logo: "/project-logos/safe.webp",
    logoAlt: "staysafepurdue logo",
    desc: "A safety app for Purdue students that scrapes Purdue Police archives to find the safest walking routes to a destination.",
    href: "https://github.com/AashiAgarw/StaySafePurdue",
    linkText: "github",
    award: "2nd place · hello world '22",
  },
];

const posts = [
  {
    title: "The Perfect Murder Mystery",
    href: "/blog/roger-ackroyd",
    category: "reading",
    categoryColor: "text-my-green/80",
    date: "jul 21, 2026",
  },
  {
    title: "The Only Window I Need",
    href: "/blog/building-tterm",
    category: "building",
    categoryColor: "text-my-blue/80",
    date: "jul 8, 2026",
  },
  {
    title: "The Most Dangerous Thing You Can Optimize For",
    href: "/blog/optimizing-for-reality",
    category: "thoughts",
    categoryColor: "text-my-yellow/80",
    date: "may 6, 2026",
  },
];

export default function Projects() {
  return (
    <div id='projects' className="relative w-full overflow-hidden">
          <div
            data-projects-parallax
            className="parallax-layer absolute -top-40 -bottom-40 left-0 right-0"
          >
            <Halftone src="/stars.webp" mobileSrc="/mobilestars.webp" cell={4} fit="tile" floor={0} gamma={0.7} boost={1.2} lift={1.15} audioReactive className="absolute inset-0" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-t from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>

          <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-24 flex flex-col gap-8">

            <div className="w-full flex flex-col items-center justify-center gap-3 mb-2">
              <p className="text-zanah/40 font-scp text-xs sm:text-sm tracking-widest uppercase">
                some of my favorite
              </p>
              <h1 className="dot-text text-4xl sm:text-5xl lg:text-6xl gradient tracking-tight font-invis">
                Things I&apos;ve built
              </h1>
            </div>

            {/* Featured: tterm */}
            <div
              onClick={() => window.open(featured.href)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-my-grey border border-zanah/10 px-6 py-6 sm:px-8 sm:py-7 transition-all duration-300 hover:-translate-y-1 hover:border-zanah/25"
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={featured.logo} alt={featured.logoAlt} width="80" height="80" loading="lazy" decoding="async" className="w-10 h-10 rounded-lg shrink-0" />
                <h2 className="text-xl sm:text-2xl gradient font-bold">{featured.name}</h2>
              </div>
              <p className="text-zanah/80 text-sm sm:text-base leading-relaxed max-w-3xl mb-4">
                {featured.desc}
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-scp text-[10px] sm:text-xs text-zanah/35">{featured.award}</p>
                <p className="font-scp text-xs sm:text-sm text-zanah/50 group-hover:text-zanah whitespace-nowrap transition-all">
                  {featured.linkText} <span className="inline-block group-hover:translate-x-1 transition-transform">&#8599;</span>
                </p>
              </div>
            </div>

            {/* The rest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((p) => (
                <div
                  key={p.name}
                  onClick={() => window.open(p.href)}
                  className="group relative cursor-pointer overflow-hidden flex flex-col rounded-xl bg-my-grey border border-zanah/10 px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-zanah/25"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-black/30 flex items-center justify-center overflow-hidden">
                      <img src={p.logo} alt={p.logoAlt} width="80" height="80" loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
                    </div>
                    <h2 className="text-base sm:text-lg gradient font-bold leading-tight">{p.name}</h2>
                  </div>
                  <p className="text-zanah/70 text-xs sm:text-sm leading-relaxed flex-1">
                    {p.desc}
                  </p>
                  <div className="flex items-center justify-between gap-3 mt-4">
                    <p className="font-scp text-[10px] text-zanah/35">{p.award}</p>
                    <p className="font-scp text-xs text-zanah/50 group-hover:text-zanah whitespace-nowrap transition-all">
                      {p.linkText} <span className="inline-block group-hover:translate-x-1 transition-transform">&#8599;</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent writing — same sky, quieter corner */}
            <div className="max-w-2xl w-full mx-auto flex flex-col mt-14">
              <div className="flex flex-col items-center gap-3 mb-6">
                <p className="text-zanah/40 font-scp text-xs sm:text-sm tracking-widest uppercase">
                  and some things i&apos;ve been thinking about
                </p>
              </div>
              {posts.map((post) => (
                <Link key={post.href} href={post.href} className="group block">
                  <div className="py-5 border-b border-zanah/10 hover:border-zanah/30 transition-all flex items-baseline justify-between gap-4">
                    <h2 className="text-base sm:text-lg text-zanah font-cv group-hover:gradient transition-all">{post.title}</h2>
                    <p className="text-zanah/40 font-scp text-xs whitespace-nowrap"><span className={post.categoryColor}>{post.category}</span> · {post.date}</p>
                  </div>
                </Link>
              ))}
              <Link href="/blog" className="self-end mt-5">
                <span className="font-scp text-xs text-zanah/50 hover:text-zanah transition-all">all posts →</span>
              </Link>
            </div>

          </div>
        </div>
  )
}
