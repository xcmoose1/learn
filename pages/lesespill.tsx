import { useState } from 'react';
import leseoppgaver from '../data/leseoppgaver.json';
import styles from '../styles/Lesespill.module.css';
import Layout from '../components/Layout';

export default function Lesespill() {
  const [currentDel, setCurrentDel] = useState<number | null>(null);
  const [currentOppgave, setCurrentOppgave] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  if (currentDel === null) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>Velg en del å lese</h1>
          <div className={styles.delGrid}>
            {leseoppgaver.deler.map((del) => (
              <button
                key={del.id}
                className={styles.delButton}
                onClick={() => setCurrentDel(del.id - 1)}
              >
                <h2>Del {del.id}</h2>
                <p>{del.tittel}</p>
              </button>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  const currentDelData = leseoppgaver.deler[currentDel];
  const currentOppgaveData = currentDelData.oppgaver[currentOppgave];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    if (answer === currentOppgaveData.answer) {
      setScore(score + 1);
      setStreak(streak + 1);
      const audio = new Audio('/sounds/correct.mp3');
      audio.play();
    } else {
      setStreak(0);
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.play();
    }
  };

  const handleNextQuestion = () => {
    if (currentOppgave < currentDelData.oppgaver.length - 1) {
      setCurrentOppgave(currentOppgave + 1);
    } else {
      setCurrentDel(null);
      setCurrentOppgave(0);
    }
    setShowAnswer(false);
    setSelectedAnswer(null);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button 
          onClick={() => {
            setCurrentDel(null);
            setCurrentOppgave(0);
            setShowAnswer(false);
            setSelectedAnswer(null);
          }}
          className={styles.backButton}
        >
          ← Tilbake til meny
        </button>

        <div className={styles.scoreStreak}>
          <div>Poeng: {score}</div>
          {streak > 1 && <div> {streak} på rad!</div>}
        </div>

        <div className={styles.oppgaveContainer}>
          <h2>{currentOppgaveData.title}</h2>
          <p className={styles.oppgaveTekst}>{currentOppgaveData.text}</p>
          
          <div className={styles.questionContainer}>
            <h3>{currentOppgaveData.question}</h3>
            <div className={styles.optionsContainer}>
              {currentOppgaveData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showAnswer && handleAnswer(option)}
                  className={`${styles.optionButton} ${
                    showAnswer
                      ? option === currentOppgaveData.answer
                        ? styles.correct
                        : option === selectedAnswer
                        ? styles.incorrect
                        : ''
                      : ''
                  }`}
                  disabled={showAnswer}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showAnswer && (
            <div className={styles.feedback}>
              {selectedAnswer === currentOppgaveData.answer ? (
                <div className={styles.correct}>Riktig! </div>
              ) : (
                <div className={styles.incorrect}>
                  Prøv igjen! Riktig svar er: {currentOppgaveData.answer}
                </div>
              )}
              <button 
                onClick={handleNextQuestion}
                className={styles.nextButton}
              >
                Neste spørsmål →
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
