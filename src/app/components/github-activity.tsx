"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithubSquare } from "react-icons/fa";

type Contribution = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

const USERNAME = "tgondil";

const LEVEL_CLASSES = [
  "bg-zanah/[0.06]",
  "bg-my-green/30",
  "bg-my-green/55",
  "bg-my-green/80",
  "bg-my-green",
];

export default function GithubActivity({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Contribution[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`)
      .then((r) => r.json())
      .then((json: ApiResponse) => {
        if (cancelled) return;
        setData(json.contributions);
        const sum = json.contributions.reduce((acc, c) => acc + c.count, 0);
        setTotal(sum);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks: Contribution[][] = [];
  if (data) {
    const last = data.slice(-371);
    const firstDow = new Date(last[0].date).getUTCDay();
    let week: Contribution[] = Array(firstDow).fill(null);
    for (const day of last) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null as any);
      weeks.push(week);
    }
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-4 pointer-events-none"
          >
            <div className="relative w-[340px] sm:w-[420px] rounded-2xl border border-zanah/15 bg-black/85 backdrop-blur-md shadow-2xl shadow-black/60 p-4 font-scp">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-zanah/70 text-[11px] tracking-widest uppercase">
                  <FaGithubSquare className="text-zanah text-base" />
                  <span>github activity</span>
                </div>
                <span className="text-zanah/50 text-[11px]">
                  {total !== null ? `${total} contributions` : "…"}
                </span>
              </div>

              <div className="flex gap-[3px] overflow-hidden">
                {data ? (
                  weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          className={`w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-[2px] ${
                            day ? LEVEL_CLASSES[day.level] : "bg-transparent"
                          }`}
                        />
                      ))}
                    </div>
                  ))
                ) : (
                  <div className="h-[72px] w-full flex items-center justify-center text-zanah/40 text-xs">
                    loading…
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 text-[10px] text-zanah/40">
                <span>less</span>
                <div className="flex items-center gap-[3px]">
                  {LEVEL_CLASSES.map((cls, i) => (
                    <div key={i} className={`w-[8px] h-[8px] rounded-[2px] ${cls}`} />
                  ))}
                </div>
                <span>more</span>
              </div>

              <div className="mt-4 pt-3 border-t border-zanah/10 flex items-center gap-3">
                <img
                  src={`https://github.com/${USERNAME}.png`}
                  alt={USERNAME}
                  className="w-9 h-9 rounded-full border border-zanah/20 object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <span className="text-zanah text-sm font-roboto">@{USERNAME}</span>
                  <span className="text-zanah/50 text-[11px]">
                    purdue cs · building things that matter
                  </span>
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
