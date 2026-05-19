"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithubSquare } from "react-icons/fa";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

type Cell = { date: Date; iso: string; count: number; level: 0 | 1 | 2 | 3 | 4 } | null;

const USERNAME = "tgondil";
const CELL = 11; // px per cell
const GAP = 3; // px gap between cells
const COL = CELL + GAP; // px per column (week)

const LEVEL_CLASSES = [
  "bg-zanah/[0.06]",
  "bg-my-green/30",
  "bg-my-green/55",
  "bg-my-green/80",
  "bg-my-green",
];

function parseISODateUTC(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function toISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setUTCDate(next.getUTCDate() + n);
  return next;
}

export default function GithubActivity({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState<Contribution[] | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=all`)
      .then((r) => r.json())
      .then((json: ApiResponse) => {
        if (cancelled) return;
        const sorted = [...json.contributions].sort((a, b) =>
          a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        );
        setRaw(sorted);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Build a dense week grid: each column is a Sun→Sat week, no missing days.
  const { weeks, yearMarkers, todayColIndex, totalAll } = useMemo(() => {
    if (!raw || !raw.length) {
      return { weeks: [] as Cell[][], yearMarkers: [] as { col: number; year: number }[], todayColIndex: 0, totalAll: 0 };
    }

    const byDate = new Map<string, Contribution>();
    for (const c of raw) byDate.set(c.date, c);

    const firstDate = parseISODateUTC(raw[0].date);
    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const lastDate = todayUTC;

    // Start column on the Sunday on/before firstDate.
    const startSunday = addDays(firstDate, -firstDate.getUTCDay());
    // End column on the Saturday on/after lastDate.
    const endSaturday = addDays(lastDate, 6 - lastDate.getUTCDay());

    const weeks: Cell[][] = [];
    const yearMarkers: { col: number; year: number }[] = [];
    let seenYear: number | null = null;
    let totalAll = 0;
    let todayColIndex = 0;

    let cursor = startSunday;
    let col = 0;
    while (cursor <= endSaturday) {
      const week: Cell[] = [];
      for (let d = 0; d < 7; d++) {
        const day = addDays(cursor, d);
        if (day < firstDate || day > lastDate) {
          week.push(null);
        } else {
          const iso = toISO(day);
          const c = byDate.get(iso);
          if (c) {
            week.push({ date: day, iso, count: c.count, level: c.level });
            totalAll += c.count;
          } else {
            week.push({ date: day, iso, count: 0, level: 0 });
          }
          if (iso === toISO(lastDate)) todayColIndex = col;
        }
      }
      // First column whose first non-null cell is in a new year gets a label.
      const firstReal = week.find((c) => c) as Exclude<Cell, null> | undefined;
      if (firstReal) {
        const y = firstReal.date.getUTCFullYear();
        if (y !== seenYear) {
          yearMarkers.push({ col, year: y });
          seenYear = y;
        }
      }
      weeks.push(week);
      cursor = addDays(cursor, 7);
      col++;
    }

    return { weeks, yearMarkers, todayColIndex, totalAll };
  }, [raw]);

  // On open, scroll to the most recent week (today).
  useEffect(() => {
    if (!open || !scrollerRef.current || !weeks.length) return;
    requestAnimationFrame(() => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollLeft = el.scrollWidth;
    });
  }, [open, weeks.length]);

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  // Non-passive wheel listener so we can preventDefault and translate
  // vertical wheel deltas into horizontal scroll.
  useEffect(() => {
    if (!open) return;
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta === 0) return;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max;
      if ((delta > 0 && !atEnd) || (delta < 0 && !atStart)) {
        e.preventDefault();
        el.scrollLeft = Math.max(0, Math.min(max, el.scrollLeft + delta));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, weeks.length]);

  const gridWidth = weeks.length * COL;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 pb-4"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            <div className="relative w-[340px] sm:w-[440px] rounded-2xl border border-zanah/15 bg-black/85 backdrop-blur-md shadow-2xl shadow-black/60 p-4 font-scp">
              <div className="flex items-center justify-between mb-3">
                <a
                  href={`https://github.com/${USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 group"
                >
                  <img
                    src={`https://github.com/${USERNAME}.png`}
                    alt={USERNAME}
                    className="w-7 h-7 rounded-full border border-zanah/20 object-cover"
                  />
                  <span className="text-zanah text-sm font-scp group-hover:gradient transition-all">
                    @{USERNAME}
                  </span>
                </a>
                <span className="text-zanah/50 text-[11px] font-scp">
                  {raw ? `${totalAll.toLocaleString()} contributions` : "…"}
                </span>
              </div>

              <div
                ref={scrollerRef}
                className="github-heatmap-scroll overflow-x-auto overflow-y-hidden pb-2"
              >
                {raw ? (
                  <div className="relative" style={{ width: gridWidth }}>
                    {/* year labels */}
                    <div className="relative h-3 mb-1">
                      {yearMarkers.map((m) => (
                        <span
                          key={m.year}
                          className="absolute top-0 text-[9px] tracking-widest uppercase text-zanah/40"
                          style={{ left: `${m.col * COL}px` }}
                        >
                          {m.year}
                        </span>
                      ))}
                    </div>
                    <div className="flex" style={{ gap: `${GAP}px` }}>
                      {weeks.map((week, wi) => (
                        <div key={wi} className="flex flex-col" style={{ gap: `${GAP}px` }}>
                          {week.map((day, di) => (
                            <div
                              key={di}
                              title={day ? `${day.iso} · ${day.count} contribution${day.count === 1 ? "" : "s"}` : undefined}
                              style={{ width: CELL, height: CELL }}
                              className={`rounded-[2px] ${day ? LEVEL_CLASSES[day.level] : "bg-transparent"}`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-[80px] w-full flex items-center justify-center text-zanah/40 text-xs">
                    loading…
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-2 text-[10px] text-zanah/40">
                <span>← scroll back in time</span>
                <div className="flex items-center gap-[3px]">
                  <span className="mr-1">less</span>
                  {LEVEL_CLASSES.map((cls, i) => (
                    <div key={i} className={`w-[8px] h-[8px] rounded-[2px] ${cls}`} />
                  ))}
                  <span className="ml-1">more</span>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -bottom-[6px] w-3 h-3 rotate-45 bg-black/85 border-r border-b border-zanah/15" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
