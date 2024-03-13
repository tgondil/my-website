"use client";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import Projects from "./components/projects";


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
            <h1 onMouseEnter={isHovered} onMouseLeave={unHovered} className=" mr-10 text-zanah cursor-pointer hover:gradient font-roboto">
              {"<"}contact{">"}
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
              <FaInstagram className="hover:animate-pop hover:text-6xl cursor-pointer"></FaInstagram>
              <FaLinkedin className="hover:animate-pop hover:text-6xl cursor-pointer"></FaLinkedin>
              <FaGithubSquare className="hover:animate-pop hover:text-6xl cursor-pointer" />
            </div>
            <div className="field pt-16 animate-intro-unhide">
              <div className="scroll cursor-pointer" onClick={scrollProject}></div>
            </div>
          </div>
        </div>
        <Projects></Projects>

        <div id="after" className="h-screen flex flex-col items-center bg-[url('/calvin.jpg')] bg-cover bg-center ">
          <div className="text-1.1e gradient  tracking-wide text-zanah leading-hero font-invis pt-20">
            <h1>
              About Me
            </h1>
          </div>
    <div className="flex pt-8 mx-10 flex-col w-3/5 tracking-wide gap-10 text-zanah font-medium leading-extra-loose text-2.3v font-invis justify-center items-center">

    <h1>
    I'm a full-stack developer and ML/AI engineer, currently a sophomore at Purdue University, dedicated to obtaining a degree in Computer Science. In my free time, I love to read crime novels, hit the gym, and watch the UFC.
    </h1>
    <h1>
I'm also the President of <span className="text-my-green">Hack the Future</span>, a web development club, where we build websites for local non-profits. Before becoming president, I led a team of 10 to build a billing website for the YWCA, a non-profit based in West Lafayette.
    </h1>
    <div className="flex w-full gap-5  text-zanah justify-center text-6xl">
              <FaInstagram className="hover:animate-pop hover:text-6xl cursor-pointer"></FaInstagram>
              <FaLinkedin className="hover:animate-pop hover:text-6xl cursor-pointer"></FaLinkedin>
              <FaGithubSquare className="hover:animate-pop hover:text-6xl cursor-pointer" />
            </div>
      </div>
      </div>
      </main>
    </NextUIProvider>
  );
}
