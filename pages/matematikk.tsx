import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import TierVenner from '../components/TierVenner';
import { POINTS_PER_CORRECT_ANSWER, getScore, updateScore } from '../lib/score';

type GameType = 'tier-venner' | 'fotball-matte';

interface Problem {
  question: string;
  answer: number;
}

const players = ['Haaland', 'Ødegaard', 'Ada Hegerberg', 'Caroline Graham Hansen', 'Ronaldo', 'Messi'];
const teams = ['Manchester City', 'Arsenal', 'Barcelona', 'Real Madrid', 'Liverpool'];

const generateProblem = (): Problem => {
  const problemTypes = [
    // Type 1: Mål i to omganger
    () => {
      const player = players[Math.floor(Math.random() * players.length)];
      const goals1 = Math.floor(Math.random() * 4);
      const goals2 = Math.floor(Math.random() * 4);
      return {
        question: `${player} scorer ${goals1} mål i første omgang og ${goals2} mål i andre omgang. Hvor mange mål scorer ${player} totalt?`,
        answer: goals1 + goals2
      };
    },
    // Type 2: Poeng etter kamper
    () => {
      const team = teams[Math.floor(Math.random() * teams.length)];
      const wins = Math.floor(Math.random() * 4) + 1;
      return {
        question: `${team} vinner ${wins} kamper. Hvor mange poeng får de totalt når man får 3 poeng for seier?`,
        answer: wins * 3
      };
    },
    // Type 3: Tilskuere fordelt på tribuner
    () => {
      const total = (Math.floor(Math.random() * 5) + 3) * 1000;
      const section1 = Math.floor(total / 2);
      return {
        question: `Det er ${total} tilskuere på stadion. ${section1} sitter på hovedtribunen. Hvor mange sitter på de andre tribunene?`,
        answer: total - section1
      };
    }
  ];

  const randomType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
  return randomType();
};

export default function Matematikk() {
  const [currentGame, setCurrentGame] = useState<GameType | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    setTotalScore(getScore());
  }, []);

  useEffect(() => {
    if (currentGame === 'fotball-matte' && !currentProblem) {
      setCurrentProblem(generateProblem());
    }
  }, [currentGame, currentProblem]);

  const handleScoreUpdate = (points: number) => {
    updateScore(points);
    setTotalScore(getScore());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProblem) return;

    const formData = new FormData(e.currentTarget);
    const numAnswer = parseInt(formData.get('answer') as string);
    
    if (numAnswer === currentProblem.answer) {
      handleScoreUpdate(POINTS_PER_CORRECT_ANSWER);
      setFeedback({ message: 'Riktig! 🎉', isCorrect: true });
      // Generer nytt spørsmål etter 1.5 sekunder
      setTimeout(() => {
        setCurrentProblem(generateProblem());
        setFeedback(null);
        (e.target as HTMLFormElement).reset();
      }, 1500);
    } else {
      setFeedback({ message: 'Prøv igjen! 💪', isCorrect: false });
    }
  };

  return (
    <Layout title="Matematikk">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl mb-4 text-white">
            Matematikk
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Poeng: {totalScore}
          </p>
        </motion.div>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tier-Venner Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-blue/30 backdrop-blur-sm rounded-xl p-6 hover:bg-dark-blue/40 transition-colors"
            >
              <h2 className="text-2xl font-heading text-white mb-4">Tier-Venner</h2>
              <p className="text-gray-300 mb-6">
                Finn tallpar som blir 10 til sammen. Kan du klare 5 på rad?
              </p>
              <Button
                onClick={() => setCurrentGame('tier-venner')}
                variant="primary"
                fullWidth
              >
                Start spillet
              </Button>
            </motion.div>

            {/* Fotball-Matte Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-blue/30 backdrop-blur-sm rounded-xl p-6 hover:bg-dark-blue/40 transition-colors"
            >
              <h2 className="text-2xl font-heading text-white mb-4">Fotball-Matte</h2>
              <p className="text-gray-300 mb-6">
                Løs morsomme matteoppgaver med fotballtema!
              </p>
              <Button
                onClick={() => setCurrentGame('fotball-matte')}
                variant="primary"
                fullWidth
              >
                Start spillet
              </Button>
            </motion.div>
          </div>
        ) : currentGame === 'tier-venner' ? (
          <TierVenner onScoreUpdate={handleScoreUpdate} onBack={() => setCurrentGame(null)} />
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-dark-blue/30 backdrop-blur-sm rounded-xl p-8">
              <Button
                onClick={() => setCurrentGame(null)}
                variant="secondary"
                className="mb-6"
              >
                ← Tilbake til meny
              </Button>

              <h2 className="text-2xl font-heading text-white mb-6">
                {currentProblem?.question}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="number"
                    name="answer"
                    placeholder="Skriv ditt svar her..."
                    className="w-full px-4 py-2 bg-dark-blue/20 border border-neon-blue/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    required
                  />
                </div>

                <Button type="submit" variant="primary" fullWidth>
                  Svar
                </Button>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-center text-lg font-bold ${
                      feedback.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {feedback.message}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
