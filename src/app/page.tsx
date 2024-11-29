"use client";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Projects from "./components/projects";
import { BiLogoGmail } from "react-icons/bi";
import { SiMicrosoftoutlook } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { SiDevpost } from "react-icons/si";
import toast, { Toaster } from 'react-hot-toast';
import { useRef } from "react";
import Head from "next/head";
import {Link} from 'react-scroll';
export default function Home() {
  
  const myRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const hide = () => setVisible(false);
  const [hovered, setHovered] = useState(true);
  const isHovered = (event:any) => {
    (event.target as Element).classList.add("gradient");
    document.getElementById("home")?.classList.remove("gradient");
  };

  const unHovered = (event:any) => {
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
    navigator.clipboard.writeText("gondil.tanay@gmail.com");
    toast.success("Email copied to clipboard!");
  }


  return (
    <>
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script> 
    <Head>
    <title>Tanay Gondil | Full Stack Developer and ML/AI Engineer</title>
    <meta name="description" content="Hi, I'm Tanay. I make specialized tools that make life easier for people, and I really enjoy it." />
    <link rel="icon" type="image/png" href="./icon.png"></link>
    </Head>
    <NextUIProvider>
      <main className="flex overscroll-none flex-col min-h-screen ">
        <div className="flex flex-col h-mobile sm:h-screen bg-[url('/real2.png')] sm:bg-[url('/calvin2.jpg')] bg-cover bg-center">
          <div className=" pl-6 invisible sm:visible sm:pl-0 text-sm flex gap-3 sm:justify-end sm:gap-12 sm:text-xl animate-intro-unhide font-semibold  sm:pt-8 w-full mb-8">
            <h1 id="home" className=" gradient text-zanah font-roboto cursor-pointer">
              {"<"}home{">"}
            </h1>
            <Link to="projects" 
      spy={true} 
      smooth={true} 
      duration={500}>
            <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className=" cursor-pointer text-zanah nav-link hover:gradient font-roboto">
              {"<"}projects{">"}
            </h1>
            </Link>
            <Link to="after" 
      spy={true} 
      smooth={true} 
      duration={500}>
            
            
            <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className=" mr-10 text-zanah cursor-pointer hover:gradient font-roboto">
              {"<"}about{">"}
            </h1>
            </Link>
          </div>
          <div className="flex mt-44 min-h-screen flex-col items-center animate-slide-right ">
            <h1 className="sm:text-1.1e  animate-slide-right tracking-wide text-zanah leading-hero font-invis">
              Hey, my name is
            </h1>
            <h1 className="text-2.3w pt-5 sm:pt-0 sm:text-1.2e gradient tracking-wide text-zanah leading-hero font-invis">
              Tanay Gondil
            </h1>

            {visible ? (
              <div className="font-scp pt-5 gradient sm:text-xl animate-intro-unhide">
                <ReactTyped
                  strings={[
                    "I'm a developer",
                    "I'm an innovator",
                    "I'm a learner",
                    "I'm a creator",
                    "I can't wait for what's next!",
                  ]}
                  typeSpeed={100}
                  backSpeed={70}
                  showCursor={false}
                  //onComplete={hide}
                />{" "}
              </div>
            ) : null}

            <div className="flex w-full gap-5 pt-10 text-zanah justify-center text-6xl">
              <a target="_blank" href="https://devpost.com/tgondil?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"><SiDevpost className="hover:animate-pop hover:text-6xl cursor-pointer"></SiDevpost></a>
              <a target="_blank" href="https://www.linkedin.com/in/tgondil/"><FaLinkedin className="hover:animate-pop hover:text-6xl cursor-pointer"></FaLinkedin></a>
              <a target="blank" href="https://github.com/tgondil"><FaGithubSquare className="hover:animate-pop hover:text-6xl cursor-pointer" /></a>
            </div>
            <div className="field pt-16 animate-intro-unhide">
              <Link to="projects" 
      spy={true} 
      smooth={true} 
      duration={500}>
              <div className="scroll cursor-pointer"></div>
              </Link>
            </div>
            
          </div>
          
        </div>
        <div ref = {myRef} id="projects">
        <Projects about={'after'}></Projects>
        </div>
              

        <div id="after" className="h-screen flex flex-col items-center bg-[url('/real6.png')] sm:bg-[url('/calvin.jpg')] bg-cover bg-center ">
          <div className="text-5xl  sm:text-1.1e gradient tracking-wide text-zanah leading-hero font-invis sm:pt-16 pt-12">
            <h1>
              About Me
            </h1>
          </div>
    <div className="flex text-sm text-center sm:pt-8 mx-10 flex-col sm:w-3/5 tracking-wide gap-8 text-zanah sm:font-bold leading-relaxed sm:leading-extra-loose pt-6  font-cv justify-center text-s items-center sm:text-xl">

    <h1>
    I&#39;m a full-stack developer and ML/AI engineer, currently a junior at Purdue University, dedicated to obtaining a degree in Computer Science.
    </h1>
    <h1>
I&#39;m the President of <span className="text-my-green">Hack the Future</span>, Purdue&#39;s biggest web development club, where we build websites for non-profits across the US.
    </h1>
    <h1>
I&#39;m also the President of <span className="text-my-yellow">Hello World</span>, Purdue&#39;s biggest freshman-only hackathon, where over 400 freshmen build projects, expanding their horizons beyond what&#39;s taught in class :)
    </h1>
    <div className="flex w-full gap-5 pt-2 text-zanah justify-center text-6xl">
              <a onClick={copy}><MdEmail className="hover:animate-pop hover:text-6xl cursor-pointer"/></a>
              <a href="https://www.linkedin.com/in/tgondil/" target="blank"><FaLinkedin  className="hover:animate-pop hover:text-6xl cursor-pointer"></FaLinkedin></a>

            </div>
            <Toaster
  position="bottom-center"
  reverseOrder={false}
/>
      </div>
      </div>
      </main>
    </NextUIProvider>
    </>
  );
}
