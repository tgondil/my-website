"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const trailPositions = useRef<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  useEffect(() => {
    setIsMounted(true);

    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let animationId: number | null = null;
    let hasPosition = false;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const animate = () => {
      animationId = null;
      const previousX = position.current.x;
      const previousY = position.current.y;
      position.current.x = lerp(position.current.x, target.current.x, 0.2);
      position.current.y = lerp(position.current.y, target.current.y, 0.2);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update trail positions with increasing delay
      let largestTrailDelta = 0;
      trailPositions.current.forEach((trail, i) => {
        const prevPos = i === 0 ? position.current : trailPositions.current[i - 1];
        const beforeX = trail.x;
        const beforeY = trail.y;
        trail.x = lerp(trail.x, prevPos.x, 0.1 - i * 0.02);
        trail.y = lerp(trail.y, prevPos.y, 0.1 - i * 0.02);
        largestTrailDelta = Math.max(
          largestTrailDelta,
          Math.abs(trail.x - beforeX) + Math.abs(trail.y - beforeY),
        );

        if (trailsRef.current[i]) {
          trailsRef.current[i].style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
        }
      });

      const cursorDelta =
        Math.abs(position.current.x - previousX) +
        Math.abs(position.current.y - previousY);
      if (cursorDelta > 0.05 || largestTrailDelta > 0.05) {
        animationId = requestAnimationFrame(animate);
      }
    };

    const requestAnimation = () => {
      if (animationId === null) animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasPosition) {
        hasPosition = true;
        position.current = { x: e.clientX, y: e.clientY };
        trailPositions.current.forEach((trail) => {
          trail.x = e.clientX;
          trail.y = e.clientY;
        });
      }
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      setIsVisible(true);
      requestAnimation();
    };

    const handleMouseOver = (e: Event) => {
      const el = e.target as HTMLElement;
      if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.tagName === "INPUT" ||
        el.closest("a") ||
        el.closest("button") ||
        el.classList.contains("cursor-pointer") ||
        el.closest(".cursor-pointer") ||
        el.hasAttribute("onclick")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      if (animationId !== null) cancelAnimationFrame(animationId);
    };
  }, []);

  if (!isMounted) return null;

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail stars */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="star-trail"
          style={{
            opacity: isVisible ? 0.4 - i * 0.12 : 0,
            fontSize: `${8 - i * 2}px`,
          }}
        >
          ✦
        </div>
      ))}
      {/* Main star cursor */}
      <div
        ref={cursorRef}
        className={`star-cursor ${isHovering ? "hovering" : ""} ${isClicking ? "clicking" : ""}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}
