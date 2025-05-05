import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

const SettingsScreen = () => {
  const [notifications, setNotifications] = useState(true);
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const renderSettingItem = (
    title: string,
    description: string,
    value: boolean,
    onValueChange: (value: boolean) => void
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={COLORS.background}
      />
    </View>
  );

  const renderActionItem = (title: string, icon: string, onPress: () => void) => (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <View style={styles.actionInfo}>
        <Ionicons name={icon} size={24} color={COLORS.primary} />
        <Text style={styles.actionTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {renderSettingItem(
          'Notifications',
          'Receive notifications for new recitations',
          notifications,
          setNotifications
        )}
        {renderSettingItem(
          'Download over Wi-Fi only',
          'Only download audio files when connected to Wi-Fi',
          downloadOverWifi,
          setDownloadOverWifi
        )}
        {renderSettingItem(
          'Auto-play next',
          'Automatically play the next surah',
          autoPlay,
          setAutoPlay
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Storage</Text>
        {renderActionItem('Clear Cache', 'trash-outline', () => {})}
        {renderActionItem('Downloaded Files', 'download-outline', () => {})}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        {renderActionItem('Rate App', 'star-outline', () => {})}
        {renderActionItem('Privacy Policy', 'shield-outline', () => {})}
        {renderActionItem('Terms of Service', 'document-text-outline', () => {})}
        {renderActionItem('Version 1.0.0', 'information-circle-outline', () => {})}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    padding: SIZES.base * 2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.base,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  settingInfo: {
    flex: 1,
    marginRight: SIZES.base,
  },
  settingTitle: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginBottom: SIZES.base / 2,
  },
  settingDescription: {
    fontSize: SIZES.small,
    color: COLORS.textLight,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  actionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionTitle: {
    fontSize: SIZES.font,
    color: COLORS.text,
    marginLeft: SIZES.base,
  },
});

export default SettingsScreen; 