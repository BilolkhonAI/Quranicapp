import { renderHook, act } from '@testing-library/react-hooks';
import { useAudioPlayer } from './useAudioPlayer';
import { AudioFile } from '../types';

describe('useAudioPlayer', () => {
  const mockAudio: AudioFile = {
    id: '1',
    surahId: 1,
    reciterId: '1',
    url: 'https://example.com/audio.mp3',
    duration: 180000, // 3 minutes in milliseconds
  };

  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useAudioPlayer());
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.duration).toBe(0);
    expect(result.current.position).toBe(0);
  });

  it('loads audio correctly', () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => {
      result.current.loadAudio(mockAudio);
    });
    expect(result.current.duration).toBe(mockAudio.duration);
  });

  it('toggles play/pause state', () => {
    const { result } = renderHook(() => useAudioPlayer());
    act(() => {
      result.current.loadAudio(mockAudio);
      result.current.play();
    });
    expect(result.current.isPlaying).toBe(true);

    act(() => {
      result.current.pause();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('seeks to correct position', () => {
    const { result } = renderHook(() => useAudioPlayer());
    const seekPosition = 90000; // 1.5 minutes
    act(() => {
      result.current.loadAudio(mockAudio);
      result.current.seek(seekPosition);
    });
    expect(result.current.position).toBe(seekPosition);
  });
}); 