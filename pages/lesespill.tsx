import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpeechSynthesis } from 'react-speech-kit';
import Head from 'next/head';
import Button from '../components/Button';
import leseoppgaver from '../data/leseoppgaver.json';
import { updateScore } from '../lib/score';

interface Oppgave {
  id: number;
  title: string;
  text: string;
  question: string;
  options: string[];
  answer: string;
  emoji: string;
}

interface Del {
  id: number;
  tittel: string;
  oppgaver: Oppgave[];
}

export default function Lesespill() {
  const [currentDel, setCurrentDel] = useState<Del>(leseoppgaver.deler[0]);
  const [currentOppgave, setCurrentOppgave] = useState<Oppgave>(leseoppgaver.deler[0].oppgaver[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showDelVelger, setShowDelVelger] = useState(true);
  const { speak, speaking, supported } = useSpeechSynthesis();

  const handleReadText = () => {
    if (supported) {
      speak({ text: currentOppgave.text });
    }
  };

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === currentOppgave.answer;
    setIsCorrect(correct);

    if (correct) {
      updateScore(10);
      setTimeout(() => {
        const currentOppgaveIndex = currentDel.oppgaver.findIndex(o => o.id === currentOppgave.id);
        if (currentOppgaveIndex < currentDel.oppgaver.length - 1) {
          setCurrentOppgave(currentDel.oppgaver[currentOppgaveIndex + 1]);
          setShowQuiz(false);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          // Ferdig med denne delen
          setShowDelVelger(true);
        }
      }, 1500);
    }
  };

  const handleDelValg = (del: Del) => {
    setCurrentDel(del);
    setCurrentOppgave(del.oppgaver[0]);
    setShowDelVelger(false);
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showDelVelger) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Velg Del - Fotballhistorier</title>
        </Head>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">Velg Del</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leseoppgaver.deler.map((del) => (
              <motion.div
                key={del.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleDelValg(del)}
                  variant="primary"
                  fullWidth
                  className="h-24 flex flex-col items-center justify-center"
                >
                  <span className="text-xl font-bold">Del {del.id}</span>
                  <span className="text-sm">{del.tittel}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Del {currentDel.id}: {currentDel.tittel} - Fotballhistorier</title>
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setShowDelVelger(true)}
            variant="secondary"
          >
            ← Tilbake til deler
          </Button>
          <h2 className="text-xl font-bold">Del {currentDel.id}: {currentDel.tittel}</h2>
          <div className="w-24" /> {/* For å balansere layouten */}
        </div>

        <div className="flex items-start space-x-6">
          <div className="w-1/4 flex justify-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-8xl"
            >
              {currentOppgave.emoji}
            </motion.div>
          </div>
          
          <div className="w-3/4">
            <motion.h1 
              className="text-3xl font-bold mb-4"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentOppgave.title}
            </motion.h1>
            
            <div className="mb-6">
              <motion.p 
                className="text-lg leading-relaxed mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {currentOppgave.text}
              </motion.p>
              
              <Button
                onClick={handleReadText}
                disabled={speaking}
                variant="secondary"
                className="mb-4"
              >
                {speaking ? 'Leser... 🔊' : 'Les høyt 🔊'}
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {!showQuiz ? (
                <motion.div
                  key="startQuiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Button
                    onClick={() => setShowQuiz(true)}
                    variant="primary"
                    fullWidth
                  >
                    Svar på spørsmål ✍️
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold mb-4">{currentOppgave.question}</h3>
                  {currentOppgave.options.map((option) => (
                    <Button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      variant={
                        selectedAnswer === option
                          ? option === currentOppgave.answer
                            ? 'success'
                            : 'error'
                          : 'secondary'
                      }
                      disabled={selectedAnswer !== null}
                      fullWidth
                    >
                      {option}
                    </Button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
