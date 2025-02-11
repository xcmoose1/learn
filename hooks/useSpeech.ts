import { useState, useEffect, useCallback } from 'react';

interface UseSpeechProps {
  text: string;
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useSpeech = ({
  text,
  lang = 'nb-NO',
  rate = 1,
  pitch = 1,
  volume = 1,
}: UseSpeechProps) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !window.speechSynthesis) {
      setSupported(false);
    }
  }, []);

  const speak = useCallback(() => {
    if (!supported) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [text, lang, rate, pitch, volume, supported]);

  const cancel = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return {
    speak,
    cancel,
    speaking,
    supported,
  };
};
