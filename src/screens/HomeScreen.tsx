import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, SIZES, SHADOWS, FONTS, SPACING } from '../constants/theme';
import { Reciter, Surah, RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [featuredReciters, setFeaturedReciters] = useState<Reciter[]>([]);
  const [recentSurahs, setRecentSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching featured reciters...');
      
      const reciters = await getReciters();
      setFeaturedReciters(reciters);

      console.log('Fetching recent surahs...');
      const surahs = await getSurahs();
      setRecentSurahs(surahs);
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getReciters = async () => {
    try {
      console.log('Fetching featured reciters...');
      const response = await fetch('http://localhost:3000/api/edition/format/audio');
      console.log('Reciters response status:', response.status);
      const data = await response.json();
      console.log('Reciters data:', data);
      if (data.code === 200 && data.data) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching reciters:', error);
      return [];
    }
  };

  const getSurahs = async () => {
    try {
      console.log('Fetching recent surahs...');
      const response = await fetch('http://localhost:3000/api/surah');
      console.log('Surahs response status:', response.status);
      const data = await response.json();
      console.log('Surahs data:', data);
      if (data.code === 200 && data.data) {
        return data.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching surahs:', error);
      return [];
    }
  };

  const renderReciterItem = ({ item }: { item: Reciter }) => (
    <TouchableOpacity
      style={styles.reciterCard}
      onPress={() => navigation.navigate('Reciter', { reciterId: item.id })}
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
        }}
        resizeMode="cover"
      />
      <Text style={styles.reciterName}>{item.name}</Text>
      <Text style={styles.reciterStyle}>{item.language}</Text>
    </TouchableOpacity>
  );

  const renderSurahItem = ({ item }: { item: Surah }) => (
    <TouchableOpacity
      style={styles.surahCard}
      onPress={() => navigation.navigate('Surah', { surahId: item.id })}
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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Featured Reciters</Text>
      <FlatList
        horizontal
        data={featuredReciters}
        renderItem={renderReciterItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.recitersList}
      />

      <Text style={styles.sectionTitle}>Recent Surahs</Text>
      <FlatList
        data={recentSurahs}
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
    padding: SIZES.base,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginVertical: SIZES.base,
  },
  recitersList: {
    paddingVertical: SIZES.base,
  },
  reciterCard: {
    width: 120,
    marginRight: SIZES.base,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    ...SHADOWS.light,
  },
  reciterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: SIZES.base,
  },
  reciterName: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  reciterStyle: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  surahsList: {
    paddingVertical: SIZES.base,
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
    color: COLORS.textSecondary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    fontSize: FONTS.body1.fontSize,
    color: COLORS.error,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.small,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: FONTS.button.fontSize,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default HomeScreen; 