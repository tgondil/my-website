"use client";
import React from "react";
import { useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BuildingTterm() {
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
  const pClass = "text-base sm:text-lg text-zanah/80 font-cv leading-relaxed mb-6";
  const h2Class = "text-xl sm:text-2xl text-zanah font-invis mb-6";
  const kickerClass = "text-base sm:text-lg text-zanah/80 font-cv leading-relaxed";

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
              src="/blog/tterm-seascape.svg"
              alt="A seascape typed on a typewriter: the word CLOUDS repeated in the shape of clouds, BOAT forming a sailboat, OCEAN filling the sea"
              className="w-full mb-12"
            />
            <p className="text-zanah/40 font-scp text-xs tracking-widest mb-6">
              Jul 8, 2026
            </p>
            <h1 className="dot-text text-3xl sm:text-4xl lg:text-5xl text-zanah leading-tight font-invis mb-6">
              The Only Window I Need
            </h1>
            <div className="mt-8">
              <p className="text-xl sm:text-2xl text-zanah font-cv">skiff</p>
              <p className="text-zanah/40 font-scp text-xs mt-2 tracking-wide">noun [ C ] &nbsp;/skɪf/</p>
              <p className="text-base sm:text-lg text-zanah/55 font-cv leading-relaxed mt-3 italic">
                a small, light boat for rowing or sailing, usually used by only one person
              </p>
            </div>
          </header>

          {/* Pretext */}
          <p className="text-base sm:text-lg text-zanah/50 font-scp leading-relaxed mb-16">
            I spent my evenings this year building a terminal called tterm (<a href="https://tterm.sh" target="_blank" rel="noopener noreferrer" className="text-zanah/70 hover:text-zanah underline underline-offset-4 transition-all">tterm.sh</a>). It&apos;s a skiff in exactly the sense above: made for one person, shaped around one problem. The problem is what this is about.
          </p>

          {/* 1. Frozen theory + the new scarce thing */}
          <section className="mb-16">
            <h2 className={h2Class}>A tool is a frozen theory of what&apos;s scarce</h2>
            <p className={pClass}>
              Every tool is built around a belief about what&apos;s expensive. The IDE&apos;s belief is that producing correct text is the hard part, and nearly everything in it follows: the editor in the center, autocomplete, language servers, vim&apos;s whole grammar of motions, each one an optimization for a human pushing characters into a buffer. Fred Brooks argued in 1986 that this was a category error, that the text was the &ldquo;accident&rdquo; of programming and the essence was deciding what to build. He was right, and we optimized the accident anyway, because for forty years the accident was still what ate your afternoon.
            </p>
            <p className={pClass}>
              I should be careful about who I&apos;m speaking for, because the next claim is where these essays usually overreach. I&apos;m not saying programming changed for everyone. If you maintain a legacy monolith the model can&apos;t hold in its head, or your day is meetings and reviewing human PRs, your bottleneck is exactly where it was. But for a real and growing group, people doing net-new work on codebases an agent can fit in context, the ratio has flipped. On a normal day my hands produce more English than TypeScript. Claude writes the code; I decide what to build, watch it happen, read what came back, and check that it holds.
            </p>
            <p className={pClass}>
              So what&apos;s scarce for me now isn&apos;t keystrokes. It&apos;s the attention I spend verifying the model. That is the actual bottleneck of my workday, the thing I run out of, and none of my tools were built to economize it, because until a year ago it wasn&apos;t the scarce thing.
            </p>
          </section>

          {/* 2. The two-axis failure mode */}
          <section className="mb-16">
            <h2 className={h2Class}>The scarce resource has a known failure mode. Two, actually.</h2>
            <p className={pClass}>
              Here is the part that made me stop rearranging windows and design something. A verification budget doesn&apos;t just get spent. It gets <em>quietly overdrawn</em>, and the two ways it happens both have names in the human-factors literature, from decades before anyone was supervising a language model.
            </p>
            <p className={pClass}>
              The first is automation complacency (Parasuraman and Riley, 1997): you under-check a tool you&apos;ve come to trust, <em>even while you&apos;re actively engaged with it</em>. This matters because the easy objection to everything I&apos;m about to say is &ldquo;agent coding isn&apos;t passive monitoring, you&apos;re driving the whole time.&rdquo; True, and it doesn&apos;t save you. Complacency isn&apos;t about idleness; it&apos;s about trust. I approve a diff I skimmed because Claude&apos;s last twenty were fine, and I&apos;m fully awake when I do it.
            </p>
            <p className={pClass}>
              The second is the one everyone half-remembers: Bainbridge&apos;s <em>Ironies of Automation</em> (1983). The better the automation, the worse the supervisor, because attention decays across processes you&apos;re time-sharing and the rare moment that needs judgment arrives when you&apos;re least ready. This is the parallel-sessions failure: past two or three Claudes I stop supervising in any honest sense and start stamping, and Bainbridge described that in 1983 about power plants.
            </p>
            <p className={pClass}>
              Naming both is the whole design, because they ask for opposite fixes. Complacency is a per-check problem: make each individual check so cheap I take it instead of trusting. Multiplexing is a switching problem: make the state of every session glanceable so I don&apos;t lose the thread across them. So the control-room fantasy, one calm operator running ten agents, is exactly backwards. More agents is more automation is a worse supervisor. The honest goal isn&apos;t scale. It&apos;s to keep the verification budget solvent on both axes.
            </p>
            <p className={kickerClass}>
              A good tool for this era economizes attention the way the IDE economized keystrokes. That&apos;s the sentence I wish I&apos;d had a year ago.
            </p>
          </section>

          {/* 3. The checking tax (axis 1) */}
          <section className="mb-16">
            <h2 className={h2Class}>The checking tax</h2>
            <p className={pClass}>
              My day used to be a triangle: a terminal running Claude, an editor to read what it wrote, a browser to see whether the thing rendered. Cmd-tab, cmd-tab, cmd-tab.
            </p>
            <p className={pClass}>
              The obvious rebuttal is right as far as it goes: noticing a blocked agent is solved. Claude Code has notification hooks, the terminal rings a bell, macOS surfaces it. If the cost were only <em>noticing</em>, I&apos;d have built nothing. But noticing is cheap and checking is not. When the diff lives in another app and the rendered page in a third, every verification is a trip, and a check that costs a trip is a check you start trusting your way out of. That&apos;s complacency with a user-interface cause: the tool set the price of looking high enough that skimming won.
            </p>
            <p className={pClass}>
              Co-location doesn&apos;t fix this by restoring my mental state. That state is in my head, not on the screen, and no layout hands it back. What one window fixes is narrower and realer: it drops the price of a look to almost nothing, so I look instead of trust. The evidence sits one glance from the change that made it.
            </p>
          </section>

          {/* 4. No-editor, honest + ledger fixed + deskilling conceded */}
          <section className="mb-16">
            <h2 className={h2Class}>Taxing the silent edit</h2>
            <p className={pClass}>
              So the reading side is luxurious and the writing side doesn&apos;t exist: a git-badged file tree, a syntax-highlighted viewer, diff review that walks hunk by hunk with stage, unstage, and discard on each. No editor. The viewer can&apos;t write to disk. No insert mode to fall into.
            </p>
            <p className={pClass}>
              I want to be precise, because it&apos;s easy to oversell. This is not a Ulysses pact. The panes are real terminals, so <span className="font-scp text-sm">vim src/foo.ts</span> is always right there, and the tool rewrites itself on request, so &ldquo;add an editor&rdquo; is one sentence away. You can&apos;t make writing impossible in a system like this. What removing the editor does is cheaper and more durable: it deletes the <em>reflex</em>. Hand-fixing stops being a thoughtless keystroke and becomes a deliberate act you have to choose, on purpose, in a pane. It moves the cheap default from &ldquo;fix it silently&rdquo; to &ldquo;tell the model,&rdquo; and defaults are most of behavior. The pain-prosthetic story from <a href="/blog/optimizing-for-reality" className="text-zanah/70 hover:text-zanah underline underline-offset-4 transition-all">that Gwern essay</a>, gloves that beeped for patients who can&apos;t feel pain and got ignored the instant they were inconvenient, taught me the lesson isn&apos;t &ldquo;make the warning louder.&rdquo; It&apos;s &ldquo;stop relying on a warning and change what&apos;s easy.&rdquo;
            </p>
            <p className={pClass}>
              There&apos;s a concrete reason the silent edit is worse than it feels, and I want to state it at exactly its true strength, not more. Claude Code mostly survives a hand-edit mechanically: it re-reads files, its edits are guarded against state it didn&apos;t see, so it usually fails loudly rather than corrupting anything. What it can&apos;t recover is <em>why</em>. Telling the model puts your intent and your correction into the session, where it steers the rest of the work; hand-fixing puts them nowhere. And here&apos;s the honest limit, since a session isn&apos;t a permanent record, context gets compacted and cleared: the durable loss isn&apos;t the transcript, it&apos;s the note you now won&apos;t write. The fix already worked, so the CLAUDE.md line that would&apos;ve taught the next session, the commit message that would&apos;ve explained it, quietly never gets written. The bug comes back and nothing learned.
            </p>
            <p className={pClass}>
              The fair objection is that routing every correction through words has its own deskilling cost, which is the same irony one level up: lean on the model to phrase the fix and your own hands get slower. I think that&apos;s real, and I think it&apos;s survivable, because the skill I can&apos;t afford to lose isn&apos;t typing. It&apos;s judgment, the read on whether a diff is actually right, and judgment is the one muscle a reading-only tool makes me use on every single change.
            </p>
            <p className={kickerClass}>
              The point was never that I can&apos;t type. It&apos;s that the cheap path now runs through words, and words are the only thing that checks, steers, and teaches at once.
            </p>
          </section>

          {/* 5. Abduction + rest + furniture */}
          <section className="mb-16">
            <h2 className={h2Class}>I didn&apos;t derive any of this</h2>
            <img
              src="/blog/tterm-rows.png"
              alt="tterm with two stacked project rows, each running its own Claude Code session next to a file explorer and a viewer"
              className="w-full mb-10"
            />
            <p className={pClass}>
              I want to be honest about the order of events, because the tidy version would be a lie. I did not sit down with &ldquo;economize verification&rdquo; and deduce a feature list. I built these things across a month of annoyed evenings, on instinct, one at a time. The principle is what I noticed afterward, when they all turned out to answer the same question. That&apos;s not a weaker story, it&apos;s a stronger one: a rule you used as a blueprint only proves you can follow your own plan, but a rule that retrodicts a month of decisions you made before you had it is evidence the rule found something real.
            </p>
            <p className={pClass}>
              What it retrodicts, cleanly, is the skeleton. Rows fight the multiplexing axis: a project opens as a station (explorer, Claude, viewer), a second stacks beneath with its own Claude, and status is glanceable without a click, tabs carry a dirty-file count and an idle session gets flagged. The flag heuristic is pretty lazy, it watches the buffer for Claude&apos;s &ldquo;esc to interrupt&rdquo; to vanish, and yes, that flag is itself a little automation I&apos;ve chosen to trust, which is the whole essay pointed back at me, which is exactly why I keep it dumb and glanceable instead of clever and load-bearing. The panes are honest ptys, every ctrl key passing through, because tterm only intercepts cmd-chords and you don&apos;t wreck the agent&apos;s habitat. And the browser moved in to fight the complacency axis: the terminal already holds plenty of ground truth (a failing test, a red typecheck), but the truth that <em>isn&apos;t</em> text, does the page render, does it feel right, used to live across a boundary I therefore checked too rarely. Now it&apos;s real Chromium in a tab, cookies imported with Chrome&apos;s own Safe Storage key so everything&apos;s logged in, one glance from the diff.
            </p>
            <p className={pClass}>
              What the principle does <em>not</em> explain is the rest of the tool, and I&apos;d rather show you the theory&apos;s edges than pretend it has none. Cmd-shift-G opens ChatGPT because that&apos;s where I make images. Favicons on tabs, font zoom, tab reordering: made it easier to move from chrome. And the honest one: the browser is also the YouTube I put on while Claude grinds, which is me spending attention, not saving it, the one place I cheat on my own thesis. Yet, a wise man would say a design principle that explains the skeleton and visibly fails to explain the furniture is one you can actually trust. 
            </p>
          </section>


          {/* 7. Self-editing + frozen-theory */}
          <section className="mb-16">
            <h2 className={h2Class}>The tool that reheats its own theory</h2>
            <p className={pClass}>
              There&apos;s a palette command called <em>Claude on tterm itself</em>. It opens a Claude session on tterm&apos;s own source, inside tterm, and with dev-mount on, saved changes hot-reload the running app. The terminal changes shape while I&apos;m sitting in it. (It&apos;s also the one time I deliberately break my own two-session rule: the tterm-on-tterm session is the one extra Claude I allow, and I treat it as the exception it is.)
            </p>
            <p className={pClass}>
              The plain reason I built it was flow. When something annoyed me mid-task I didn&apos;t want to <em>go off</em>, stop the real work, open the repo elsewhere, become a maintainer for twenty minutes. Now the fix is a sentence in an already-open pane and the app patches itself while the work runs two rows down. An annoyance at 9pm is usually gone by 9:15.
            </p>
            <p className={pClass}>
              But there&apos;s a straighter line back to the first section. A tool is a frozen theory of what&apos;s scarce, and normally re-freezing takes an industry a decade, which is the real reason your tools always encode the <em>previous</em> bottleneck. The people who tell you &ldquo;just point an agent at any repo&rdquo; are right that the capability isn&apos;t special. What&apos;s special is the collapse of distance: the repo, the running app, and the agent are the same loop, so shaping the tool has no context-switch cost, it&apos;s continuous with using it. That&apos;s the first exit I&apos;ve found from tool-fossilization, and it&apos;s the same principle again, the tool changes only through words the model can read. The next thing I&apos;m building is tterm reading its own browser, so Claude can act on the page it opened rather than me ferrying screenshots between panes, automating the ferrying, not the judging, because by my own argument the judging is the part I&apos;m not allowed to give away.
            </p>
          </section>

          {/* 8. Costs + skiff */}
          <section className="mb-16">
            <h2 className={h2Class}>What it costs, and why one user is the method</h2>
            <p className={pClass}>
              The honest ledger. The missing editor stings about once a day, when a one-character typo has to round-trip through a model; I (could) say the absurdity is sort of the point but it&apos;s still absurd. The parallelism ceiling is just Bainbridge with my name on it and no UI moves it much. And there&apos;s a security smell I&apos;ll say out loud instead of hide: the browser holds my real logged-in web life, imported with Chrome&apos;s Safe Storage key into a window whose panes run <span className="font-scp text-sm">claude --dangerously-skip-permissions</span>. I take that trade for myself, on my machine, with my eyes on it. I would not take it on your behalf, and you shouldn&apos;t accept it from me unexamined.
            </p>
            <p className={pClass}>
              Because it assumes one user, on macOS, with my exact habits, and that assumption is the method, not an apology. Some shortcuts are shamelessly personal and no product review would sign off (cmd-shift-K globally fullscreens the actual Claude desktop app for Cowork; they&apos;ve since shipped Cowork to the web, which made me feel both vindicated and slightly obsolete). They exist because I wanted them on a Tuesday, and one-user is exactly what let me delete every requirement that would have stopped me. The editor came out <em>because</em> the only user agreed to the pact.
            </p>
            <p className={pClass}>
              There&apos;s a kind of boat called a skiff: small, flat, built for one person, useless for cargo, perfect for its owner. That&apos;s what this is. I can&apos;t hand you a tool shaped like your workflow, and I&apos;m not going to pretend a hobby build for my habits is a product for yours. But the loop that shaped it to me is the same loop that would shape it to you, running while you use it, so what I can hand you is a skiff that reshapes itself when you ask, and let it drift toward your habits the way it drifted toward mine.
            </p>
          </section>

          {/* 9. Close: the bounded collective claim */}
          <section className="mb-16">
            <h2 className={h2Class}>Words, arranged with care</h2>
            <p className={pClass}>
              So, is this just a me thing? Here&apos;s the part I&apos;ll actually commit to, because I think it&apos;s true whether or not you ever touch tterm. Supervising automation is an old discipline with a documented failure mode, and the moment your bottleneck moves from writing to checking, whenever that happens for you and for however much of your work, you inherit that failure mode whether or not you have a name for it. Your attention becomes the scarce resource, and it will get quietly overdrawn in the two ways it always has. A second monitor solves some of it. Knowing what you&apos;re defending solves more.
            </p>
            <p className={pClass}>
              The art on the site, and at the top of this post, is typed: CLOUDS shaped into clouds, BOAT into a sailboat, OCEAN into the sea. I take no credit for the style; I saw it in an Anthropic video recently and couldn&apos;t stop thinking about it, and they weren&apos;t the first either, concrete poets were doing this on typewriters before software existed. I just wanted one made for me, so I asked, and now a little stencil program types seascapes in my terminal&apos;s colors. If you&apos;ve caught yourself skimming a diff because opening it was annoying, you already know the problem. It&apos;s at <a href="https://tterm.sh" target="_blank" rel="noopener noreferrer" className="text-zanah/70 hover:text-zanah underline underline-offset-4 transition-all">tterm.sh</a>, free.
            </p>
          </section>

          {/* Credit */}
          <section className="border-t border-zanah/10 pt-12">
            <p className="text-zanah/40 font-scp text-xs mb-4">
              Reading
            </p>
            <p className="text-zanah/60 font-scp text-sm leading-relaxed">
              Lisanne Bainbridge, &ldquo;Ironies of Automation&rdquo; (1983). Raja Parasuraman &amp; Victor Riley, &ldquo;Humans and Automation: Use, Misuse, Disuse, Abuse&rdquo; (1997), for automation complacency. Fred Brooks, &ldquo;No Silver Bullet&rdquo; (1986). And Gwern Branwen&apos;s <a href="/blog/optimizing-for-reality" className="text-zanah/80 hover:text-zanah underline underline-offset-4 transition-all">backstop essay</a>, where the pain-prosthetic story lives.
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
