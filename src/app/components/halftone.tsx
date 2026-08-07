"use client";
import React, { useEffect, useRef } from "react";
import {
  MUSIC_SPECTRUM_EVENT,
  type MusicSpectrumDetail,
} from "../lib/music-spectrum";

type Fit = "cover" | "tile";
type Align = "top" | "center" | "bottom";

export type Dot = { x: number; y: number; r: number; c: string; lum: number };

const REACTIVE_STAR_COLORS = [
  "#00D4FF",
  "#6F70FF",
  "#B8B5FF",
  "#D94F8A",
  "#D4ECDD",
];
const REACTIVE_LAYER_COUNT = 3;

/**
 * Live halftone renderer. Samples an image on a grid and draws it as
 * brightness-scaled dots on a canvas that fills its parent element.
 * The dot grid is exposed on the canvas element as `__halftoneDots`
 * so the dots can be animated / played with.
 *
 * fit="cover"  — image covers the container (like background-size: cover)
 * fit="tile"   — image tiles at its per-viewport scale (for starfields)
 * detail       — subdivide cells 2x where contrast/brightness is high, so
 *                subjects (characters) render at double resolution while
 *                flat dark areas stay coarse
 */
export default function Halftone({
  src,
  mobileSrc,
  cell = 5,
  gamma = 0.55,
  boost = 1.35,
  floor = 0.14,
  lift = 1.35,
  fit = "cover",
  align = "center",
  mobileAlign,
  detail = false,
  realSubjects = false,
  audioReactive = false,
  deferMs = 64,
  preview = false,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  cell?: number;
  gamma?: number;
  boost?: number;
  floor?: number;
  lift?: number;
  fit?: Fit;
  align?: Align;
  mobileAlign?: Align;
  detail?: boolean;
  realSubjects?: boolean;
  audioReactive?: boolean;
  deferMs?: number;
  preview?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reactiveCanvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reactiveCanvases = reactiveCanvasRefs.current.filter(
      (layer): layer is HTMLCanvasElement => Boolean(layer),
    );
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dots: Dot[] = [];
    let base: HTMLCanvasElement | null = null;
    let reactiveLayers: HTMLCanvasElement[] = [];
    let disposed = false;
    let visible = false;
    let buildQueued = false;
    let buildVersion = 0;
    let buildTimer: number | null = null;
    let resizeTimer: number | null = null;
    let lastWidth = 0;
    let lastHeight = 0;
    const dpr = Math.min(
      window.devicePixelRatio || 1,
      window.innerWidth < 640 ? 1 : 1.25,
    );
    // Reactive light is rendered at CSS-pixel resolution. Three musical
    // layers therefore use roughly the same memory as the old two DPR layers.
    const reactiveDpr = Math.min(1, dpr);

    const drawPreview = () => {
      if (!preview) return;
      const W = Math.ceil(parent.clientWidth);
      const H = Math.ceil(parent.clientHeight);
      if (!W || !H) return;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const isMobile = window.innerWidth < 640;
      const chosen = isMobile && mobileSrc ? mobileSrc : src;
      const vAlign = isMobile && mobileAlign ? mobileAlign : align;
      const image = new Image();
      image.decoding = "async";
      image.src = chosen;
      image.onload = () => {
        if (disposed || base) return;
        const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
        const drawnWidth = image.width * scale;
        const drawnHeight = image.height * scale;
        const x = (canvas.width - drawnWidth) / 2;
        const y =
          vAlign === "top"
            ? 0
            : vAlign === "bottom"
              ? canvas.height - drawnHeight
              : (canvas.height - drawnHeight) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, x, y, drawnWidth, drawnHeight);

        const maskTile = document.createElement("canvas");
        const spacing = Math.max(4, Math.round(4.8 * dpr));
        maskTile.width = spacing;
        maskTile.height = spacing;
        const maskContext = maskTile.getContext("2d");
        if (!maskContext) return;
        maskContext.fillStyle = "#fff";
        maskContext.beginPath();
        maskContext.arc(spacing / 2, spacing / 2, 1.45 * dpr, 0, 6.2832);
        maskContext.fill();
        const pattern = ctx.createPattern(maskTile, "repeat");
        if (!pattern) return;
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
      };
    };

    const build = () => {
      const W = Math.ceil(parent.clientWidth);
      const H = Math.ceil(parent.clientHeight);
      if (!W || !H) return;
      if (W === lastWidth && H === lastHeight && base) return;
      lastWidth = W;
      lastHeight = H;
      const version = ++buildVersion;
      const targetWidth = Math.ceil(W * dpr);
      const targetHeight = Math.ceil(H * dpr);
      const reactiveWidth = Math.ceil(W * reactiveDpr);
      const reactiveHeight = Math.ceil(H * reactiveDpr);
      const reactiveScale = reactiveDpr / dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      const isMobile = window.innerWidth < 640;
      const chosen = isMobile && mobileSrc ? mobileSrc : src;
      const vAlign = isMobile && mobileAlign ? mobileAlign : align;

      const img = new Image();
      img.decoding = "async";
      img.src = chosen;
      img.onload = () => {
        if (disposed || version !== buildVersion) return;
        // sample at fine resolution; without detail, fine == cell
        const sub = detail ? 2 : 1;
        const cellF = cell / sub;
        const colsF = Math.ceil(W / cellF);
        const rowsF = Math.ceil(H / cellF);
        const off = document.createElement("canvas");
        off.width = colsF;
        off.height = rowsF;
        const octx = off.getContext("2d", { willReadFrequently: true });
        if (!octx) return;

        if (fit === "tile") {
          const tileH = Math.max(1, Math.round(window.innerHeight / cellF));
          const tileW = Math.max(
            1,
            Math.round((img.width * (window.innerHeight / img.height)) / cellF)
          );
          for (let ty = 0; ty < rowsF; ty += tileH) {
            for (let tx = 0; tx < colsF; tx += tileW) {
              octx.drawImage(img, tx, ty, tileW, tileH);
            }
          }
        } else {
          const scale = Math.max(colsF / img.width, rowsF / img.height);
          const dw = img.width * scale;
          const dh = img.height * scale;
          const dx = (colsF - dw) / 2;
          const dy =
            vAlign === "top" ? 0 : vAlign === "bottom" ? rowsF - dh : (rowsF - dh) / 2;
          octx.drawImage(img, dx, dy, dw, dh);
        }

        const data = octx.getImageData(0, 0, colsF, rowsF).data;
        dots = [];
        reactiveLayers = [];
        let subjectMask: Uint8Array | null = null;
        const csF = cellF * dpr;
        const maxRF = csF / 2;
        const cs = cell * dpr;
        const maxR = cs / 2;

        const lumAt = (i: number) =>
          (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255;

        const pushDot = (px: number, py: number, r: number, g: number, b: number, lum: number, mR: number) => {
          if (lum < 0.015) return;
          let frac = Math.min(1, Math.pow(lum, gamma) * boost);
          frac = Math.max(frac, floor);
          const quantize = (value: number) =>
            Math.min(255, Math.round(Math.min(255, value * lift) / 32) * 32);
          dots.push({
            x: px,
            y: py,
            r: mR * frac,
            c: `rgb(${quantize(r)},${quantize(g)},${quantize(b)})`,
            lum,
          });
        };

        if (!detail) {
          for (let y = 0; y < rowsF; y++) {
            for (let x = 0; x < colsF; x++) {
              const i = (y * colsF + x) * 4;
              pushDot(
                x * csF + csF / 2,
                y * csF + csF / 2,
                data[i], data[i + 1], data[i + 2],
                lumAt(i),
                maxRF
              );
            }
          }
        } else {
          for (let cy = 0; cy < rowsF; cy += 2) {
            for (let cx = 0; cx < colsF; cx += 2) {
              // gather the 2x2 block of fine samples
              let minL = 1, maxL = 0;
              let sr = 0, sg = 0, sb = 0, n = 0;
              for (let oy = 0; oy < 2; oy++) {
                for (let ox = 0; ox < 2; ox++) {
                  const yy = cy + oy, xx = cx + ox;
                  if (yy >= rowsF || xx >= colsF) continue;
                  const i = (yy * colsF + xx) * 4;
                  const l = lumAt(i);
                  if (l < minL) minL = l;
                  if (l > maxL) maxL = l;
                  sr += data[i]; sg += data[i + 1]; sb += data[i + 2];
                  n++;
                }
              }
              if (!n) continue;
              const subdivide = maxL - minL > 0.1 || maxL > 0.45;
              if (subdivide) {
                for (let oy = 0; oy < 2; oy++) {
                  for (let ox = 0; ox < 2; ox++) {
                    const yy = cy + oy, xx = cx + ox;
                    if (yy >= rowsF || xx >= colsF) continue;
                    const i = (yy * colsF + xx) * 4;
                    pushDot(
                      xx * csF + csF / 2,
                      yy * csF + csF / 2,
                      data[i], data[i + 1], data[i + 2],
                      lumAt(i),
                      maxRF
                    );
                  }
                }
              } else {
                const avgLum = (0.299 * sr + 0.587 * sg + 0.114 * sb) / (255 * n);
                pushDot(
                  (cx / 2) * cs + cs / 2,
                  (cy / 2) * cs + cs / 2,
                  sr / n, sg / n, sb / n,
                  avgLum,
                  maxR
                );
              }
            }
          }
        }

        base = document.createElement("canvas");
        base.width = targetWidth;
        base.height = targetHeight;
        const bctx = base.getContext("2d");
        if (!bctx) return;
        bctx.fillStyle = "#000";
        bctx.fillRect(0, 0, base.width, base.height);
        const pathsByColor = new Map<string, Path2D>();
        for (const d of dots) {
          let path = pathsByColor.get(d.c);
          if (!path) {
            path = new Path2D();
            pathsByColor.set(d.c, path);
          }
          path.moveTo(d.x + d.r, d.y);
          path.arc(d.x, d.y, d.r, 0, 6.2832);
        }
        pathsByColor.forEach((path, color) => {
          bctx.fillStyle = color;
          bctx.fill(path);
        });
        // bright / colorful regions (the characters and the ground they're on)
        // come through as the real image, feathered into the dot field
        if (realSubjects) {
          const mask = new Uint8Array(colsF * rowsF);
          for (let px = 0, i = 0; px < colsF * rowsF; px++, i += 4) {
            const mx = Math.max(data[i], data[i + 1], data[i + 2]) / 255;
            if (mx > 0.2) mask[px] = 1;
          }
          // erode once: lone stars stay halftone
          const eroded = new Uint8Array(colsF * rowsF);
          for (let y = 0; y < rowsF; y++) {
            for (let x = 0; x < colsF; x++) {
              const idx = y * colsF + x;
              if (!mask[idx]) continue;
              let nb = 0;
              for (let oy = -1; oy <= 1; oy++) {
                for (let ox = -1; ox <= 1; ox++) {
                  if (!ox && !oy) continue;
                  const yy = y + oy, xx = x + ox;
                  if (yy < 0 || xx < 0 || yy >= rowsF || xx >= colsF) continue;
                  nb += mask[yy * colsF + xx];
                }
              }
              if (nb >= 5) eroded[idx] = 1;
            }
          }
          // dilate twice: keep the ground right around them
          let cur = eroded;
          for (let pass = 0; pass < 2; pass++) {
            const next = new Uint8Array(colsF * rowsF);
            for (let y = 0; y < rowsF; y++) {
              for (let x = 0; x < colsF; x++) {
                const idx = y * colsF + x;
                if (cur[idx]) { next[idx] = 1; continue; }
                let hit = false;
                for (let oy = -1; oy <= 1 && !hit; oy++) {
                  for (let ox = -1; ox <= 1 && !hit; ox++) {
                    const yy = y + oy, xx = x + ox;
                    if (yy < 0 || xx < 0 || yy >= rowsF || xx >= colsF) continue;
                    if (cur[yy * colsF + xx]) hit = true;
                  }
                }
                if (hit) next[idx] = 1;
              }
            }
            cur = next;
          }
          // the ground band only comes through near the characters, not
          // as a full-width strip along the bottom edge
          const bandRows = Math.round(rowsF * 0.2);
          let sMinX = colsF, sMaxX = -1;
          for (let y = 0; y < rowsF - bandRows; y++) {
            for (let x = 0; x < colsF; x++) {
              if (cur[y * colsF + x]) {
                if (x < sMinX) sMinX = x;
                if (x > sMaxX) sMaxX = x;
              }
            }
          }
          if (sMaxX >= 0) {
            const pad = Math.round(colsF * 0.03);
            for (let y = rowsF - bandRows; y < rowsF; y++) {
              for (let x = 0; x < colsF; x++) {
                if (x < sMinX - pad || x > sMaxX + pad) cur[y * colsF + x] = 0;
              }
            }
          }

          subjectMask = cur;

          let any = false;
          for (let k = 0; k < cur.length; k++) if (cur[k]) { any = true; break; }
          if (any) {
            const mc = document.createElement("canvas");
            mc.width = colsF;
            mc.height = rowsF;
            const mctx = mc.getContext("2d");
            if (mctx) {
              const mimg = mctx.createImageData(colsF, rowsF);
              for (let k = 0; k < cur.length; k++) {
                mimg.data[k * 4] = 255;
                mimg.data[k * 4 + 1] = 255;
                mimg.data[k * 4 + 2] = 255;
                mimg.data[k * 4 + 3] = cur[k] ? 255 : 0;
              }
              mctx.putImageData(mimg, 0, 0);

              const layer = document.createElement("canvas");
              layer.width = targetWidth;
              layer.height = targetHeight;
              const lctx = layer.getContext("2d");
              if (lctx) {
                if (fit === "tile") {
                  const tileHpx = Math.max(1, Math.round(window.innerHeight * dpr));
                  const tileWpx = Math.max(1, Math.round(img.width * (window.innerHeight / img.height) * dpr));
                  for (let ty = 0; ty < layer.height; ty += tileHpx) {
                    for (let tx = 0; tx < layer.width; tx += tileWpx) {
                      lctx.drawImage(img, tx, ty, tileWpx, tileHpx);
                    }
                  }
                } else {
                  const sc2 = Math.max(layer.width / img.width, layer.height / img.height);
                  const dw2 = img.width * sc2;
                  const dh2 = img.height * sc2;
                  const dx2 = (layer.width - dw2) / 2;
                  const dy2 = vAlign === "top" ? 0 : vAlign === "bottom" ? layer.height - dh2 : (layer.height - dh2) / 2;
                  lctx.drawImage(img, dx2, dy2, dw2, dh2);
                }
                lctx.globalCompositeOperation = "destination-in";
                lctx.filter = `blur(${2 * dpr}px)`;
                lctx.drawImage(mc, 0, 0, layer.width, layer.height);
                lctx.filter = "none";
                lctx.globalCompositeOperation = "source-over";
                bctx.drawImage(layer, 0, 0);
              }
            }
          }
        }

        if (audioReactive) {
          // Keep the reactive bloom away from the illustrated subjects. The
          // extra clearance prevents large star glows from spilling back over
          // Calvin and Hobbes even when the source dot itself is just outside
          // the subject mask.
          let starExclusionMask = subjectMask;
          if (subjectMask) {
            let expanded = subjectMask;
            for (let pass = 0; pass < 4; pass++) {
              const next = expanded.slice();
              for (let y = 0; y < rowsF; y++) {
                for (let x = 0; x < colsF; x++) {
                  const index = y * colsF + x;
                  if (!expanded[index]) continue;
                  for (let oy = -1; oy <= 1; oy++) {
                    for (let ox = -1; ox <= 1; ox++) {
                      const yy = y + oy;
                      const xx = x + ox;
                      if (yy < 0 || xx < 0 || yy >= rowsF || xx >= colsF) continue;
                      next[yy * colsF + xx] = 1;
                    }
                  }
                }
              }
              expanded = next;
            }
            starExclusionMask = expanded;
          }

          const starDots = dots.filter((dot) => {
            if (dot.lum < 0.1) return false;
            const sampleX = Math.min(
              colsF - 1,
              Math.max(0, Math.floor(dot.x / csF)),
            );
            const sampleY = Math.min(
              rowsF - 1,
              Math.max(0, Math.floor(dot.y / csF)),
            );
            return !starExclusionMask?.[sampleY * colsF + sampleX];
          });
          const stride = Math.max(1, Math.ceil(starDots.length / 1800));

          reactiveLayers = Array.from({ length: REACTIVE_LAYER_COUNT }, () => {
            const layer = document.createElement("canvas");
            layer.width = reactiveWidth;
            layer.height = reactiveHeight;
            return layer;
          });
          const bloomPaths = REACTIVE_STAR_COLORS.map(() => new Path2D());
          const corePaths = REACTIVE_STAR_COLORS.map(() => new Path2D());

          for (let index = 0; index < starDots.length; index += stride) {
            const dot = starDots[index];
            const gridX = Math.floor(dot.x / cs);
            const gridY = Math.floor(dot.y / cs);
            const band = Math.abs(gridX + gridY * 3) % REACTIVE_STAR_COLORS.length;
            const x = dot.x * reactiveScale;
            const y = dot.y * reactiveScale;
            const bloomRadius = Math.max(
              dot.r * reactiveScale * (band === 4 ? 2.15 : 2.8),
              1.1 * reactiveDpr,
            );
            const coreRadius = Math.max(
              dot.r * reactiveScale * (band === 4 ? 0.9 : 1.25),
              0.55 * reactiveDpr,
            );
            bloomPaths[band].moveTo(x + bloomRadius, y);
            bloomPaths[band].arc(x, y, bloomRadius, 0, 6.2832);
            corePaths[band].moveTo(x + coreRadius, y);
            corePaths[band].arc(x, y, coreRadius, 0, 6.2832);
          }

          REACTIVE_STAR_COLORS.forEach((color, band) => {
            const layerIndex = band < 2 ? 0 : band < 4 ? 1 : 2;
            const layerContext = reactiveLayers[layerIndex].getContext("2d");
            if (!layerContext) return;
            layerContext.save();
            layerContext.fillStyle = color;
            layerContext.shadowColor = color;
            layerContext.shadowBlur = (band === 4 ? 4 : 7) * reactiveDpr;
            layerContext.globalAlpha = band === 4 ? 0.18 : 0.15;
            layerContext.fill(bloomPaths[band]);
            layerContext.shadowBlur = band === 4 ? 2 : 4;
            layerContext.globalAlpha = 1;
            layerContext.fill(corePaths[band]);
            layerContext.restore();
          });
        }

        (canvas as HTMLCanvasElement & { __halftoneDots?: Dot[] }).__halftoneDots = dots;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(base, 0, 0);
        reactiveCanvases.forEach((layerCanvas, index) => {
          layerCanvas.width = reactiveWidth;
          layerCanvas.height = reactiveHeight;
          layerCanvas.style.width = `${W}px`;
          layerCanvas.style.height = `${H}px`;
          const layerContext = layerCanvas.getContext("2d");
          layerContext?.clearRect(0, 0, reactiveWidth, reactiveHeight);
          if (reactiveLayers[index]) {
            layerContext?.drawImage(reactiveLayers[index], 0, 0);
          }
        });
      };
    };

    const handleSpectrum = (event: Event) => {
      if (!audioReactive || !base) return;
      const { levels, playing, beat, energy, shimmer } = (
        event as CustomEvent<MusicSpectrumDetail>
      ).detail;

      if (!playing || !visible) {
        reactiveCanvases.forEach((layer) => {
          layer.style.opacity = "0";
        });
        return;
      }

      const layerLevels = [
        (levels[0] ?? 0) * 0.68 + (levels[1] ?? 0) * 0.32,
        (levels[2] ?? 0) * 0.44 + (levels[3] ?? 0) * 0.56,
        (levels[3] ?? 0) * 0.22 + (levels[4] ?? 0) * 0.78,
      ];
      reactiveCanvases.forEach((layer, index) => {
        const level = Math.max(0, Math.min(1, layerLevels[index] ?? 0));
        const response = Math.pow(level, index === 2 ? 1.12 : 0.82);
        const opacity = index === 0
          ? response * 0.42 + beat * 0.32
          : index === 1
            ? response * 0.56 + energy * 0.12 + beat * 0.08
            : response * 0.72 + shimmer * 0.24;
        layer.style.opacity = String(Math.min(index === 2 ? 0.92 : 0.78, opacity));

        const scale = index === 0
          ? 1 + beat * 0.0045 + response * 0.0015
          : index === 1
            ? 1 + beat * 0.0018 + energy * 0.0012
            : 1 + shimmer * 0.0009;
        layer.style.transform = `translate3d(0, 0, 0) scale(${scale})`;
      });
    };

    const scheduleBuild = () => {
      if (disposed || !visible || buildQueued) return;
      buildQueued = true;

      const run = () => {
        buildQueued = false;
        buildTimer = null;
        if (!disposed && visible) build();
      };

      buildTimer = window.setTimeout(run, deferMs);
    };

    drawPreview();

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          scheduleBuild();
        } else {
          reactiveCanvases.forEach((layer) => {
            layer.style.opacity = "0";
          });
        }
      },
      { rootMargin: "-180px 0px" },
    );
    intersectionObserver.observe(parent);

    const ro = new ResizeObserver(() => {
      const nextWidth = Math.ceil(parent.clientWidth);
      const nextHeight = Math.ceil(parent.clientHeight);
      if (base && nextWidth === lastWidth && nextHeight === lastHeight) return;
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeTimer = null;
        lastWidth = 0;
        lastHeight = 0;
        scheduleBuild();
      }, 150);
    });
    ro.observe(parent);
    window.addEventListener(MUSIC_SPECTRUM_EVENT, handleSpectrum);
    return () => {
      disposed = true;
      buildVersion += 1;
      ro.disconnect();
      intersectionObserver.disconnect();
      if (buildTimer !== null) window.clearTimeout(buildTimer);
      if (resizeTimer !== null) window.clearTimeout(resizeTimer);
      window.removeEventListener(MUSIC_SPECTRUM_EVENT, handleSpectrum);
    };
  }, [src, mobileSrc, cell, gamma, boost, floor, lift, fit, align, mobileAlign, detail, realSubjects, audioReactive, deferMs, preview]);

  return (
    <>
      <canvas ref={canvasRef} className={className} aria-hidden="true" />
      {audioReactive &&
        Array.from({ length: REACTIVE_LAYER_COUNT }, (_, index) => (
          <canvas
            key={index}
            ref={(layer) => {
              reactiveCanvasRefs.current[index] = layer;
            }}
            className={`${className} pointer-events-none origin-center mix-blend-screen transition-[opacity,transform] duration-75 ease-linear`}
            style={{ opacity: 0 }}
            aria-hidden="true"
          />
        ))}
    </>
  );
}
