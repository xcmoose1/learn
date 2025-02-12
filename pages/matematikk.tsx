import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import Button from '../components/Button';
import TierVenner from '../components/TierVenner';
import { POINTS_PER_CORRECT_ANSWER, getScore, updateScore } from '../lib/score';
import { useAudio } from '../hooks/useAudio';

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
  const [visHjelp, setVisHjelp] = useState(false);
  const { play, isPlaying } = useAudio();

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Matematikk</h1>
          <p className="text-xl mb-4">Poeng: {totalScore}</p>
            
          {!currentGame && (
            <div className="space-y-6">
              <div className="flex justify-center space-x-4 mb-8">
                <button
                  onClick={() => setVisHjelp(true)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition-transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>🤔</span>
                  <span>Trenger du hjelp?</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Button onClick={() => setCurrentGame('tier-venner')}>
                  <span className="text-xl">🎯 Tier-venner</span>
                  <span className="text-sm block mt-2">Øv på tall som blir 10, 20, 30...</span>
                </Button>
                <Button onClick={() => setCurrentGame('fotball-matte')}>
                  <span className="text-xl">⚽ Fotball-matte</span>
                  <span className="text-sm block mt-2">Regn med mål, poeng og spillere</span>
                </Button>
              </div>
            </div>
          )}

          {visHjelp && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
              onClick={() => setVisHjelp(false)}
            >
              <div 
                className="bg-gray-800 p-6 rounded-xl max-w-md w-full space-y-4"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-center mb-4">La meg hjelpe deg! 🌟</h2>
                
                <div className="space-y-6 text-left">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-green-400">🎯 Tier-venner:</h3>
                      <button
                        onClick={() => play('help.tier_venner.title')}
                        disabled={isPlaying}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all hover:scale-105"
                      >
                        🔊 Les høyt
                      </button>
                    </div>
                    <p>Tenk på det som å lage et fotballag!</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Hvis du har 7 spillere, hvor mange flere trenger du for å ha et helt lag med 10?</li>
                      <li>Det er som å telle hvor mange spillere som mangler på banen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-green-400">⚽ Fotball-matte:</h3>
                      <button
                        onClick={() => play('help.fotball_matte.title')}
                        disabled={isPlaying}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-all hover:scale-105"
                      >
                        🔊 Les høyt
                      </button>
                    </div>
                    <p>Her regner vi med:</p>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      <li>Mål i kamper - akkurat som å telle Haaland sine scoringer!</li>
                      <li>Poeng i serien - 3 poeng for seier, som i ekte fotball</li>
                      <li>Tilskuere på kamp - som å telle hvor mange som heier på laget ditt</li>
                    </ul>
                  </div>
                </div>

                <button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-full mt-6"
                  onClick={() => setVisHjelp(false)}
                >
                  Jeg forstår! 👍
                </button>
              </div>
            </div>
          )}
          {currentGame === 'tier-venner' ? (
            <TierVenner onScoreUpdate={handleScoreUpdate} onBack={() => setCurrentGame(null)} />
          ) : (
            <div className="max-w-2xl mx-auto">
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
                    <div className={`text-center text-lg font-bold ${
                      feedback.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {feedback.message}
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
