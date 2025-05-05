export interface Reciter {
  id: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  language: string;
  imageUrl?: string;
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface AudioFile {
  id: string;
  surahId: number;
  reciterId: string;
  url: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  surahs: Surah[];
  createdAt: Date;
}

export interface RootStackParamList {
  Home: undefined;
  Reciter: { reciterId: string };
  Surah: { surahId: number };
  Player: { audioUrl: string; title: string };
  Playlists: undefined;
  Settings: undefined;
  [key: string]: undefined | { [key: string]: string | number };
} 