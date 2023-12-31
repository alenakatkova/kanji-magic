export enum Positions {
  X,
  Y,
}

export interface Kanji {
  kanji: string;
  keyword?: string;
  keywordPronunciation?: string;
}

export interface Radical {
  base: string;
  keyword?: string;
  keywordPronunciation?: string;
  includedIn: Kanji[];
}
export interface KanjiByPronunciationAndRadicals {
  pronunciation: string;
  radicals: Radical[];
}

export interface Coordinates {
  x: number;
  y: number;
}

export interface ColorScheme {
  background: string;
  text: string;
}
