import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { AudioFile } from '../types';

interface AudioPlayerProps {
  audio: AudioFile;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audio }) => {
  const {
    isPlaying,
    duration,
    position,
    loadAudio,
    play,
    pause,
    seek,
  } = useAudioPlayer();

  React.useEffect(() => {
    loadAudio(audio);
  }, [audio]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TouchableOpacity
          testID="play-pause-button"
          style={styles.playButton}
          onPress={isPlaying ? pause : play}
        >
          <Ionicons
            name={isPlaying ? 'pause' : 'play'}
            size={24}
            color={COLORS.background}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Slider
          testID="slider"
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={seek}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.primary}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SIZES.base,
    borderRadius: SIZES.base,
    ...SHADOWS.medium,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
  },
  slider: {
    flex: 1,
    marginHorizontal: SIZES.base,
  },
  timeText: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
    width: 45,
  },
}); 