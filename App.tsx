import React from 'react';
import { StatusBar } from 'react-native';
import { Navigation } from './src/navigation';
import { COLORS } from './src/constants/theme';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />
      <Navigation />
    </>
  );
}
