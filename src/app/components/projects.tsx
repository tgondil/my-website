import React from 'react'

type Project = {
  name: string;
  logo: string;
  logoAlt: string;
  desc: string;
  href: string;
  linkText: string;
  award: string;
  art: string;
  artColor: string;
};

const TTERM_ART = String.raw`┌────────────────────┐
│ ~ $ tterm          │
│                    │
│ > row: my-website  │
│ > claude: working  │
│ > browser: open    │
│ █                  │
└────────────────────┘`;

const ARTEMIS_ART = String.raw`  _/\_      _/\_
_/    \_/\_/    \_
 focus [#####---]`;

const IRIS_ART = String.raw`   .--"""--.
  /  .---.  \
 |  ( (o) )  |
  \  '---'  /
   '--...--'`;

const CS390_ART = String.raw` ________________
| $ teach(cs390) |
| > no slides    |
| > all code     |
|________________|`;

const SIGNBRIDGE_ART = String.raw`      __________
 ____/          \____
 |  |  |  |  |  |  |
~~~~~~~~~~~~~~~~~~~~~`;

const STAYSAFE_ART = String.raw` [A]--.
       \
    .---'
    |
    '--> [B] safe`;

const featured: Project = {
  name: "tterm",
  logo: "./tterm.png",
  logoAlt: "tterm logo",
  desc: "A terminal built for working with AI agents. Every project gets a row with its own Claude Code session, file explorer, and a real embedded browser.",
  href: "https://tterm.sh",
  linkText: "tterm.sh",
  award: "#11 on product hunt",
  art: TTERM_ART,
  artColor: "text-my-green/30",
};

const projects: Project[] = [
  {
    name: "Artemis",
    logo: "./artemis.png",
    logoAlt: "artemis logo",
    desc: "A cognitive-state monitoring & workspace orchestration tool using eye-tracking, browser telemetry, and environment control.",
    href: "https://www.youtube.com/watch?v=9Qgm1yPk9os",
    linkText: "watch demo",
    award: "1st place · dubhacks '25",
    art: ARTEMIS_ART,
    artColor: "text-my-green/25",
  },
  {
    name: "Iris",
    logo: "./iris.png",
    logoAlt: "iris logo",
    desc: "A hands-free web-interface system with real-time eye tracking, voice commands, and AI agent control, built for users with paralysis or anyone in hands-free situations.",
    href: "https://www.youtube.com/watch?v=T3Psh8Hm7so",
    linkText: "watch demo",
    award: "2nd place · calhacks '25",
    art: IRIS_ART,
    artColor: "text-my-blue/25",
  },
  {
    name: "CS390 Course Platform",
    logo: "./cs390.png",
    logoAlt: "cs390 logo",
    desc: "A fully custom course platform built from scratch for the class I teach at Purdue. Interactive assignments, real-time grading, and student progress tracking.",
    href: "https://github.com/tgondil/cs390-wap",
    linkText: "github",
    award: "sole instructor · purdue",
    art: CS390_ART,
    artColor: "text-my-pink/25",
  },
  {
    name: "SignBridge",
    logo: "./signbridge.png",
    logoAlt: "signbridge logo",
    desc: "An AI-powered system translating American Sign Language into text and speech in real time, with lip-syncing and personalized voice generation.",
    href: "https://devpost.com/software/signbridge",
    linkText: "devpost",
    award: "best use of auth0 · boilermake xii",
    art: SIGNBRIDGE_ART,
    artColor: "text-my-yellow/25",
  },
  {
    name: "StaySafePurdue",
    logo: "./safe.png",
    logoAlt: "staysafepurdue logo",
    desc: "A safety app for Purdue students that scrapes Purdue Police archives to find the safest walking routes to a destination.",
    href: "https://github.com/AashiAgarw/StaySafePurdue",
    linkText: "github",
    award: "2nd place · hello world '22",
    art: STAYSAFE_ART,
    artColor: "text-my-green/25",
  },
];

export default function Projects({about, scrollY}: {about: any, scrollY: number}) {
  const projectsOffset = typeof window !== 'undefined' ? document.getElementById('projects')?.offsetTop || 0 : 0;

  return (
    <div id='projects' className="relative w-full overflow-hidden">
          <div
            className="absolute -top-40 -bottom-40 left-0 right-0 bg-[url('/mobilestars.webp')] sm:bg-[url('/stars.webp')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${(scrollY - projectsOffset) * 0.5}px)`,
              willChange: 'transform'
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-t from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>

          <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 py-20 sm:py-24 flex flex-col gap-8">

            <div className="w-full flex flex-col items-center justify-center gap-3 mb-2">
              <p className="text-zanah/40 font-scp text-xs sm:text-sm tracking-widest">
                ~ $ ls some-of-my-favorites/
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl gradient tracking-tight font-invis">
                Things I&apos;ve built
              </h1>
            </div>

            {/* Featured: tterm */}
            <div
              onClick={() => window.open(featured.href)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-my-grey border border-zanah/10 px-6 py-6 sm:px-8 sm:py-7 transition-all duration-300 hover:-translate-y-1 hover:border-zanah/25"
            >
              <div className="flex items-center gap-6">
                <div className="flex-1 relative">
                  <div className="flex items-center gap-3 mb-2">
                    <img src={featured.logo} alt={featured.logoAlt} className="w-10 h-10 rounded-lg shrink-0" />
                    <h3 className="text-xl sm:text-2xl gradient font-bold">{featured.name}</h3>
                  </div>
                  <p className="text-zanah/80 text-sm sm:text-base leading-relaxed max-w-2xl mb-4">
                    {featured.desc}
                  </p>
                  <div className="flex items-center justify-between gap-3 max-w-2xl">
                    <p className="font-scp text-[10px] sm:text-xs text-zanah/35">{featured.award}</p>
                    <p className="font-scp text-xs sm:text-sm text-zanah/50 group-hover:text-zanah whitespace-nowrap transition-all">
                      {featured.linkText} <span className="inline-block group-hover:translate-x-1 transition-transform">&#8599;</span>
                    </p>
                  </div>
                </div>
                <pre className={`hidden lg:block font-scp text-[11px] leading-[1.25] ${featured.artColor} pointer-events-none select-none whitespace-pre shrink-0`}>
                  {featured.art}
                </pre>
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
                  <pre className={`absolute top-3 right-3 font-scp text-[9px] leading-[1.2] ${p.artColor} pointer-events-none select-none whitespace-pre`}>
                    {p.art}
                  </pre>
                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-black/30 flex items-center justify-center overflow-hidden">
                        <img src={p.logo} alt={p.logoAlt} className="max-w-full max-h-full object-contain" />
                      </div>
                      <h3 className="text-base sm:text-lg gradient font-bold leading-tight">{p.name}</h3>
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
                </div>
              ))}
            </div>

          </div>
        </div>
  )
}
