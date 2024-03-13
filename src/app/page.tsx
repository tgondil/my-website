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

export default function Home() {
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
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

  const scrollContact = () => {
    window.scrollTo({ top: 2*window.innerHeight, behavior: "smooth" });
  }

  const copy = () => {
    navigator.clipboard.writeText("gondil.tanay@gmail.com");
    toast.success("Email copied to clipboard!");
  }

  

  return (
    <NextUIProvider>
      <main className="flex overscroll-none flex-col  w-full  min-h-screen ">
        <div className="flex flex-col h-screen bg-[url('/calvin2.jpg')] bg-cover bg-center">
          <div className=" flex  justify-end gap-12 text-xl animate-intro-unhide font-semibold pt-8 w-full mb-8">
            <h1 id="home" className=" gradient text-zanah font-roboto cursor-pointer">
              {"<"}home{">"}
            </h1>
            <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} onClick={scrollProject} className=" cursor-pointer text-zanah nav-link hover:gradient font-roboto">
              {"<"}projects{">"}
            </h1>
            <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} onClick={scrollContact} className=" mr-10 text-zanah cursor-pointer hover:gradient font-roboto">
              {"<"}about{">"}
            </h1>
          </div>
          <div className="flex mt-44 min-h-screen flex-col items-center animate-slide-right ">
            <h1 className="text-1.1e  animate-slide-right tracking-wide text-zanah leading-hero font-invis">
              Hey, my name is
            </h1>
            <h1 className="text-1.2e gradient tracking-wide text-zanah leading-hero font-invis">
              Tanay Gondil
            </h1>

            {visible ? (
              <div className="font-scp pt-5 gradient text-xl animate-intro-unhide">
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
              <div className="scroll cursor-pointer" onClick={scrollProject}></div>
            </div>
            
          </div>
        </div>
        <Projects></Projects>
              

        <div id="after" className="h-screen flex flex-col items-center bg-[url('/calvin.jpg')] bg-cover bg-center ">
          <div className="text-1.3e gradient tracking-wide text-zanah leading-hero font-cs pt-6">
            <h1>
              About Me
            </h1>
          </div>
    <div className="flex text-center pt-8 mx-10 flex-col w-3/5 tracking-wide gap-4 text-zanah font-bold leading-extra-loose text-xl font-cv justify-center items-center">

    <h1>
    I&#39;m a full-stack developer and ML/AI engineer, currently a sophomore at Purdue University, dedicated to obtaining a degree in Computer Science.
    </h1>
    <h1>
I&#39;m also the President of <span className="text-my-green">Hack the Future</span>, Purdue's biggest web development club, where we build websites for local non-profits. Before becoming president, I led a team of 10 to build a billing website for the YWCA, a non-profit based in West Lafayette.
    </h1>
    <h1>
    Feel free to reach out to me through Email, or Linkedin.
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
  );
}
