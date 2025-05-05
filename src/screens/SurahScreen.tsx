import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { api } from '../services/api';
import { Surah, AudioFile, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type SurahScreenRouteProp = RouteProp<RootStackParamList, 'Surah'>;

const SurahScreen = () => {
  const route = useRoute<SurahScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [surah, setSurah] = useState<Surah | null>(null);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { surahId } = route.params as { surahId: number };
    const [surahData, audioFilesData] = await Promise.all([
      api.getSurahs().then((surahs) =>
        surahs.find((s) => s.id === surahId)
      ),
      api.getAudioFiles('1', surahId), // Using first reciter for now
    ]);
    setSurah(surahData || null);
    setAudioFiles(audioFilesData);
  };

  const renderAudioItem = ({ item }: { item: AudioFile }) => (
    <TouchableOpacity
      style={styles.audioCard}
      onPress={() =>
        navigation.navigate('Player', {
          audioId: item.id,
        })
      }
    >
      <View style={styles.audioInfo}>
        <Text style={styles.audioTitle}>Recitation {item.id}</Text>
        <Text style={styles.audioDuration}>
          {Math.floor(item.duration / 60000)} minutes
        </Text>
      </View>
      <Text style={styles.playButton}>Play</Text>
    </TouchableOpacity>
  );

  if (!surah) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.surahName}>{surah.englishName}</Text>
        <Text style={styles.surahTranslation}>
          {surah.englishNameTranslation}
        </Text>
        <Text style={styles.surahInfo}>
          {surah.numberOfAyahs} Verses • {surah.revelationType}
        </Text>
      </View>

      <FlatList
        data={audioFiles}
        renderItem={renderAudioItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.audioList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.base * 2,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
  },
  surahName: {
    fontSize: SIZES.extraLarge,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.base / 2,
  },
  surahTranslation: {
    fontSize: SIZES.large,
    color: COLORS.background,
    marginBottom: SIZES.base / 2,
  },
  surahInfo: {
    fontSize: SIZES.font,
    color: COLORS.background,
    opacity: 0.8,
  },
  audioList: {
    padding: SIZES.base,
  },
  audioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    marginBottom: SIZES.base,
    ...SHADOWS.light,
  },
  audioInfo: {
    flex: 1,
  },
  audioTitle: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  audioDuration: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  playButton: {
    fontSize: SIZES.font,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

export default SurahScreen; 