import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { api } from '../services/api';
import { AudioFile, Reciter, Surah, RootStackParamList } from '../types';
import { AudioPlayer } from '../components/AudioPlayer';

type PlayerScreenRouteProp = RouteProp<RootStackParamList, 'Player'>;

const PlayerScreen = () => {
  const route = useRoute<PlayerScreenRouteProp>();
  const [audio, setAudio] = useState<AudioFile | null>(null);
  const [reciter, setReciter] = useState<Reciter | null>(null);
  const [surah, setSurah] = useState<Surah | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { audioId } = route.params as { audioId: string };
    const [reciterId, surahId] = audioId.split('-');

    const [reciterData, surahData, audioData] = await Promise.all([
      api.getReciters().then((reciters) =>
        reciters.find((r) => r.id === reciterId)
      ),
      api.getSurahs().then((surahs) =>
        surahs.find((s) => s.id === parseInt(surahId))
      ),
      api.getAudioFiles(reciterId, parseInt(surahId)).then((files) => files[0]),
    ]);

    setReciter(reciterData || null);
    setSurah(surahData || null);
    setAudio(audioData || null);
  };

  if (!audio || !reciter || !surah) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: reciter.imageUrl || 'https://via.placeholder.com/200' }}
          style={styles.reciterImage}
        />
        <Text style={styles.reciterName}>{reciter.name}</Text>
        <Text style={styles.surahName}>{surah.englishName}</Text>
        <Text style={styles.surahTranslation}>
          {surah.englishNameTranslation}
        </Text>
      </View>

      <View style={styles.playerContainer}>
        <AudioPlayer audio={audio} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="heart-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="share-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton}>
          <Ionicons name="download-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: SIZES.base * 2,
    backgroundColor: COLORS.primary,
  },
  reciterImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: SIZES.base,
  },
  reciterName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.base / 2,
  },
  surahName: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.base / 2,
  },
  surahTranslation: {
    fontSize: SIZES.font,
    color: COLORS.background,
    opacity: 0.8,
  },
  playerContainer: {
    flex: 1,
    padding: SIZES.base * 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: SIZES.base * 2,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  controlButton: {
    padding: SIZES.base,
  },
});

export default PlayerScreen; 