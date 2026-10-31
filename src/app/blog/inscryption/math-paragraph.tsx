"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { mathNotes, sentenceNotes, type MathNote } from "./math-notes";

function MathSentence({ text, note }: { text: string; note: MathNote }) {
  const id = useId();
  const trigger = useRef<HTMLSpanElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const suppressFocusOpen = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  function closeAndFocus() {
    suppressFocusOpen.current = true;
    setOpen(false);
    trigger.current?.focus();
    suppressFocusOpen.current = false;
  }
  function cancelClose() { clearTimeout(timer.current); }
  function closeSoon() { cancelClose(); timer.current = setTimeout(() => setOpen(false), 180); }

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) return;
    function place() {
      const rect = trigger.current?.getBoundingClientRect();
      if (!rect || !panel.current) return;
      const width = panel.current.offsetWidth;
      const height = panel.current.offsetHeight;
      const below = rect.bottom + 10;
      const top = below + height <= window.innerHeight - 12 ? below : Math.max(12, Math.min(rect.top - height - 10, window.innerHeight - height - 12));
      setPosition({ top, left: Math.max(12, Math.min(rect.left, window.innerWidth - width - 12)) });
    }
    function outside(event: Event) {
      const target = event.target as Node;
      if (!trigger.current?.contains(target) && !panel.current?.contains(target)) setOpen(false);
    }
    function key(event: KeyboardEvent) { if (event.key === "Escape") { closeAndFocus(); } }
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("pointerdown", outside);
    document.addEventListener("focusin", outside);
    document.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("focusin", outside);
      document.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <>
      <span
        ref={trigger}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`${text} Show the math.`}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") { cancelClose(); setOpen(true); } }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") closeSoon(); }}
        onFocus={(event) => { if (!suppressFocusOpen.current && event.currentTarget.matches(":focus-visible")) setOpen(true); }}
        onClick={() => { cancelClose(); setOpen(true); }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            cancelClose();
            setOpen(true);
          }
        }}
        className="inline p-0 border-0 bg-transparent text-left font-inherit text-inherit leading-inherit cursor-help underline decoration-dotted decoration-zanah/30 underline-offset-4 hover:decoration-zanah/80 focus-visible:outline focus-visible:outline-1 focus-visible:outline-zanah/70 focus-visible:rounded-sm"
        style={{ font: "inherit", lineHeight: "inherit" }}
      >{text}</span>
      {open && createPortal(
        <div
          id={id}
          ref={panel}
          role="region"
          aria-label={note.title}
          onPointerEnter={cancelClose}
          onPointerLeave={closeSoon}
          className="fixed z-[100] w-[420px] max-w-[calc(100vw-24px)] max-h-[calc(100dvh-24px)] overflow-y-auto border border-zanah/25 rounded-lg bg-[#101713] p-5 shadow-2xl text-zanah"
          style={{ top: position.top, left: position.left }}
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <p className="font-scp text-xs uppercase tracking-wider text-zanah/50">From my save · worked example</p>
            <button type="button" aria-label="Close math explanation" className="text-zanah/60 hover:text-zanah -mt-2 -mr-2 p-2" onClick={() => { closeAndFocus(); }}>×</button>
          </div>
          <h2 className="font-cv text-lg leading-snug mb-3">{note.title}</h2>
          <p className="font-cv text-sm leading-relaxed text-zanah/75 mb-4">{note.evidence}</p>
          <div className="border-y border-zanah/15 py-3 mb-4 space-y-2">
            {note.calculation.map(line => <p key={line} className="font-scp text-xs sm:text-sm leading-relaxed break-words">{line}</p>)}
          </div>
          <p className="font-cv text-sm leading-relaxed mb-3">{note.result}</p>
          <p className="font-scp text-[11px] leading-relaxed text-zanah/50">{note.assumption}</p>
        </div>, document.body
      )}
    </>
  );
}

export function MathParagraph({ text, index }: { text: string; index: number }) {
  const notes = sentenceNotes[index];
  if (!notes) return <>{text}</>;
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) || [text];
  return <>{sentences.map((sentence, i) => {
    const note = mathNotes[notes[i]];
    const trailing = sentence.match(/\s+$/)?.[0] || "";
    return <Fragment key={i}>{note ? <MathSentence text={sentence.trimEnd()} note={note} /> : sentence.trimEnd()}{trailing}</Fragment>;
  })}</>;
}
