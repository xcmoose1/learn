import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  enabled: boolean;
  playCorrect?: boolean;
  playWrong?: boolean;
  playSuccess?: boolean;
}

const SoundEffects: React.FC<SoundEffectsProps> = ({ 
  enabled,
  playCorrect = false,
  playWrong = false,
  playSuccess = false
}) => {
  const goalSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const cheerSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    goalSound.current = new Audio('/sounds/goal.mp3');
    wrongSound.current = new Audio('/sounds/whistle.mp3');
    cheerSound.current = new Audio('/sounds/cheer.mp3');

    // Sett volum for hver lyd
    if (goalSound.current) goalSound.current.volume = 0.3;
    if (wrongSound.current) wrongSound.current.volume = 0.2;
    if (cheerSound.current) cheerSound.current.volume = 0.2;

    // Cleanup
    return () => {
      [goalSound.current, wrongSound.current, cheerSound.current].forEach(sound => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    if (playCorrect && goalSound.current) {
      goalSound.current.currentTime = 0;
      goalSound.current.play();
    }

    if (playWrong && wrongSound.current) {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();
    }

    if (playSuccess && cheerSound.current) {
      cheerSound.current.currentTime = 0;
      cheerSound.current.play();
    }
  }, [enabled, playCorrect, playWrong, playSuccess]);

  // Eksponerer playSound-funksjonen til window-objektet
  useEffect(() => {
    const playSound = (sound: 'goal' | 'wrong' | 'cheer') => {
      if (!enabled) return;

      const soundMap = {
        goal: goalSound.current,
        wrong: wrongSound.current,
        cheer: cheerSound.current
      };

      const audio = soundMap[sound];
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    };

    (window as any).playSound = playSound;

    return () => {
      delete (window as any).playSound;
    };
  }, [enabled]);

  return null;
};

export default SoundEffects;
