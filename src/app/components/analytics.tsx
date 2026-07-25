"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    goatcounter?: { count: (opts?: { path?: string }) => void };
  }
}

// count.js counts the initial page load on its own; this counts
// client-side route changes, which it doesn't see.
export default function Analytics() {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    window.goatcounter?.count({ path: pathname });
  }, [pathname]);

  return null;
}
