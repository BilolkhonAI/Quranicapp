import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AudioPlayer } from './AudioPlayer';
import { AudioFile } from '../types';

describe('AudioPlayer', () => {
  const mockAudio: AudioFile = {
    id: '1',
    surahId: 1,
    reciterId: '1',
    url: 'https://example.com/audio.mp3',
    duration: 180000, // 3 minutes in milliseconds
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<AudioPlayer audio={mockAudio} />);
    expect(getByTestId('play-pause-button')).toBeTruthy();
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('handles play/pause button press', () => {
    const { getByTestId } = render(<AudioPlayer audio={mockAudio} />);
    const playButton = getByTestId('play-pause-button');
    fireEvent.press(playButton);
    // Add more assertions based on your implementation
  });

  it('handles seek bar interaction', () => {
    const { getByTestId } = render(<AudioPlayer audio={mockAudio} />);
    const seekBar = getByTestId('slider');
    fireEvent(seekBar, 'onSlidingComplete', 90000); // Seek to 1.5 minutes
    // Add more assertions based on your implementation
  });
}); 