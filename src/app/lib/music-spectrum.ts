export const MUSIC_SPECTRUM_EVENT = "void-music-spectrum";

export type MusicSpectrumDetail = {
  levels: number[];
  playing: boolean;
  beat: number;
  energy: number;
  shimmer: number;
  climax: number;
  phase: number;
};
