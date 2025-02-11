import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface QuizCardProps {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (isCorrect: boolean) => void;
}

export default function QuizCard({
  question,
  options,
  correctAnswer,
  onAnswer,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    const isCorrect = answer === correctAnswer;
    
    // Delay the feedback to show animation
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };

  return (
    <motion.div
      className="scoreboard max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Question */}
      <div className="mb-6">
        <h3 className="font-heading text-2xl text-white mb-2">
          {question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option}
            className={`
              btn-neon p-4 rounded-lg text-left transition-all
              ${selectedAnswer === option
                ? option === correctAnswer
                  ? 'bg-gradient-to-r from-green-500 to-green-600'
                  : 'bg-gradient-to-r from-red-500 to-red-600'
                : ''
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => !selectedAnswer && handleAnswer(option)}
            disabled={!!selectedAnswer}
          >
            <div className="flex items-center">
              <span className="font-tech text-lg mr-3">{String.fromCharCode(65 + index)}</span>
              <span className="flex-1">{option}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback Animation */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {selectedAnswer === correctAnswer ? (
              <div className="goal-animation flex flex-col items-center">
                <div className="text-6xl mb-2">⚽</div>
                <div className="font-heading text-4xl text-neon-green">MÅL!!</div>
                <div className="text-2xl text-white">+10 poeng</div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="text-6xl mb-2">❌</div>
                <div className="font-heading text-4xl text-red-500">Prøv igjen!</div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-neon-blue"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: selectedAnswer ? 1 : 0 }}
        transition={{ duration: 1.5 }}
      />
    </motion.div>
  );
}
