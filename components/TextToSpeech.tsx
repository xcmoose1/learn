import React, { useState, useEffect } from 'react';

interface TextToSpeechProps {
  text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynth, setSpeechSynth] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynth(window.speechSynthesis);
    }
  }, []);

  useEffect(() => {
    if (speechSynth) {
      const newUtterance = new SpeechSynthesisUtterance(text);
      
      // Sett norsk som språk
      newUtterance.lang = 'nb-NO';
      
      // Juster hastighet og tonehøyde for barn
      newUtterance.rate = 0.9;  // Litt saktere
      newUtterance.pitch = 1.1; // Litt lysere

      newUtterance.onend = () => {
        setIsPlaying(false);
      };

      setUtterance(newUtterance);

      return () => {
        speechSynth.cancel();
      };
    }
  }, [text, speechSynth]);

  const toggleSpeech = () => {
    if (!speechSynth || !utterance) return;

    if (isPlaying) {
      speechSynth.cancel();
      setIsPlaying(false);
    } else {
      speechSynth.cancel(); // Stopp eventuell tidligere avspilling
      speechSynth.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!speechSynth) {
    return null;
  }

  return (
    <button
      onClick={toggleSpeech}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
        isPlaying
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
      aria-label={isPlaying ? 'Stopp opplesing' : 'Les høyt'}
    >
      {isPlaying ? (
        <>
          <StopIcon />
          Stopp
        </>
      ) : (
        <>
          <PlayIcon />
          Les høyt
        </>
      )}
    </button>
  );
};

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const StopIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" />
  </svg>
);

export default TextToSpeech;
