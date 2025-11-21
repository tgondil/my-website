"use client";
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Projects from "./components/projects";
import { BiLogoGmail } from "react-icons/bi";
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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        <div className="relative flex flex-col h-mobile sm:h-screen overflow-hidden">
          <div 
            className="absolute inset-0 bg-[url('/real2.png')] sm:bg-[url('/calvin2.jpg')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              willChange: 'transform'
            }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          <div className="relative z-20 pl-6 invisible sm:visible sm:pl-0 text-sm flex gap-3 sm:justify-end sm:gap-12 sm:text-responsive-xl lg:text-responsive-2xl animate-intro-unhide font-semibold  sm:pt-8 w-full mb-8">
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
          <div className="relative z-20 pt-20 flex h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)] flex-col items-center justify-center animate-slide-right py-8">
            <div className="flex flex-col items-center justify-center flex-grow">
              <h1 className="text-4xl sm:text-1.1e animate-slide-right tracking-wide text-zanah leading-hero font-invis">
                Hey, my name is
              </h1>
              <h1 className="text-6xl pt-3 sm:pt-2 sm:text-1.2e gradient tracking-wide text-zanah leading-hero font-invis">
                Tanay Gondil
              </h1>

              {visible ? (
                <div className="font-scp pt-4 sm:pt-5 gradient text-2xl sm:text-responsive-2xl animate-intro-unhide">
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

              <div className="flex w-full gap-4 sm:gap-5 pt-6 sm:pt-8 text-zanah justify-center text-5xl sm:text-4xl md:text-5xl lg:text-6xl">
                <a target="_blank" href="https://devpost.com/tgondil?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"><SiDevpost className="hover:animate-pop cursor-pointer transition-all"></SiDevpost></a>
                <a target="_blank" href="https://www.linkedin.com/in/tgondil/"><FaLinkedin className="hover:animate-pop cursor-pointer transition-all"></FaLinkedin></a>
                <a target="blank" href="https://github.com/tgondil"><FaGithubSquare className="hover:animate-pop cursor-pointer transition-all" /></a>
              </div>
            </div>
            

            
          </div>
          
        </div>
        <div ref = {myRef} id="projects">
        <Projects about={'after'} scrollY={scrollY}></Projects>
        </div>
              

        <div id="after" className="relative h-screen flex flex-col items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-[url('/real6.png')] sm:bg-[url('/calvin.jpg')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${(scrollY - (typeof window !== 'undefined' ? document.getElementById('after')?.offsetTop || 0 : 0)) * 0.5}px)`,
              willChange: 'transform'
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-t from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          
    <div className="relative z-20 flex flex-col w-full px-8 sm:px-16 lg:px-24 pt-12 sm:pt-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient text-center mb-10 sm:mb-12 leading-tight font-invis">
        I build systems that help people grow, and I try to raise the ceiling for what students can do.
      </h1>
      
       <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 text-lg sm:text-xl md:text-2xl text-left text-zanah leading-loose font-cv max-w-7xl mx-auto">
         <div className="flex-1 flex flex-col gap-5">
           <p>
             At Purdue, I teach <span className="text-my-green font-bold">CS390</span> as the sole instructor of record, designing a full-stack curriculum from the ground up and guiding students through building production-grade apps.
           </p>
           
           <p>
             I lead <span className="text-my-green font-bold">Hack the Future</span>, Purdue&#39;s competitive software development club, where we doubled our applicant pool and shipped more real-world software than any year before. I turned <span className="text-my-yellow font-bold">Hello World</span>, the smallest hackathon at Purdue into the biggest hackathon in Purdue history, bringing hundreds of students together around building, learning, and ambition.
           </p>
         </div>
         
         <div className="flex-1 flex flex-col gap-5">
           <p>
             I&#39;m a founding engineer at <span className="text-my-blue font-bold">Crater</span>, helping shape the product and engineering foundation of the company.
           </p>
           
           <p>
             I&#39;ve won top prizes at Berkeley, UW and Purdue hackathons, and I&#39;m presenting this year at <span className="text-my-pink font-bold">NeurIPS</span>, the largest AI conference in the world.
           </p>
           
           <p className="italic">
             Across everything I do, the goal is the same: build things that matter, create environments where people can grow fast, and push the limits of what&#39;s possible as a student engineer.
           </p>
         </div>
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
