import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import leseoppgaver from '../data/leseoppgaver.json';

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

// Bruk native Web Speech API
const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nb-NO'; // Norsk bokmål
    utterance.rate = 0.9; // Litt saktere tale
    speechSynthesis.speak(utterance);
  }
};

export default function Lesespill() {
  const [currentDel, setCurrentDel] = useState<Del>(leseoppgaver.deler[0]);
  const [currentOppgave, setCurrentOppgave] = useState<Oppgave>(leseoppgaver.deler[0].oppgaver[0]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showDelVelger, setShowDelVelger] = useState(true);
  const [score, setScore] = useState(0);

  // Stopp tale når komponenten unmountes
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadText = () => {
    speak(currentOppgave.text);
  };

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    const correct = option === currentOppgave.answer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 10);
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
      <Layout title="Lesespill - Velg Del">
        <div className="max-w-4xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading text-4xl mb-4 text-white">
              Velg Del
            </h1>
            <p className="text-xl text-gray-300">
              Poeng: {score}
            </p>
          </motion.div>

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
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={`Lesespill - ${currentDel.tittel}`}>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={() => setShowDelVelger(true)}
            variant="secondary"
          >
            ← Tilbake til deler
          </Button>
          <h2 className="text-xl font-bold text-white">Del {currentDel.id}: {currentDel.tittel}</h2>
          <div className="w-24 text-right text-white">
            Poeng: {score}
          </div>
        </div>

        <motion.div
          key={currentOppgave.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-dark-blue/30 backdrop-blur-sm rounded-lg p-8 mb-8"
        >
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
                className="text-3xl font-bold mb-4 text-white"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {currentOppgave.title}
              </motion.h1>
              
              <div className="mb-6">
                <motion.p 
                  className="text-lg leading-relaxed mb-4 text-gray-300"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentOppgave.text}
                </motion.p>
                
                <Button
                  onClick={handleReadText}
                  variant="secondary"
                  className="mb-4"
                >
                  🔊 Les høyt
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
                    <h3 className="text-xl font-bold mb-4 text-white">{currentOppgave.question}</h3>
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

        {/* Fremgangsbar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Oppgave {currentOppgave.id} av {currentDel.oppgaver.length}</span>
            <span>{Math.round((currentOppgave.id / currentDel.oppgaver.length) * 100)}% fullført</span>
          </div>
          <div className="w-full h-2 bg-dark-blue rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon-blue"
              initial={{ width: 0 }}
              animate={{ 
                width: `${(currentOppgave.id / currentDel.oppgaver.length) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
