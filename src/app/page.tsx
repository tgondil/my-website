"use client";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Projects from "./components/projects";
import GithubActivity from "./components/github-activity";
import NextLink from "next/link";
import { BiLogoGmail } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { SiDevpost, SiGooglescholar } from "react-icons/si";
import { FaGithubSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from "react";
import {Link} from 'react-scroll';
import Halftone from "./components/halftone";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const myRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const scrollContact = () => {
    document.getElementById("after")!.scrollIntoView({behavior: 'smooth'});
  }

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText("gondil.tanay@gmail.com").then(
        () => toast.success("Email copied to clipboard!"),
        () => { window.location.href = "mailto:gondil.tanay@gmail.com"; }
      );
    } else {
      window.location.href = "mailto:gondil.tanay@gmail.com";
    }
  }


  return (
    <>
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
    <link rel="preload" as="image" href="/real2.webp" media="(max-width: 639px)" />
    <link rel="preload" as="image" href="/calvin2.webp" media="(min-width: 640px)" />
    <link rel="preload" as="image" href="/mobilestars.webp" media="(max-width: 639px)" />
    <link rel="preload" as="image" href="/stars.webp" media="(min-width: 640px)" />
    <link rel="preload" as="image" href="/real6.webp" media="(max-width: 639px)" />
    <link rel="preload" as="image" href="/calvin.webp" media="(min-width: 640px)" />
    <NextUIProvider>
      <main className={`flex overscroll-none flex-col min-h-screen ${isTransitioning ? 'animate-fade-to-black' : ''}`}>
        <div className="relative flex flex-col h-mobile sm:h-screen overflow-hidden">
          <div
            id="hero-dots"
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          >
            <Halftone src="/calvin2.webp" mobileSrc="/real2.webp" cell={5} detail realSubjects align="center" mobileAlign="top" className="absolute inset-0" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          {/* Mobile Nav */}
          <div className="relative z-20 sm:hidden px-6 pt-6 pb-2 text-sm flex justify-center gap-7 font-medium w-full">
            <Link to="projects" spy={true} smooth={true} duration={500}>
              <h1 className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}work{">"}
              </h1>
            </Link>
            <a onClick={handleBlogClick} href="/blog">
              <h1 className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}blog{">"}
              </h1>
            </a>
            <Link to="after" spy={true} smooth={true} duration={500}>
              <h1 className="text-zanah cursor-pointer hover:gradient font-roboto transition-all">
                {"<"}about{">"}
              </h1>
            </Link>
          </div>
          {/* Desktop Nav */}
          <div className="relative z-20 hidden sm:flex justify-end gap-10 text-sm lg:text-base font-medium pt-8 w-full mb-8">
            <h1 id="home" className="gradient text-zanah font-roboto cursor-pointer">
              {"<"}home{">"}
            </h1>
            <Link to="projects" spy={true} smooth={true} duration={500}>
              <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}things I&apos;ve built{">"}
              </h1>
            </Link>
            <a onClick={handleBlogClick} href="/blog">
              <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className="cursor-pointer text-zanah hover:gradient font-roboto transition-all">
                {"<"}blog{">"}
              </h1>
            </a>
            <Link to="after" spy={true} smooth={true} duration={500}>
              <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className="mr-10 text-zanah cursor-pointer hover:gradient font-roboto transition-all">
                {"<"}about{">"}
              </h1>
            </Link>
          </div>
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 pb-12 sm:pb-16">
            <h1 className="dot-text text-3xl sm:text-4xl lg:text-5xl tracking-wide text-zanah leading-hero font-invis text-center">
              Hey, my name is
            </h1>
            <h1 className="dot-text text-5xl pt-3 sm:pt-2 sm:text-6xl lg:text-7xl gradient tracking-wide text-zanah leading-hero font-invis text-center">
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

            <div className="flex w-full gap-5 sm:gap-5 pt-7 sm:pt-8 text-zanah justify-center text-4xl sm:text-4xl lg:text-5xl">
              <a target="_blank" href="https://devpost.com/tgondil?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"><SiDevpost className="hover:animate-pop cursor-pointer transition-all"></SiDevpost></a>
              <a target="_blank" href="https://www.linkedin.com/in/tgondil/"><FaLinkedin className="hover:animate-pop cursor-pointer transition-all"></FaLinkedin></a>
              <GithubActivity>
                <a target="_blank" href="https://github.com/tgondil"><FaGithubSquare className="hover:animate-pop cursor-pointer transition-all" /></a>
              </GithubActivity>
              <a target="_blank" href="https://scholar.google.com/citations?user=a9sDq0gAAAAJ&hl=en"><SiGooglescholar className="hover:animate-pop cursor-pointer transition-all" /></a>
              <a target="_blank" href="https://x.com/tanaygondil"><FaXTwitter className="hover:animate-pop cursor-pointer transition-all" /></a>
              <a onClick={copy} className="cursor-pointer"><MdEmail className="hover:animate-pop transition-all" /></a>
            </div>
          </div>

          <button onClick={scrollProject} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 animate-other-bounce cursor-pointer">
            <span className="font-scp text-xs text-zanah/40 hover:text-zanah transition-all">↓ scroll</span>
          </button>
        </div>
        <div ref = {myRef} id="projects">
        <Projects about={'after'} scrollY={scrollY}></Projects>
        </div>


        <div id="after" className="relative h-mobile sm:h-screen flex flex-col overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              transform: `translateY(${(scrollY - (typeof window !== 'undefined' ? document.getElementById('after')?.offsetTop || 0 : 0)) * 0.5}px)`,
              willChange: 'transform'
            }}
          >
            <Halftone src="/calvin.webp" mobileSrc="/real6.webp" cell={5} detail realSubjects align="center" mobileAlign="bottom" className="absolute inset-0" />
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

            <Toaster
              position="bottom-center"
              reverseOrder={false}
            />
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
    </NextUIProvider>
    </>
  );
}
