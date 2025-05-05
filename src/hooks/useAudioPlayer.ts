import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { AudioFile } from '../types';

export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<AudioFile | null>(null);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAudio = async (audio: AudioFile) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audio.url },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setCurrentAudio(audio);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setDuration(status.durationMillis);
      setPosition(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const play = async () => {
    try {
      if (sound) {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const pause = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
      }
    } catch (error) {
      console.error('Error pausing audio:', error);
    }
  };

  const seek = async (position: number) => {
    try {
      if (sound) {
        await sound.setPositionAsync(position);
      }
    } catch (error) {
      console.error('Error seeking audio:', error);
    }
  };

  return {
    currentAudio,
    isPlaying,
    duration,
    position,
    loadAudio,
    play,
    pause,
    seek,
  };
}; 