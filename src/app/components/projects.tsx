import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
  } from "@nextui-org/react";
import toast from 'react-hot-toast';

export default function Projects({about, scrollY}: {about: any, scrollY: number}) {
  const scrollProject = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const scrollContact = () => {
    document.getElementById("after")?.scrollIntoView({behavior: 'smooth'});
  }
  
  const projectsOffset = typeof window !== 'undefined' ? document.getElementById('projects')?.offsetTop || 0 : 0;
  
  return (
    <div id='projects' className="relative w-full sm:h-screen flex flex-col overflow-hidden sm:pt-10">
          <div 
            className="absolute inset-0 bg-[url('/mobilestars.png')] sm:bg-[url('/stars.jpg')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${(scrollY - projectsOffset) * 0.5}px)`,
              willChange: 'transform'
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-t from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-10"></div>
          <div className="relative z-20 sm:h-screen w-full bg-contain bg-center flex flex-col gap-8 sm:pt-0 pt-8 items-center ">
            <div className="w-full text-responsive-4xl flex sm:text-1e tracking-wide text-zanah leading-hero sm:items-center justify-center font-invis">
            <h1 >
              Take a look at some of my 
            </h1>
            <div className="animate-other-bounce pl-1.5 sm:pl-5">
            <h1 className="gradient text-responsive-4xl sm:text-1.1e ">
              projects!
            </h1>
            </div>
            
            </div>
            
            <div className="h-5/6 sm:h-4/6 w-full flex flex-wrap gap-y-8">
            <div className="sm:h-1/2 sm:w-1/3 flex justify-center items-center">
              <Card
                className="w-4/5 h-full hover:animate-minipop bg-my-grey bg-cover bg-center"
                isPressable
                onClick={()=>{
                  window.open('https://www.youtube.com/watch?v=9Qgm1yPk9os')
                }}
              >
                <CardHeader className="flex gap-3 py-2">
                  <Image
                    alt="artemis logo"
                    height={40}
                    radius="sm"
                    src="./artemis.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      Artemis
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    A cognitive-state monitoring & workspace orchestration tool using eye-tracking, browser telemetry, and environment control. Won 1st Place on the biggest track at DubHacks &apos;25.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    href="https://www.youtube.com/watch?v=9Qgm1yPk9os"
                  >
                    View Demo
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-full sm:h-1/2 w-3/6 sm:w-1/3 flex justify-center items-center">
              <Card
                className="w-4/5 h-full bg-my-grey hover:animate-minipop bg-cover bg-center "
                isPressable
                onClick={()=>{
                  window.open('https://www.youtube.com/watch?v=T3Psh8Hm7so')
                }}
              >
                <CardHeader className="flex gap-2 py-2 items-center">
                  <Image
                    alt="iris logo"
                    height={20}
                    radius="sm"
                    src="./iris.png"
                    width={30}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      Iris
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    A hands-free web-interface system with real-time eye tracking, voice commands, and AI agent control. Built for users with paralysis or in hands-free situations, won 2nd Place on the Crater Track at CalHacks &apos;25.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    href="https://www.youtube.com/watch?v=T3Psh8Hm7so"
                  >
                    View Demo
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-1/2 w-full sm:w-1/3 sm:h-1/2 w-3/6 flex hover:animate-minipop justify-center items-center">
              <Card
              onClick={()=>{
                window.open('https://github.com/tgondil/cs390-wap')
              }}
                className="w-4/5  h-full bg-my-grey bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-2 py-2 items-center">
                  <Image
                    alt="cs390 logo"
                    height={10}
                    radius="sm"
                    src="./cs390.png"
                    width={60}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      CS390 Course Platform
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-2">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    A fully custom course platform built from scratch for the class I teach at Purdue. Features interactive assignments, real-time grading, and student progress tracking.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    href="https://github.com/tgondil/cs390-wap"
                  >
                    View on GitHub
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-1/2 w-full  sm:w-1/3 sm:h-1/2 flex justify-center items-center">
              <Card
                className="w-4/5 h-full bg-my-grey hover:animate-minipop bg-cover bg-center"
                isPressable
                onClick={()=>{
                  window.open('https://github.com/AashiAgarw/StaySafePurdue')
                }}
              >
                <CardHeader className="flex gap-3 py-2">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./safe.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      StaySafePurdue
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    A safety application for Purdue students, that scrapes data from the Purdue Police department archives to showcase the safest routes to a destination. Built using Python. Placed 2nd at Hello World 2022!
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    href="https://github.com/AashiAgarw/StaySafePurdue"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            
            <div className="h-1/2 w-full sm:h-1/2 sm:w-1/3 flex justify-center items-center">
              <Card
                className="w-4/5 h-full hover:animate-minipop bg-my-grey bg-cover bg-center "
                isPressable
                onClick={()=>{
                  window.open('https://devpost.com/software/signbridge')
                }}
              >
                <CardHeader className="flex gap-3 py-2">
                  <Image
                    alt="signbridge logo"
                    height={40}
                    radius="sm"
                    src="./signbridge.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      SignBridge
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    An AI-powered system translating American Sign Language (ASL) into text and speech in real time, with lip-syncing and personalized voice generation. Won &quot;Best Use of Auth0&quot; at BoilerMake XII.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    href="https://devpost.com/software/signbridge"
                  >
                    View on Devpost
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-1/2 w-full sm:h-1/2 sm:w-1/3 flex justify-center items-center">
              <Card
                className="w-4/5 h-full bg-my-grey hover:animate-minipop bg-cover bg-center"
                isPressable
                onClick={scrollProject}
              >
                <CardHeader className="flex gap-3 py-2">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./angry.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm sm:text-base lg:text-lg text-zanah gradient font-bold">
                      tanaygondil.com
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody className="py-3">
                  <p className="text-zanah text-xs sm:text-sm lg:text-base">
                    This website, built using Next.js, NextUI, and Tailwind.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    className="text-xs sm:text-sm"
                    onClick={scrollProject}
                  >
                    Go to top
                  </Link>
                </CardFooter>
              </Card>
              
            </div>
            
            </div>

          </div>
          
          <div>
          
          </div>
          
        </div>
  )
}
