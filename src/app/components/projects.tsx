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

export default function Projects() {
  const scrollProject = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const scrollContact = () => {
    window.scrollTo({ top: 2*window.innerHeight, behavior: "smooth" });
  }
  return (
    <div id='projects' className="w-full sm:h-screen flex flex-col bg-[url('/stars.jpg')] bg-contain sm:bg-cover sm:bg-contain pt-10">
          <div className="sm:h-screen w-full bg-contain bg-center flex flex-col gap-8 items-center ">
            <div className="w-full text-xl flex sm:text-1e tracking-wide text-zanah leading-hero items-center justify-center font-invis">
            <h1 >
              Take a look at some of my 
            </h1>
            <div className="animate-other-bounce pl-1.5 sm:pl-5">
            <h1 className="gradient sm:text-1.1e ">
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
                  toast.error("This code repository is currently private.");
                  //window.open('https://github.com/tgondil/Investagram')
                }}
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./invest.png"
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
                    A full-stack social media app for investors, aiming to cover existing gaps in investing social media apps. Built using Next.js, Tailwind, Node.js, and MongoDB. Set to release May 15th, 2024.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    
                    /*href="https://github.com/tgondil/Investagram"*/
                  >
                    This code repository is currently private.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-full w-full h-1/2 w-3/6 sm:w-1/3 flex justify-center items-center">
              <Card
                className="w-4/5 h-full bg-my-grey hover:animate-minipop bg-cover bg-center "
                isPressable
                onClick={()=>{
                  window.open('https://github.com/tgondil/BoilerMap')
                }}
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./boilermap.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      BoilerMaps
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    A map that showcases high-level trends with respect to pollution, project for the Boilermake 2023 hackathon. Built using Python, HTML, and CSS.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/tgondil/BoilerMap"
                  >
                    Visit source code on GitHub.
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="h-1/2 w-full sm:w-1/3 sm:h-1/2 w-3/6 flex hover:animate-minipop justify-center items-center">
              <Card
              onClick={()=>{
                toast.error("This code repository is currently private.");
                //window.open('https://github.com/tgondil/Investagram')
              }}
                className="w-4/5  h-full bg-my-grey bg-cover bg-center"
                isPressable
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./ywca.png"
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
                    A billing app for the YWCA non profit, in collaboration with the <span className='text-my-green'>Hack the Future</span>  club at Purdue.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal

                    /*href="https://github.com/Hack-the-Future/ywca-billing"*/
                  >
                    This code repository is currently private.
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
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./safe.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      StaySafePurdue
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    A safety application for Purdue students, that scrapes data from the Purdue Police department archives to showcase the safest routes to a destination. Built using Python.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
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
                  window.open('https://github.com/tgondil/realer.app')
                }}
              >
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./realer.png"
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
                    A messaging app that uses facial recognition to bridge the gap between messaging and video calling. Built using React, Golang, and Redis, hosted on an AWS EC2 instance. 
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/tgondil/realer.app"
                  >
                    Visit source code on GitHub.
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
                <CardHeader className="flex gap-3">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src="./angry.png"
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md text-zanah gradient font-bold">
                      tanaygondil.me
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-zanah">
                    This website, built using Next.js, NextUI, and Tailwind.
                  </p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link
                    isExternal
                    showAnchorIcon
                    onClick={scrollProject}
                  >
                    Go to top
                  </Link>
                </CardFooter>
              </Card>
              
            </div>
            
            </div>
            <div className="flex justify-center mt-8 items-center">
              <div className="scroll2 cursor-pointer" onClick={scrollContact}></div>
            </div>
          </div>
          
          <div>
          
          </div>
          
        </div>
  )
}
