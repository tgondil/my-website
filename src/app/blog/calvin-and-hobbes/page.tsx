"use client";
import React from "react";
import { useState, useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CalvinAndHobbes() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/blog');
    }, 400);
  };

  return (
    <>
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
    <NextUIProvider>
      <main className={`flex overscroll-none flex-col min-h-screen animate-fade-in bg-black ${isTransitioning ? 'animate-fade-to-black' : ''}`}>

        {/* Fixed navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-16 py-8">
          <a onClick={handleBackClick} href="/blog" className="cursor-pointer inline-block">
            <span className="text-zanah/50 font-scp text-sm hover:text-zanah transition-all">
              &larr; back
            </span>
          </a>
        </nav>

        {/* Hero section */}
        <div className="relative flex flex-col h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-[url('/real3.png')] sm:bg-[url('/calvin.jpg')] bg-cover bg-center bg-no-repeat"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              willChange: 'transform'
            }}
          ></div>
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>

          <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 sm:px-16">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-center text-zanah leading-snug font-invis max-w-4xl">
              what calvin and hobbes taught me about <span className="gradient">saying goodbye</span> before learning to say hello
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-8 sm:px-12">

          {/* Pretext */}
          <p className="text-base sm:text-lg text-zanah/50 font-scp leading-relaxed py-16 sm:py-20">
            I grew up reading Calvin and Hobbes. My grandad got my mom the entire collection from Germany, and she passed them down to me when I was younger. So much of how I&apos;ve navigated my childhood and early adulthood has come from the lessons I learned from these strips.
          </p>

          {/* Point 1 */}
          <section className="py-20 sm:py-28">
            <span className="text-my-blue font-scp text-xs tracking-widest block mb-8">01</span>
            <img
              src="/blog/raccoon.webp"
              alt="Calvin and Hobbes - Raccoon strip"
              className="w-full mb-10"
            />
            <p className="text-xl sm:text-2xl text-zanah font-cv leading-relaxed">
              Ever so often, the goodbye is already written into the hello.
            </p>
            <p className="text-xl sm:text-2xl text-zanah/50 font-cv leading-relaxed mt-4">
              You will never get a warning. The things that matter most will arrive without announcement and leave the same way.
            </p>
          </section>

          {/* Point 2 */}
          <section className="py-20 sm:py-28">
            <span className="text-my-pink font-scp text-xs tracking-widest block mb-8">02</span>
            <img
              src="/blog/hobbes.webp"
              alt="Calvin and Hobbes - Hobbes strip"
              className="w-full mb-10"
            />
            <p className="text-xl sm:text-2xl text-zanah font-cv leading-relaxed">
              Sometimes you are the only one who knows what was lost.
            </p>
            <p className="text-xl sm:text-2xl text-zanah/50 font-cv leading-relaxed mt-4">
              You love something so much it becomes part of how you understand yourself, and to everyone else it is just a stuffed tiger that was not worth stealing.
            </p>
          </section>

          {/* Point 3 */}
          <section className="py-20 sm:py-28">
            <span className="text-my-green font-scp text-xs tracking-widest block mb-8">03</span>
            <img
              src="/blog/love.jpg"
              alt="Calvin and Hobbes - Final strip"
              className="w-full mb-10"
            />
            <p className="text-xl sm:text-2xl text-zanah font-cv leading-relaxed">
              There is always a goodbye.
            </p>
            <p className="text-xl sm:text-2xl text-zanah/50 font-cv leading-relaxed mt-4">
              Say hello anyway.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="border-t border-zanah/10 py-10 px-8 sm:px-16 mt-auto">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <p className="text-zanah/30 font-scp text-xs">
              Tanay Gondil
            </p>
            <a onClick={handleBackClick} href="/blog" className="cursor-pointer text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
              all posts
            </a>
          </div>
        </div>

      </main>
    </NextUIProvider>
    </>
  );
}
