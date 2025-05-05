import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { api } from '../services/api';
import { Reciter, Surah, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type ReciterScreenRouteProp = RouteProp<RootStackParamList, 'Reciter'>;

const ReciterScreen = () => {
  const route = useRoute<ReciterScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const [reciter, setReciter] = useState<Reciter | null>(null);
  const [surahs, setSurahs] = useState<Surah[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { reciterId } = route.params as { reciterId: string };
    const [reciterData, surahsData] = await Promise.all([
      api.getReciters().then((reciters) =>
        reciters.find((r) => r.id === reciterId)
      ),
      api.getSurahs(),
    ]);
    setReciter(reciterData || null);
    setSurahs(surahsData);
  };

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={styles.surahCard}
      onPress={() =>
        navigation.navigate('Player', {
          audioId: `${reciter?.id}-${item.id}`,
        })
      }
    >
      <View style={styles.surahNumber}>
        <Text style={styles.surahNumberText}>{item.id}</Text>
      </View>
      <View style={styles.surahInfo}>
        <Text style={styles.surahName}>{item.englishName}</Text>
        <Text style={styles.surahTranslation}>
          {item.englishNameTranslation}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (!reciter) {
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
          source={{ uri: reciter.imageUrl || 'https://via.placeholder.com/150' }}
          style={styles.reciterImage}
        />
        <Text style={styles.reciterName}>{reciter.name}</Text>
        <Text style={styles.reciterStyle}>{reciter.style}</Text>
      </View>

      <FlatList
        data={surahs}
        renderItem={renderSurahItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.surahsList}
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
    alignItems: 'center',
    padding: SIZES.base * 2,
    backgroundColor: COLORS.primary,
  },
  reciterImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SIZES.base,
  },
  reciterName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SIZES.base / 2,
  },
  reciterStyle: {
    fontSize: SIZES.font,
    color: COLORS.background,
    opacity: 0.8,
  },
  surahsList: {
    padding: SIZES.base,
  },
  surahCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    marginBottom: SIZES.base,
    ...SHADOWS.light,
  },
  surahNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
  },
  surahNumberText: {
    color: COLORS.background,
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
  surahInfo: {
    flex: 1,
  },
  surahName: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  surahTranslation: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
});

export default ReciterScreen; 