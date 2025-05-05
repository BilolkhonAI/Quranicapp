import { Reciter, Surah, AudioFile } from '../types';

const BASE_URL = 'https://quranicaudio.com/api';

export const api = {
  async getReciters(): Promise<Reciter[]> {
    try {
      const response = await fetch(`${BASE_URL}/reciters`);
      const data = await response.json();
      return data.map((reciter: any) => ({
        id: reciter.id,
        name: reciter.name,
        style: reciter.style,
        imageUrl: reciter.image_url,
      }));
    } catch (error) {
      console.error('Error fetching reciters:', error);
      return [];
    }
  },

  async getSurahs(): Promise<Surah[]> {
    try {
      const response = await fetch(`${BASE_URL}/surahs`);
      const data = await response.json();
      return data.map((surah: any) => ({
        id: surah.id,
        name: surah.name,
        englishName: surah.english_name,
        englishNameTranslation: surah.english_name_translation,
        numberOfAyahs: surah.number_of_ayahs,
        revelationType: surah.revelation_type,
      }));
    } catch (error) {
      console.error('Error fetching surahs:', error);
      return [];
    }
  },

  async getAudioFiles(reciterId: string, surahId: number): Promise<AudioFile[]> {
    try {
      const response = await fetch(`${BASE_URL}/audio_files?reciter_id=${reciterId}&surah_id=${surahId}`);
      const data = await response.json();
      return data.map((audio: any) => ({
        id: audio.id,
        surahId: audio.surah_id,
        reciterId: audio.reciter_id,
        url: audio.url,
        duration: audio.duration,
      }));
    } catch (error) {
      console.error('Error fetching audio files:', error);
      return [];
    }
  },
}; 