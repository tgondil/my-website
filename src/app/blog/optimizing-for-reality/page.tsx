"use client";
import React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function OptimizingForReality() {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/blog');
    }, 300);
  };

  const listClass = "list-disc list-outside ml-6 text-base sm:text-lg text-zanah/80 font-cv leading-relaxed space-y-1.5 marker:text-zanah/30 mb-6";
  const olClass = "list-decimal list-outside ml-6 text-base sm:text-lg text-zanah/80 font-cv leading-relaxed space-y-1.5 marker:text-zanah/30 mb-6";
  const pClass = "text-base sm:text-lg text-zanah/80 font-cv leading-relaxed mb-6";
  const h2Class = "text-xl sm:text-2xl text-zanah font-invis mb-6";
  const h3Class = "text-lg text-zanah/90 font-cv mb-4";

  return (
    <>
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
    <NextUIProvider>
      <main className={`flex overscroll-none flex-col min-h-screen animate-fade-in bg-black ${isTransitioning ? 'animate-fade-to-black' : ''}`}>

        {/* Fixed navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-8 sm:px-16 py-8 bg-gradient-to-b from-black via-black/80 to-transparent">
          <a onClick={handleBackClick} href="/blog" className="cursor-pointer inline-block">
            <span className="text-zanah/50 font-scp text-sm hover:text-zanah transition-all">
              &larr; back
            </span>
          </a>
        </nav>

        {/* Content */}
        <article className="max-w-2xl mx-auto px-8 sm:px-12 pt-32 pb-24">

          {/* Header */}
          <header className="mb-16">
            <img
              src="/blog/optimization.webp"
              alt="Calvin and Hobbes — &ldquo;It&rsquo;s not denial. I&rsquo;m just very selective about the reality I accept.&rdquo;"
              className="w-full mb-12"
            />
            <p className="text-zanah/40 font-scp text-xs tracking-widest mb-6">
              May 6, 2026
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis mb-6">
              The Most Dangerous Thing You Can Optimize For
            </h1>
          </header>

          {/* Pretext */}
          <section className="mb-16">
            <p className="text-base sm:text-lg text-zanah/50 font-scp leading-relaxed mb-6">
              Last year, a friend sent me <a href="https://gwern.net/backstop" target="_blank" rel="noopener noreferrer" className="text-zanah/70 hover:text-zanah underline underline-offset-4 transition-all">&ldquo;Evolution as Backstop for Reinforcement Learning&rdquo;</a> by Gwern Branwen, one of the most fascinating essays I&apos;ve come across in a long time. This is my attempt to explain it to a layman, the way I&apos;d explain it to myself before I&apos;d read it. The essay is dense, jumping between:
            </p>
            <ul className={listClass}>
              <li>evolution</li>
              <li>corporations</li>
              <li>markets</li>
              <li>reinforcement learning</li>
              <li>pain</li>
              <li>Bayesian statistics</li>
              <li>multicellular organisms</li>
              <li>Soviet economic planning</li>
            </ul>
            <p className={pClass}>
              &hellip;and somehow connects all of them into one giant idea.
            </p>
            <p className={pClass}>
              But underneath all the complexity is a surprisingly simple insight. There are two ways systems learn:
            </p>
            <ol className={olClass}>
              <li>Fast feedback</li>
              <li>Reality</li>
            </ol>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              And reality eventually wins.
            </p>
          </section>

          {/* The entire essay in one example */}
          <section className="mb-16">
            <h2 className={h2Class}>The entire essay, in one example</h2>
            <p className={pClass}>
              Imagine trying to become incredible at Muay Thai. There are two kinds of feedback you could use.
            </p>

            <h3 className={h3Class}>Fast feedback</h3>
            <ul className={listClass}>
              <li>your coach correcting your form</li>
              <li>shadowboxing</li>
              <li>film review</li>
              <li>conditioning metrics</li>
              <li>gym performance</li>
              <li>technique drills</li>
            </ul>

            <h3 className={h3Class}>Real feedback</h3>
            <ul className={listClass}>
              <li>did you win the fight?</li>
              <li>did you get knocked out?</li>
            </ul>

            <p className={pClass}>
              The fast feedback is efficient. The real feedback is truth. But the problem is that efficient feedback can drift away from reality. You can look beautiful on pads and still lose actual fights.
            </p>
            <p className={pClass}>
              Gwern describes this as an &ldquo;inner optimization&rdquo; constrained by an &ldquo;outer optimization.&rdquo;
            </p>
            <p className={pClass}>
              The outer layer is reality itself:
            </p>
            <ul className={listClass}>
              <li>evolution</li>
              <li>bankruptcy</li>
              <li>death</li>
              <li>survival</li>
              <li>winning</li>
            </ul>
            <p className={pClass}>
              The inner layer is the shortcut system:
            </p>
            <ul className={listClass}>
              <li>metrics</li>
              <li>KPIs</li>
              <li>reinforcement learning rewards</li>
              <li>management systems</li>
              <li>heuristics</li>
              <li>social incentives</li>
            </ul>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              The inner system learns quickly. The outer system keeps it honest.
            </p>
          </section>

          {/* Credit assignment */}
          <section className="mb-16">
            <h2 className={h2Class}>The credit assignment problem</h2>
            <p className={pClass}>
              One of the coolest ideas in the essay is something called the &ldquo;credit assignment problem.&rdquo;
            </p>
            <p className={pClass}>
              Imagine if the only feedback you got in life was: SUCCESS or FAILURE. Nothing else. No hints. No intermediate feedback. No idea what worked.
            </p>
            <p className={pClass}>You wouldn&apos;t know:</p>
            <ul className={listClass}>
              <li>which habit mattered</li>
              <li>which decision mattered</li>
              <li>what caused success</li>
              <li>what caused failure</li>
            </ul>
            <p className={pClass}>
              Reality is noisy. So humans invent intermediate metrics:
            </p>
            <ul className={listClass}>
              <li>grades</li>
              <li>KPIs</li>
              <li>gym PRs</li>
              <li>productivity systems</li>
              <li>revenue</li>
              <li>likes and followers</li>
            </ul>
            <p className={pClass}>
              These are useful shortcuts. But shortcuts are dangerous because they can stop reflecting reality.
            </p>
            <p className={pClass}>Someone can become incredible at:</p>
            <ul className={listClass}>
              <li>interviewing without being a good engineer</li>
              <li>looking productive without producing</li>
              <li>networking without creating value</li>
              <li>sounding smart without understanding anything</li>
            </ul>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              The proxy becomes the goal.
            </p>
          </section>

          {/* Evolution and markets */}
          <section className="mb-16">
            <h2 className={h2Class}>Why evolution and markets still matter</h2>
            <p className={pClass}>
              One of the strongest arguments in the essay is that evolution and markets are &ldquo;dumb&rdquo; but grounded.
            </p>
            <p className={pClass}>
              Markets don&apos;t care about your narrative. Evolution doesn&apos;t care about your intentions. Reality doesn&apos;t care about your explanations. Only outcomes.
            </p>
            <p className={pClass}>
              That&apos;s why these systems work despite being horribly inefficient. Evolution basically does:
            </p>
            <ul className={listClass}>
              <li>try random things</li>
              <li>kill what fails</li>
              <li>keep what survives</li>
            </ul>
            <p className={pClass}>
              for millions of years. Brutal and wasteful, but real.
            </p>
          </section>

          {/* Organizations */}
          <section className="mb-16">
            <h2 className={h2Class}>Why organizations lose their edge</h2>
            <p className={pClass}>
              Evolution needs three things: variation, selection, and replication. Corporations have variation. Every company is different. They have selection. The unfit go bankrupt. But they don&apos;t replicate. There is no corporate DNA. A successful company can&apos;t clone itself, and when it spins off a division or acquires a startup, the new entity rarely inherits the original&apos;s secret sauce.
            </p>
            <p className={pClass}>
              That missing third leg is why corporations don&apos;t compound across generations the way species, software, or neural networks do. The banks of the 1500s look strikingly similar in their failure modes to the banks of today. Without replication, culture can be lived but not transmitted. The &ldquo;founder phase&rdquo; can&apos;t be copied forward.
            </p>
            <p className={pClass}>Small groups often have:</p>
            <ul className={listClass}>
              <li>hunger</li>
              <li>speed</li>
              <li>strong identity</li>
              <li>intense culture</li>
              <li>obsession</li>
            </ul>
            <p className={pClass}>Then over time:</p>
            <ul className={listClass}>
              <li>bureaucracy appears</li>
              <li>systems replace people</li>
              <li>internal politics grow</li>
              <li>self-preservation becomes the goal</li>
            </ul>
            <p className={pClass}>
              Organizations slowly stop optimizing for reality and start optimizing for themselves. You can feel this everywhere: corporations, universities, student organizations, governments, startups.
            </p>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              The metric slowly becomes survival instead of truth.
            </p>
          </section>

          {/* Pain */}
          <section className="mb-16">
            <h2 className={h2Class}>The most visceral example: pain</h2>
            <p className={pClass}>
              The same framework applies to something everyone has felt today.
            </p>
            <p className={pClass}>
              Why is pain <em>painful</em>? Why does a stubbed toe demand your attention rather than just informing you, the way a notification might? You could imagine a body that simply <em>knew</em> something was wrong without it hurting. A quiet flag in some corner of your awareness. Why didn&apos;t evolution build that?
            </p>
            <p className={pClass}>
              Because pain is the outer loss for the body. It&apos;s the one signal the rest of your cognition isn&apos;t allowed to override.
            </p>
            <p className={pClass}>
              People born with congenital pain insensitivity make the case starkly. They don&apos;t live longer or more comfortably for being spared the discomfort. They accumulate injuries the rest of us avoid without thinking: walking on bones that have already broken, scalding their mouths on hot drinks, wearing down joints from postures that should have hurt.
            </p>
            <p className={pClass}>
              Without the painful signal, the planning brain optimizes for whatever it cares about. Novelty. Curiosity. Getting somewhere quickly. And the body quietly degrades underneath.
            </p>
            <p className={pClass}>
              Researchers once tried to engineer around this. They built &ldquo;pain prosthetics&rdquo;: instrumented gloves and socks that would beep or shock the wearer when sensors detected dangerous pressure or heat. It didn&apos;t hold. Patients learned to disable the warnings whenever the warnings became inconvenient.
            </p>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              That&apos;s the whole essay in one anecdote. If you can override the outer loss, you will. Pain has to be painful, not just informative, because we can&apos;t be trusted with the off switch.
            </p>
          </section>

          {/* Willpower */}
          <section className="mb-16">
            <h2 className={h2Class}>Why willpower runs out</h2>
            <p className={pClass}>
              The same logic explains something else everyone has felt this week.
            </p>
            <p className={pClass}>
              The old story about willpower was that it ran on glucose. Your brain burned through sugar making decisions, and that&apos;s why you crumble at the end of a long day. That story turned out to be mostly wrong. The metabolic cost of thinking is tiny.
            </p>
            <p className={pClass}>
              The newer story is that willpower is an opportunity-cost signal. Your brain forces you to stop focusing on any one thing because if you could focus indefinitely on whatever felt rewarding in the moment, you&apos;d ignore the rest of your life. Fatigue is the alarm that says <em>this can&apos;t be the only thing</em>. Burnout is the long version of the same alarm.
            </p>
            <p className={pClass}>
              This is why restorative hobbies tend to be maximally different from the day job. A programmer is best served by something social, physical, and outdoors. Not another solitary screen task. The alarm isn&apos;t really about exhaustion. It&apos;s about variety.
            </p>
            <p className={pClass}>
              It&apos;s also why splitting work into small completable units helps with procrastination. The inner reward signal gets something to latch onto, and the alarm quiets down.
            </p>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              Willpower is a kind of psychic pain. Same purpose: it stops the inner optimizer from running too long without checking back in with reality.
            </p>
          </section>

          {/* Meta-learning */}
          <section className="mb-16">
            <h2 className={h2Class}>The slow optimizer built the fast one</h2>
            <p className={pClass}>
              There&apos;s one more move worth flagging. The two-level structure is recursive. The slow optimizer doesn&apos;t just <em>constrain</em> the fast one. It <em>builds</em> it.
            </p>
            <p className={pClass}>
              Evolution didn&apos;t hardcode every behavior an organism would ever need. It built a brain. The brain is the fast optimizer evolution produced so it wouldn&apos;t have to wait millions of years to respond to a tiger.
            </p>
            <p className={pClass}>
              Markets did the same with companies. Rather than coordinating every individual transaction, the market grew firms that plan internally on much faster timescales. Training does it with neural networks. Each layer produces a faster, smarter system that handles most of the work. The slow layer just checks the answer.
            </p>
            <p className={pClass}>
              The pattern shows up everywhere once you look for it: evolution to humans, markets to companies, training to neural nets, pain to planning, reality to heuristics. Each fast layer is a huge efficiency gain. Each one is also liable to drift, which is exactly why the slow layer can&apos;t be removed.
            </p>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              The healthiest systems are the ones where the fast optimizer stays tethered to the slow one.
            </p>
          </section>

          {/* The real skill */}
          <section className="mb-16">
            <h2 className={h2Class}>The real skill</h2>
            <p className={pClass}>
              You can optimize for prestige instead of skill, followers instead of impact, credentials instead of competence, aesthetics instead of substance, productivity instead of creation. The scary thing is the inner optimization feels really good. It rewards you quickly. Reality is slower. But reality eventually cashes the check.
            </p>
            <p className={pClass}>
              The real skill might simply be this: keeping your fast feedback loops connected to reality. Using metrics without worshipping them. Using systems without becoming trapped by them. Using optimization without forgetting the actual goal.
            </p>
            <p className={pClass}>
              And maybe that&apos;s why this essay stuck with me so much. It isn&apos;t really about reinforcement learning.
            </p>
            <p className="text-base sm:text-lg text-zanah/80 font-cv leading-relaxed">
              It&apos;s about how humans slowly lose touch with reality through abstraction. And why the healthiest systems are the ones that eventually reconnect to truth.
            </p>
          </section>

          {/* Citation */}
          <section className="border-t border-zanah/10 pt-12">
            <p className="text-zanah/40 font-scp text-xs mb-4">
              Credit
            </p>
            <p className="text-zanah/60 font-scp text-sm leading-relaxed">
              Full credit to Gwern Branwen for the original essay and ideas: <a href="https://gwern.net/backstop" target="_blank" rel="noopener noreferrer" className="text-zanah/80 hover:text-zanah underline underline-offset-4 transition-all">Evolution as Backstop for Reinforcement Learning</a>.
            </p>
          </section>

        </article>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 py-6 px-8 sm:px-16 z-30">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <p className="text-zanah/30 font-scp text-xs">
              Tanay Gondil
            </p>
            <a href="https://www.linkedin.com/in/tgondil/" target="_blank" className="text-zanah/30 hover:text-zanah font-scp text-xs transition-all">
              linkedin
            </a>
          </div>
        </div>

      </main>
    </NextUIProvider>
    </>
  );
}
