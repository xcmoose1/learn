import { useState, useEffect } from 'react';
import Head from 'next/head';
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

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <Head>
        <title>Matematikk | Læringsportal</title>
        <meta name="description" content="Lær matematikk gjennom morsomme spill" />
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Matematikk
          </h1>
          <p className="text-xl text-gray-600">
            Totale poeng: {totalScore}
          </p>
        </div>

        {!currentGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Tier-Venner
              </h2>
              <p className="text-gray-600 mb-4">
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

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Fotball-Matte
              </h2>
              <p className="text-gray-600 mb-4">
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
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => {
                  setCurrentGame(null);
                  setCurrentProblem(null);
                  setFeedback(null);
                }}
                variant="secondary"
              >
                ← Tilbake til spill
              </Button>
            </div>

            {currentGame === 'tier-venner' ? (
              <TierVenner onScoreUpdate={handleScoreUpdate} audioEnabled={false} />
            ) : currentProblem && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Fotball-Matte</h2>
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-3xl font-bold text-gray-900">
                        Fotballmatematikk
                      </h1>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">Poeng: {totalScore}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-6 mb-6">
                      <p className="text-xl text-gray-800 mb-4">{currentProblem.question}</p>
                      <form onSubmit={handleAnswerSubmit} className="space-y-4">
                        <div>
                          <input
                            type="number"
                            name="answer"
                            className="w-full px-4 py-2 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                            placeholder="Skriv svaret her..."
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          variant="primary"
                          fullWidth
                        >
                          Sjekk svar
                        </Button>

                        {feedback && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`text-center text-xl font-bold ${
                              feedback.isCorrect ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {feedback.message}
                          </motion.div>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
