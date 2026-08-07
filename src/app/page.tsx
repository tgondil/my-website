"use client";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import Projects from "./components/projects";
import GithubActivity from "./components/github-activity";
import { MdEmail } from "react-icons/md";
import { SiDevpost, SiGooglescholar, SiLetterboxd } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { FaGoodreads } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useRef } from "react";
import Halftone from "./components/halftone";
import { useRouter } from "next/navigation";
import MusicToggle from "./components/music-toggle";

export default function Home() {
  const router = useRouter();
  const myRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLDivElement | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);
  const afterParallaxRef = useRef<HTMLDivElement | null>(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let animationFrame = 0;
    let projectsTop = 0;
    let afterTop = 0;
    let projectsLayer: HTMLElement | null = null;

    const updateParallax = () => {
      animationFrame = 0;
      const scrollY = window.scrollY;
      const heroParallaxY = scrollY * 0.5;
      heroSectionRef.current?.style.setProperty(
        "--hero-parallax-y",
        `${heroParallaxY}px`,
      );
      if (projectsLayer) {
        projectsLayer.style.transform = `translate3d(0, ${(scrollY - projectsTop) * 0.5}px, 0)`;
      }
      if (afterParallaxRef.current) {
        afterParallaxRef.current.style.transform = `translate3d(0, ${(scrollY - afterTop) * 0.5}px, 0)`;
      }
    };

    const scheduleParallax = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    const measure = () => {
      projectsLayer = myRef.current?.querySelector<HTMLElement>("[data-projects-parallax]") ?? null;
      projectsTop = myRef.current?.offsetTop ?? 0;
      afterTop = afterRef.current?.offsetTop ?? 0;
      scheduleParallax();
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    if (myRef.current) resizeObserver.observe(myRef.current);
    if (afterRef.current) resizeObserver.observe(afterRef.current);
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/blog');
    }, 300);
  };

  const isHovered = (event: any) => {
    (event.target as Element).classList.add("gradient");
    document.getElementById("home")?.classList.remove("gradient");
  };

  const unHovered = (event: any) => {
    (event.target as Element).classList.remove("gradient");
    document.getElementById("home")?.classList.add("gradient");
  };

  const scrollProject = () => {
    //document.getElementById("projects")!.scrollIntoView({behavior: 'smooth'});
    
    myRef.current?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  const scrollAbout = () => afterRef.current?.scrollIntoView({ behavior: "smooth" });

  const copy = async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText("gondil.tanay@gmail.com");
        setEmailCopied(true);
        window.setTimeout(() => setEmailCopied(false), 1800);
      } catch {
        window.location.href = "mailto:gondil.tanay@gmail.com";
      }
    } else {
      window.location.href = "mailto:gondil.tanay@gmail.com";
    }
  }


  return (
    <>
    <link rel="preload" as="image" href="/real2.webp" media="(max-width: 639px)" />
    <link rel="preload" as="image" href="/calvin2.webp" media="(min-width: 640px)" />
      <main className={`flex overscroll-none flex-col min-h-screen ${isTransitioning ? 'animate-fade-to-black' : ''}`}>
        <div ref={heroSectionRef} className="relative flex flex-col h-mobile sm:h-screen overflow-hidden">
          <div
            id="hero-dots"
            className="hero-parallax-layer parallax-layer absolute inset-0"
          >
            <Halftone src="/calvin2.webp" mobileSrc="/real2.webp" cell={5} detail realSubjects audioReactive deferMs={0} align="center" mobileAlign="top" className="absolute inset-0" />
          </div>
          <div
            id="music-star-layer"
            className="hero-parallax-layer pointer-events-none absolute inset-0 z-30"
          />
          <MusicToggle />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          {/* Mobile Nav */}
          <div className="relative z-20 sm:hidden px-6 pt-6 pb-2 text-sm flex justify-center gap-7 font-medium w-full">
            <button type="button" onClick={scrollProject}>
              <span className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}work{">"}
              </span>
            </button>
            <a onClick={handleBlogClick} href="/blog">
              <span className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}blog{">"}
              </span>
            </a>
            <button type="button" onClick={scrollAbout}>
              <span className="text-zanah cursor-pointer hover:gradient font-roboto transition-all">
                {"<"}about{">"}
              </span>
            </button>
          </div>
          {/* Desktop Nav */}
          <div className="relative z-20 hidden sm:flex justify-end gap-10 text-sm lg:text-base font-medium pt-8 w-full mb-8">
            <h1 id="home" className="gradient text-zanah font-roboto cursor-pointer">
              {"<"}home{">"}
            </h1>
            <button type="button" onClick={scrollProject}>
              <span onMouseEnter={isHovered} onMouseLeave={unHovered} className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}things I&apos;ve built{">"}
              </span>
            </button>
            <a onClick={handleBlogClick} href="/blog">
              <span onMouseEnter={isHovered} onMouseLeave={unHovered} className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}blog{">"}
              </span>
            </a>
            <button type="button" onClick={scrollAbout}>
              <span onMouseEnter={isHovered} onMouseLeave={unHovered} className="mr-10 text-zanah cursor-pointer hover:gradient font-roboto transition-all">
                {"<"}about{">"}
              </span>
            </button>
          </div>
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pb-12 sm:pb-16">
            <h1 className="dot-text text-3xl sm:text-4xl lg:text-5xl tracking-wide text-zanah leading-hero font-invis text-center">
              Hey, my name is
            </h1>
            <h1 className="dot-text text-5xl pt-3 sm:pt-2 sm:text-6xl lg:text-7xl gradient gradient-static tracking-wide text-zanah leading-hero font-invis text-center">
              Tanay Gondil
            </h1>

            <div className="pt-5 sm:pt-5 text-center max-w-md">
              <p className="font-scp text-zanah/60 text-sm sm:text-lg italic leading-relaxed">
                &quot;There&apos;s never enough time to do all the nothing you want.&quot;
              </p>
              <p className="font-scp text-zanah/40 text-xs sm:text-sm mt-2">
                — Bill Watterson
              </p>
            </div>

            <div className="flex w-full justify-between gap-0 pt-7 text-3xl text-zanah sm:justify-center sm:gap-5 sm:pt-8 sm:text-4xl lg:text-5xl">
              <a aria-label="Devpost" target="_blank" href="https://devpost.com/tgondil?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"><SiDevpost className="hover:animate-pop cursor-pointer transition-all"></SiDevpost></a>
              <a aria-label="LinkedIn" target="_blank" href="https://www.linkedin.com/in/tgondil/"><FaLinkedin className="hover:animate-pop cursor-pointer transition-all"></FaLinkedin></a>
              <GithubActivity>
                <a aria-label="GitHub" target="_blank" href="https://github.com/tgondil"><FaGithubSquare className="hover:animate-pop cursor-pointer transition-all" /></a>
              </GithubActivity>
              <a aria-label="Google Scholar" target="_blank" href="https://scholar.google.com/citations?user=a9sDq0gAAAAJ&hl=en"><SiGooglescholar className="hover:animate-pop cursor-pointer transition-all" /></a>
              <a target="_blank" rel="noopener noreferrer" aria-label="Letterboxd" title="Letterboxd" href="https://letterboxd.com/t4nay/"><SiLetterboxd className="hover:animate-pop cursor-pointer transition-all" /></a>
              <a target="_blank" rel="noopener noreferrer" aria-label="Goodreads" title="Goodreads" href="https://www.goodreads.com/user/show/199645657-tanay"><FaGoodreads className="hover:animate-pop cursor-pointer transition-all" /></a>
              <a aria-label="X" target="_blank" href="https://x.com/tanaygondil"><FaXTwitter className="hover:animate-pop cursor-pointer transition-all" /></a>
              <button type="button" aria-label="Copy email address" onClick={copy} className="cursor-pointer"><MdEmail className="hover:animate-pop transition-all" /></button>
            </div>
          </div>

          <button onClick={scrollProject} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 animate-other-bounce cursor-pointer">
            <span className="font-scp text-xs text-zanah/40 hover:text-zanah transition-all">↓ scroll</span>
          </button>
        </div>
        <div ref = {myRef} id="projects">
        <Projects />
        </div>


        <div ref={afterRef} id="after" className="relative h-mobile sm:h-screen flex flex-col overflow-hidden">
          <div
            ref={afterParallaxRef}
            className="parallax-layer absolute inset-0"
          >
            <Halftone src="/calvin.webp" mobileSrc="/real6.webp" cell={5} detail realSubjects audioReactive preview align="center" mobileAlign="bottom" className="absolute inset-0" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-t from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>

          <div className="relative z-20 flex flex-col w-full px-6 sm:px-16 lg:px-24 pt-10 sm:pt-16 flex-shrink-0">
            <h1 className="dot-text text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold gradient text-center mb-6 sm:mb-10 leading-snug font-invis">
              I build systems that help people grow, and I try to raise the ceiling for what students can do.
            </h1>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 text-sm sm:text-lg md:text-xl text-left text-zanah leading-relaxed font-cv max-w-6xl mx-auto">
              <div className="flex-1 flex flex-col gap-3 sm:gap-5">
                <p>
                  At Purdue, I teach <span className="text-my-green font-bold">CS390</span> as the sole instructor of record, designing a full-stack curriculum from the ground up and guiding students through building production-grade apps.
                </p>

                <p>
                  I lead <span className="text-my-green font-bold">Hack the Future</span>, a club that builds software for non-profits across the world. I turned <span className="text-my-yellow font-bold">Hello World</span>, the smallest hackathon at Purdue, into the biggest hackathon in Purdue history.
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-3 sm:gap-5">
                <p>
                  Previously, I was on the founding team at <span className="text-my-blue font-bold">Crater</span>, and before that I interned at <span className="text-my-blue font-bold">Capital One</span>.
                </p>

                <p>
                  I&#39;ve won top prizes at Berkeley, UW and Purdue hackathons, and presented at <span className="text-my-pink font-bold">NeurIPS</span>, the largest AI conference in the world.
                </p>

                <p className="text-zanah/70 italic">
                  Build things that matter, create environments where people can grow fast, and push the limits of what&#39;s possible.
                </p>
              </div>
            </div>

          </div>

          {/* Spacer fills remaining height so Calvin (via bg-bottom) sits below the text */}
          <div className="relative z-20 flex-1" />

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-20 py-6 px-8 sm:px-16">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <p className="text-zanah/30 font-scp text-xs">
                Tanay Gondil
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/tgondil" target="_blank" className="text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
                  github
                </a>
                <a href="/feed.xml" className="text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
                  rss
                </a>
                <a href="https://www.linkedin.com/in/tgondil/" target="_blank" className="text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
                  linkedin
                </a>
              </div>
            </div>
          </div>
      </div>

      </main>
      {emailCopied && (
        <div role="status" className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg border border-zanah/15 bg-black/90 px-4 py-2 font-scp text-xs text-zanah shadow-xl">
          Email copied to clipboard
        </div>
      )}
    </>
  );
}
