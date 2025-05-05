import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { Playlist } from '../types';

const PlaylistsScreen = () => {
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist: Playlist = {
        id: Date.now().toString(),
        name: newPlaylistName.trim(),
        surahs: [],
        createdAt: new Date(),
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
      setIsCreating(false);
    }
  };

  const renderPlaylistItem = ({ item }: { item: Playlist }) => (
    <TouchableOpacity
      style={styles.playlistCard}
      onPress={() => {
        // Navigate to playlist detail
      }}
    >
      <View style={styles.playlistInfo}>
        <Text style={styles.playlistName}>{item.name}</Text>
        <Text style={styles.playlistCount}>
          {item.surahs.length} Surahs
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Playlists</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsCreating(true)}
        >
          <Ionicons name="add" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>

      {isCreating && (
        <View style={styles.createForm}>
          <TextInput
            style={styles.input}
            placeholder="Playlist Name"
            value={newPlaylistName}
            onChangeText={setNewPlaylistName}
            autoFocus
          />
          <View style={styles.createActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => {
                setIsCreating(false);
                setNewPlaylistName('');
              }}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.submitButton]}
              onPress={createPlaylist}
            >
              <Text style={[styles.actionButtonText, styles.submitButtonText]}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <FlatList
        data={playlists}
        renderItem={renderPlaylistItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.playlistsList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No playlists yet. Create one to get started!
          </Text>
        }
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createForm: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    marginBottom: SIZES.base * 2,
    ...SHADOWS.light,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    marginBottom: SIZES.base,
  },
  createActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: SIZES.base * 2,
    paddingVertical: SIZES.base,
    borderRadius: SIZES.base,
    marginLeft: SIZES.base,
  },
  cancelButton: {
    backgroundColor: COLORS.border,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  actionButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: COLORS.background,
  },
  playlistsList: {
    paddingVertical: SIZES.base,
  },
  playlistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.base,
    padding: SIZES.base,
    marginBottom: SIZES.base,
    ...SHADOWS.light,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistName: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  playlistCount: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textLight,
    marginTop: SIZES.base * 4,
  },
});

export default PlaylistsScreen; 