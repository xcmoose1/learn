import { useState, useEffect, useCallback } from 'react';
import audioData from '../data/audio.json';

type AudioPath = string;

interface UseAudioReturn {
  play: (audioId: string) => void;
  isPlaying: boolean;
  error: string | null;
  generateAudio: (text: string, fileName: string) => Promise<string>;
}

export function useAudio(): UseAudioReturn {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const play = useCallback((audioId: string) => {
    const path = getAudioPath(audioId);
    if (!path) {
      setError(`Audio not found for ID: ${audioId}`);
      return;
    }

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    const newAudio = new Audio(path);
    newAudio.onplay = () => setIsPlaying(true);
    newAudio.onended = () => {
      setIsPlaying(false);
      newAudio.currentTime = 0;
    };
    newAudio.onerror = () => {
      setError(`Error playing audio: ${path}`);
      setIsPlaying(false);
    };

    setAudio(newAudio);
    newAudio.play().catch(err => {
      setError(`Error playing audio: ${err.message}`);
      setIsPlaying(false);
    });
  }, [audio]);

  const generateAudio = useCallback(async (text: string, fileName: string): Promise<string> => {
    try {
      const response = await fetch('/api/generate-voice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, fileName }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const data = await response.json();
      return data.path;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating audio');
      throw err;
    }
  }, []);

  return { play, isPlaying, error, generateAudio };
}

function getAudioPath(audioId: string): string | undefined {
  const parts = audioId.split('.');
  let current: any = audioData;
  
  for (const part of parts) {
    if (current[part] === undefined) {
      return undefined;
    }
    current = current[part];
  }
  
  return typeof current === 'string' ? current : undefined;
}
