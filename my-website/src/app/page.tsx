"use client";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { ReactTyped } from "react-typed";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function Home() {
  const [Visible, setVisible] = useState(true);
  const hide = () => setVisible(false);
  return (
    <NextUIProvider>
      <main className="flex overscroll-none flex-col  w-full  min-h-screen ">
        <div className="flex flex-col h-screen bg-[url('/calvin2.jpg')] bg-cover bg-center">
          <div className=" flex  justify-end gap-12 text-xl animate-intro-unhide font-semibold pt-8 w-full mb-8">
            <h1 className=" gradient text-zanah font-roboto">
              {"<"}home{">"}
            </h1>
            <h1 className="text-zanah font-roboto">
              {"<"}projects{">"}
            </h1>
            <h1 className=" mr-10 text-zanah font-roboto">
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

            {Visible ? (
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
              <FaInstagram className="hover:animate-pop hover:text-6xl"></FaInstagram>
              <FaLinkedin className="hover:animate-pop hover:text-6xl"></FaLinkedin>
              <FaGithubSquare className="hover:animate-pop hover:text-6xl" />
            </div>
            <div className="field pt-16 animate-intro-unhide">
              <div className="scroll"></div>
            </div>
          </div>
        </div>
        <div className="w-full h-screen flex flex-col bg-[url('/stars.jpg')] pt-10">
          <div className="h-screen w-full bg-contain bg-center flex flex-col gap-14 items-center ">
            <div className="w-full flex text-1e tracking-wide text-zanah leading-hero items-center justify-center font-invis">
            <h1 >
              Take a look at some of my 
            </h1>
            <div className="animate-other-bounce pl-5">
            <h1 className="gradient text-1.1e ">
              projects!
            </h1>
            </div>
            
            </div>
            
            <div className="h-2/6 w-full flex">
            <div className=" w-3/6 flex justify-center items-center">
              <Card
                className="w-[400px] h-full hover:animate-minipop bg-my-grey bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      Investagram
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-3/6 flex justify-center items-center">
              <Card
                className="w-[400px] h-full hover:animate-minipop bg-my-grey bg-cover bg-center "
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      realer.app
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-3/6 flex hover:animate-minipop justify-center items-center">
              <Card
                className="w-[400px] h-full bg-my-grey bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      YWCA Billing
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            </div>
            <div className="h-2/6 w-full flex">
            <div className=" w-3/6 flex justify-center items-center">
              <Card
                className="w-[400px] h-full bg-my-grey hover:animate-minipop bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      Investagram
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-3/6 flex justify-center items-center">
              <Card
                className="w-[400px] h-full bg-my-grey hover:animate-minipop bg-cover bg-center "
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      realer.app
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-3/6 flex justify-center items-center">
              <Card
                className="w-[400px] h-full bg-my-grey hover:animate-minipop bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      YWCA Billing
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    Make beautiful websites regardless of your design
                    experience.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            </div>
          </div>
        </div>

        <div className="h-screen bg-[url('/calvin.jpg')] bg-cover bg-center "></div>
        {/*<div className="flex pt-20 flex-col w-2/5 tracking-wide gap-10 text-zanah font-medium leading-extra-loose text-3xl font-invis justify-center items-center">
    A sophomore at Purdue University
  </div>
    <div className="flex pt-20 mx-10 flex-col w-3/5 tracking-wide gap-10 text-zanah font-medium leading-extra-loose text-2.3v font-invis justify-center items-center">
    <h1>
    When I initially made the decision to attend college in the US, I was uncertain about which major to pursue. Eventually, I chose to explore Computer Science, and as time passed, my passion for the subject grew immensely. During my freshman year, I took part in my first hackathon, and even though I had limited coding experience, my team and I secured the 2nd position. With the burst of motivation I got through placing at this hackathon, I decided to explore the subject beyond the bounds of the syllabus.
    </h1>
    <h1>
    Looking ahead to the present day, I am an aspiring full-stack developer and currently a sophomore at Purdue University, dedicated to obtaining a degree in Computer Science. In my free time, I love to read, code, hit the gym, and watch the UFC.
    </h1>
      </div>*/}
      </main>
    </NextUIProvider>
  );
}
