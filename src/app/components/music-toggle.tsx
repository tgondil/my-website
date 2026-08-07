"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PiMusicNoteFill } from "react-icons/pi";
import { MUSIC_SPECTRUM_EVENT } from "../lib/music-spectrum";

const HALFTONE_SAMPLE_SIZE = 2.5;
const RESTING_BAR_SCALE = 0.14;
// Void is bass-led and atmospheric: sub-bass breath, low warmth, vocals,
// presence, then the narrow high-frequency detail that carries its shimmer.
const VISUALIZER_BANDS = [
  [35, 110],
  [110, 260],
  [260, 800],
  [800, 2600],
  [2600, 9000],
] as const;
const INITIAL_BAND_PEAKS = [0.15, 0.14, 0.12, 0.1, 0.075];
const BAND_GAINS = [1.08, 1.02, 0.96, 1.05, 1.18];
const BAND_ATTACK = [0.34, 0.3, 0.27, 0.36, 0.48];
const BAND_RELEASE = [0.075, 0.085, 0.1, 0.13, 0.2];
const CLIMAX_TRANSITION_SECONDS = 1.6;
const CLIMAX_EXIT_SECONDS = 1.2;
const CLIMAX_WINDOWS = [
  [69, 90],
  [135, 170],
] as const;

const smoothstep = (value: number) => value * value * (3 - 2 * value);

const getClimaxState = (audioTime: number) => {
  const activeWindow = CLIMAX_WINDOWS.find(
    ([start, end]) => audioTime >= start && audioTime < end,
  );
  if (!activeWindow) return { intensity: 0, phase: 0 };

  const [start, end] = activeWindow;
  const entrance = Math.min(
    1,
    Math.max(0, (audioTime - start) / CLIMAX_TRANSITION_SECONDS),
  );
  const exit = Math.min(
    1,
    Math.max(0, (end - audioTime) / CLIMAX_EXIT_SECONDS),
  );

  return {
    intensity: smoothstep(Math.min(entrance, exit)),
    phase: audioTime - start,
  };
};

const HERO_STARS = {
  mobile: {
    imageWidth: 728,
    imageHeight: 1072,
    x: 528,
    y: 468,
    align: "top",
    color: "rgb(238, 246, 242)",
  },
  desktop: {
    imageWidth: 1920,
    imageHeight: 1080,
    x: 1599,
    y: 722,
    align: "center",
    color: "rgb(238, 246, 242)",
  },
} as const;

type StarPosition = {
  left: number;
  top: number;
  color: string;
};

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);
  const visualizerFrameRef = useRef<number | null>(null);
  const lastSpectrumPublishRef = useRef(0);
  const bandPeaksRef = useRef([...INITIAL_BAND_PEAKS]);
  const smoothedLevelsRef = useRef(VISUALIZER_BANDS.map(() => 0));
  const bassHistoryRef = useRef<number[]>([]);
  const beatEnvelopeRef = useRef(0);
  const previousAirRef = useRef(0);
  const lastBeatRef = useRef(-1000);
  const visualizerBarRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [starLayer, setStarLayer] = useState<HTMLElement | null>(null);
  const [starPosition, setStarPosition] = useState<StarPosition | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("#hero-dots");
    const layer = document.querySelector<HTMLElement>("#music-star-layer");
    if (!hero || !layer) return;
    setStarLayer(layer);

    const placeStar = () => {
      const width = hero.clientWidth;
      const height = hero.clientHeight;
      if (!width || !height) return;

      const star =
        window.innerWidth < 640 ? HERO_STARS.mobile : HERO_STARS.desktop;
      const sampleWidth = Math.ceil(width / HALFTONE_SAMPLE_SIZE);
      const sampleHeight = Math.ceil(height / HALFTONE_SAMPLE_SIZE);
      const imageScale = Math.max(
        sampleWidth / star.imageWidth,
        sampleHeight / star.imageHeight,
      );
      const drawnWidth = star.imageWidth * imageScale;
      const drawnHeight = star.imageHeight * imageScale;
      const imageLeft = (sampleWidth - drawnWidth) / 2;
      const imageTop =
        star.align === "top" ? 0 : (sampleHeight - drawnHeight) / 2;
      const sampleX = Math.round(imageLeft + star.x * imageScale);
      const sampleY = Math.round(imageTop + star.y * imageScale);

      setStarPosition({
        left: sampleX * HALFTONE_SAMPLE_SIZE + HALFTONE_SAMPLE_SIZE / 2,
        top: sampleY * HALFTONE_SAMPLE_SIZE + HALFTONE_SAMPLE_SIZE / 2,
        color: star.color,
      });
    };

    placeStar();
    const resizeObserver = new ResizeObserver(placeStar);
    resizeObserver.observe(hero);
    window.addEventListener("resize", placeStar);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", placeStar);
    };
  }, []);

  const resetVisualizer = () => {
    visualizerBarRefs.current.forEach((bar) => {
      if (!bar) return;
      bar.style.transform = `scaleY(${RESTING_BAR_SCALE})`;
      bar.style.opacity = "0.55";
    });
  };

  const publishSpectrum = (
    levels: number[],
    playing: boolean,
    beat = 0,
    energy = 0,
    shimmer = 0,
    climax = 0,
    phase = 0,
  ) => {
    window.dispatchEvent(
      new CustomEvent(MUSIC_SPECTRUM_EVENT, {
        detail: { levels, playing, beat, energy, shimmer, climax, phase },
      }),
    );
  };

  const stopVisualizer = () => {
    if (visualizerFrameRef.current !== null) {
      window.cancelAnimationFrame(visualizerFrameRef.current);
      visualizerFrameRef.current = null;
    }
    bandPeaksRef.current = [...INITIAL_BAND_PEAKS];
    smoothedLevelsRef.current = VISUALIZER_BANDS.map(() => 0);
    bassHistoryRef.current = [];
    beatEnvelopeRef.current = 0;
    previousAirRef.current = 0;
    lastBeatRef.current = -1000;
    resetVisualizer();
    publishSpectrum(VISUALIZER_BANDS.map(() => 0), false);
  };

  const drawVisualizer = (timestamp: number) => {
    const analyser = analyserRef.current;
    const context = audioContextRef.current;
    if (!analyser || !context) return;

    const frequencyData =
      frequencyDataRef.current ?? new Uint8Array(analyser.frequencyBinCount);
    frequencyDataRef.current = frequencyData;
    analyser.getByteFrequencyData(frequencyData);
    const nyquist = context.sampleRate / 2;
    const rawLevels: number[] = [];
    const levels = smoothedLevelsRef.current;

    VISUALIZER_BANDS.forEach(([lowFrequency, highFrequency], index) => {
      const startBin = Math.max(
        1,
        Math.floor((lowFrequency / nyquist) * frequencyData.length),
      );
      const endBin = Math.max(
        startBin + 1,
        Math.ceil((highFrequency / nyquist) * frequencyData.length),
      );
      let squaredTotal = 0;

      for (let bin = startBin; bin < endBin; bin += 1) {
        const amplitude = (frequencyData[bin] ?? 0) / 255;
        squaredTotal += amplitude * amplitude;
      }

      const rms = Math.sqrt(
        squaredTotal / Math.max(1, endBin - startBin),
      );
      const adjusted = Math.max(0, rms - (index < 2 ? 0.018 : 0.01));
      rawLevels[index] = adjusted;

      const decayedPeak = bandPeaksRef.current[index] * 0.9992;
      const peak = Math.max(adjusted, decayedPeak, 0.035);
      bandPeaksRef.current[index] = peak;
      const normalized = Math.min(1, adjusted / peak);
      const target = Math.min(
        1,
        Math.pow(normalized, 0.72) * BAND_GAINS[index],
      );
      const response = target > levels[index]
        ? BAND_ATTACK[index]
        : BAND_RELEASE[index];
      levels[index] += (target - levels[index]) * response;

      const bar = visualizerBarRefs.current[index];
      if (bar) {
        const barLevel = RESTING_BAR_SCALE + levels[index] * (1 - RESTING_BAR_SCALE);
        bar.style.transform = `scaleY(${barLevel})`;
        bar.style.opacity = String(0.5 + levels[index] * 0.5);
      }
    });

    const bass = (rawLevels[0] ?? 0) * 0.72 + (rawLevels[1] ?? 0) * 0.28;
    const bassHistory = bassHistoryRef.current;
    bassHistory.push(bass);
    if (bassHistory.length > 48) bassHistory.shift();
    const bassMean = bassHistory.reduce((sum, value) => sum + value, 0) /
      Math.max(1, bassHistory.length);
    const bassVariance = bassHistory.reduce(
      (sum, value) => sum + (value - bassMean) ** 2,
      0,
    ) / Math.max(1, bassHistory.length);
    const beatThreshold = bassMean + Math.sqrt(bassVariance) * 1.05;
    const isBeat =
      bassHistory.length > 14 &&
      bass > Math.max(0.055, beatThreshold) &&
      bass > bassMean * 1.13 &&
      timestamp - lastBeatRef.current > 240;
    if (isBeat) {
      beatEnvelopeRef.current = 1;
      lastBeatRef.current = timestamp;
    } else {
      beatEnvelopeRef.current *= 0.9;
    }

    const energy = Math.min(
      1,
      levels[0] * 0.25 +
        levels[1] * 0.2 +
        levels[2] * 0.2 +
        levels[3] * 0.22 +
        levels[4] * 0.13,
    );
    const air = levels[4] ?? 0;
    const airOnset = Math.max(0, air - previousAirRef.current);
    previousAirRef.current = air;
    const shimmer = Math.min(1, air * 0.72 + airOnset * 4.5);
    const audioTime = audioRef.current?.currentTime ?? 0;
    const { intensity: climax, phase: climaxPhase } = getClimaxState(audioTime);

    if (timestamp - lastSpectrumPublishRef.current >= 40) {
      publishSpectrum(
        [...levels],
        true,
        beatEnvelopeRef.current,
        energy,
        shimmer,
        climax,
        climaxPhase,
      );
      lastSpectrumPublishRef.current = timestamp;
    }

    visualizerFrameRef.current = window.requestAnimationFrame(drawVisualizer);
  };

  const startVisualizer = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedLevels = [0.35, 0.55, 0.8, 0.55, 0.35];
      visualizerBarRefs.current.forEach((bar, index) => {
        if (bar) bar.style.transform = `scaleY(${reducedLevels[index]})`;
      });
      publishSpectrum(reducedLevels, true, 0, 0.46, 0.28);
      return;
    }

    if (visualizerFrameRef.current !== null) {
      window.cancelAnimationFrame(visualizerFrameRef.current);
    }
    lastSpectrumPublishRef.current = 0;
    visualizerFrameRef.current = window.requestAnimationFrame(drawVisualizer);
  };

  const ensureAudioGraph = async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    audio.volume = 0.45;

    if (!audioContextRef.current) {
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.55;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      audioSourceRef.current = source;
      analyserRef.current = analyser;
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return true;
  };

  useEffect(() => {
    const audio = audioRef.current;

    return () => {
      if (visualizerFrameRef.current !== null) {
        window.cancelAnimationFrame(visualizerFrameRef.current);
      }
      audio?.pause();
      audioSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      void audioContextRef.current?.close();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      if (!(await ensureAudioGraph())) return;
      await audio.play();
    } catch {
      setHasError(true);
      setIsPlaying(false);
      stopVisualizer();
    }
  };

  const actionLabel = hasError
    ? "Void by The Neighbourhood is unavailable"
    : isPlaying
      ? "Pause Void by The Neighbourhood"
      : "Play Void by The Neighbourhood";

  return (
    <>
      {starLayer && createPortal(
        <button
          type="button"
          onClick={toggleMusic}
          disabled={hasError}
          aria-label={actionLabel}
          aria-pressed={isPlaying}
          title={actionLabel}
          style={
            starPosition
              ? {
                  left: starPosition.left,
                  top: starPosition.top,
                  color: isPlaying ? "rgb(0, 212, 255)" : starPosition.color,
                }
              : undefined
          }
          className={`music-star-button pointer-events-auto absolute z-30 flex h-7 w-7 items-center justify-center rounded-full transition-[color,filter,opacity] focus:outline-none sm:h-8 sm:w-8 ${
            starPosition ? "opacity-100" : "pointer-events-none opacity-0"
          } ${isPlaying ? "text-my-blue" : ""}`}
        >
          <span
            aria-hidden="true"
            className="absolute h-2 w-2 rounded-full bg-black"
          />
          <PiMusicNoteFill
            aria-hidden="true"
            className={`relative h-[9px] w-[9px] sm:h-3 sm:w-3 ${
              isPlaying ? "animate-pulse" : ""
            }`}
          />
        </button>,
        starLayer,
      )}

      {hasPlayed && <div
        role="status"
        aria-live="polite"
        aria-hidden={!isPlaying}
        className={`pointer-events-none fixed bottom-16 left-4 z-50 flex items-center gap-2.5 rounded-lg border border-white/10 bg-black/85 p-2 pr-3 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[opacity,transform] duration-300 sm:bottom-6 sm:left-6 ${
          isPlaying
            ? "translate-y-0 opacity-100"
            : "translate-y-2 opacity-0"
        }`}
      >
        <Image
          src="/void-thumb.webp"
          alt="Void cover art"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-md object-cover"
          unoptimized
        />
        <div className="min-w-0 leading-tight">
          <div
            aria-hidden="true"
            className="mb-1 flex h-3 items-end gap-[2px]"
          >
            <span
              ref={(bar) => {
                visualizerBarRefs.current[0] = bar;
              }}
              className="h-3 w-[2px] origin-bottom rounded-full bg-zanah transition-transform duration-75 ease-linear"
              style={{ transform: `scaleY(${RESTING_BAR_SCALE})` }}
            />
            <span
              ref={(bar) => {
                visualizerBarRefs.current[1] = bar;
              }}
              className="h-3 w-[2px] origin-bottom rounded-full bg-my-blue transition-transform duration-75 ease-linear"
              style={{ transform: `scaleY(${RESTING_BAR_SCALE})` }}
            />
            <span
              ref={(bar) => {
                visualizerBarRefs.current[2] = bar;
              }}
              className="h-3 w-[2px] origin-bottom rounded-full bg-my-pink transition-transform duration-75 ease-linear"
              style={{ transform: `scaleY(${RESTING_BAR_SCALE})` }}
            />
            <span
              ref={(bar) => {
                visualizerBarRefs.current[3] = bar;
              }}
              className="h-3 w-[2px] origin-bottom rounded-full bg-my-blue transition-transform duration-75 ease-linear"
              style={{ transform: `scaleY(${RESTING_BAR_SCALE})` }}
            />
            <span
              ref={(bar) => {
                visualizerBarRefs.current[4] = bar;
              }}
              className="h-3 w-[2px] origin-bottom rounded-full bg-zanah transition-transform duration-75 ease-linear"
              style={{ transform: `scaleY(${RESTING_BAR_SCALE})` }}
            />
          </div>
          <span className="sr-only">Now playing</span>
          <p className="truncate text-xs font-semibold text-white">Void</p>
          <p className="truncate text-[10px] text-white/55">
            The Neighbourhood
          </p>
        </div>
      </div>}

      <audio
        ref={audioRef}
        src="/void.mp3"
        preload="none"
        onLoadedMetadata={(event) => {
          event.currentTarget.volume = 0.45;
        }}
        onPlay={() => {
          setHasPlayed(true);
          setIsPlaying(true);
          startVisualizer();
        }}
        onPause={() => {
          setIsPlaying(false);
          stopVisualizer();
        }}
        onEnded={() => {
          setIsPlaying(false);
          stopVisualizer();
        }}
        onError={() => {
          setHasError(true);
          setIsPlaying(false);
          stopVisualizer();
        }}
      />
    </>
  );
}
