"use client";
import React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Blog() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/');
    }, 300);
  };

  return (
    <NextUIProvider>
      <main className={`min-h-screen bg-black animate-fade-in ${isTransitioning ? 'animate-fade-to-black' : ''}`}>

        <div className="max-w-2xl mx-auto px-8 py-16 sm:py-24">

          {/* Header */}
          <div className="flex items-center justify-between mb-16">
            <h1 className="text-2xl sm:text-3xl gradient font-invis">Blog</h1>
            <a onClick={handleHomeClick} href="/" className="cursor-pointer text-zanah/40 hover:text-zanah font-scp text-sm transition-all">
              &larr; home
            </a>
          </div>

          {/* Posts */}
          <div className="space-y-6">

            <Link href="/blog/calvin-and-hobbes" className="group block">
              <article className="py-6 border-b border-zanah/10 hover:border-zanah/30 transition-all">
                <h2 className="text-lg sm:text-xl text-zanah font-cv leading-snug group-hover:gradient transition-all">
                  What Calvin and Hobbes taught me about saying goodbye before learning to say hello
                </h2>
                <p className="text-zanah/40 font-scp text-xs mt-3">
                  thoughts · dec 24, 2024
                </p>
              </article>
            </Link>

          </div>

        </div>

      </main>
    </NextUIProvider>
  );
}
