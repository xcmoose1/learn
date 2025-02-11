import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import SoundEffects from './SoundEffects';

interface TierVennerProps {
  onScoreUpdate: (points: number) => void;
  onBack: () => void;
  audioEnabled?: boolean;
}

type Level = {
  target: number;
  name: string;
  description: string;
  points: number;
};

const levels: Level[] = [
  { target: 10, name: 'Ti-Venner', description: 'Finn tallpar som blir 10', points: 10 },
  { target: 20, name: 'Tjue-Venner', description: 'Finn tallpar som blir 20', points: 20 },
  { target: 30, name: 'Tretti-Venner', description: 'Finn tallpar som blir 30', points: 30 },
  { target: 40, name: 'Førti-Venner', description: 'Finn tallpar som blir 40', points: 40 },
  { target: 50, name: 'Femti-Venner', description: 'Finn tallpar som blir 50', points: 50 }
];

const TierVenner: React.FC<TierVennerProps> = ({ onScoreUpdate, onBack, audioEnabled = false }) => {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLevelSelect, setShowLevelSelect] = useState(true);

  useEffect(() => {
    if (!showLevelSelect && !currentLevel) {
      startNewLevel(levels[0]);
    }
  }, [showLevelSelect]);

  const startNewLevel = (level: Level) => {
    setCurrentLevel(level);
    generateNewProblem(level.target);
    setStreak(0);
    setShowLevelSelect(false);
  };

  const generateNewProblem = (target: number) => {
    const number = Math.floor(Math.random() * (target - 1)) + 1;
    const correctAnswer = target - number;
    
    let wrongOptions: number[] = [];
    while (wrongOptions.length < 3) {
      const wrong = Math.floor(Math.random() * target * 1.5);
      if (wrong !== correctAnswer && !wrongOptions.includes(wrong) && wrong >= 0) {
        wrongOptions.push(wrong);
      }
    }
    
    const allOptions = [...wrongOptions, correctAnswer];
    setCurrentNumber(number);
    setOptions(allOptions);
  };

  const handleAnswer = (answer: number) => {
    if (!currentLevel) return;

    const correct = answer + currentNumber === currentLevel.target;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const points = currentLevel.points * (newStreak > 3 ? 2 : 1);
      setScore(prev => prev + points);
      onScoreUpdate(points);

      if (newStreak >= 5) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setShowLevelSelect(true);
        }, 2000);
      } else {
        setTimeout(() => {
          setShowFeedback(false);
          generateNewProblem(currentLevel.target);
        }, 1500);
      }
    } else {
      setStreak(0);
      setTimeout(() => {
        setShowFeedback(false);
        generateNewProblem(currentLevel.target);
      }, 1500);
    }
  };

  if (showLevelSelect) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-8">Velg et nivå</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {levels.map((level) => (
            <motion.div
              key={level.target}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => startNewLevel(level)}
                variant="primary"
                fullWidth
                className="h-24 flex flex-col items-center justify-center"
              >
                <span className="text-xl font-bold">{level.name}</span>
                <span className="text-sm">{level.description}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SoundEffects
        enabled={audioEnabled}
        playCorrect={showFeedback && isCorrect}
        playWrong={showFeedback && !isCorrect}
        playSuccess={showSuccess}
      />

      <div className="flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="secondary"
        >
          ← Tilbake
        </Button>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{currentLevel?.name}</h2>
          <p className="text-gray-600">Poeng: {score}</p>
        </div>
        <div className="w-24" /> {/* For å balansere layouten */}
      </div>

      <div className="bg-white rounded-lg p-8 shadow-lg">
        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-center"
            >
              <h3 className="text-3xl font-bold mb-4">Gratulerer! 🎉</h3>
              <p className="text-xl">Du har klart 5 på rad!</p>
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="text-6xl font-bold mb-8">{currentNumber}</div>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    variant={
                      showFeedback
                        ? option + currentNumber === currentLevel?.target
                          ? 'success'
                          : 'error'
                        : 'primary'
                    }
                    disabled={showFeedback}
                    fullWidth
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-xl font-bold"
                >
                  {isCorrect ? (
                    <span className="text-green-500">Riktig! 🎉</span>
                  ) : (
                    <span className="text-red-500">Prøv igjen! 💪</span>
                  )}
                </motion.div>
              )}
              <div className="mt-4 text-gray-600">
                Streak: {streak} {streak > 3 ? '🔥' : ''}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TierVenner;
