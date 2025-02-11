import { useState } from 'react';
import styles from '../styles/TierVenner.module.css';

interface Props {
  onScoreUpdate: (points: number) => void;
  onBack: () => void;
}

export default function TierVenner({ onScoreUpdate, onBack }: Props) {
  const [svar, setSvar] = useState<number | null>(null);
  const [riktigSvar, setRiktigSvar] = useState<boolean | null>(null);
  const [valgtTier, setValgtTier] = useState<number | null>(null);
  const [tall1, setTall1] = useState<number>(0);
  const [manglendeTall, setManglendeTall] = useState<number>(0);
  const [streak, setStreak] = useState(0);
  const [visNesteSporsmaal, setVisNesteSporsmaal] = useState(false);

  const genererTall = (tier: number) => {
    const nyttTall1 = Math.floor(Math.random() * 9) + 1;
    const nyttManglendeTall = tier - nyttTall1;
    setTall1(nyttTall1);
    setManglendeTall(nyttManglendeTall);
  };

  const sjekkSvar = (valgtSvar: number) => {
    setSvar(valgtSvar);
    const erRiktig = valgtSvar === manglendeTall;
    setRiktigSvar(erRiktig);
    
    if (erRiktig) {
      onScoreUpdate(10); // Gi 10 poeng for riktig svar
      setStreak(streak + 1);
      const audio = new Audio('/sounds/correct.mp3');
      audio.play();
    } else {
      setStreak(0);
      const audio = new Audio('/sounds/incorrect.mp3');
      audio.play();
    }
    setVisNesteSporsmaal(true);
  };

  const lagAlternativer = () => {
    const riktigSvar = manglendeTall;
    let alternativer = [riktigSvar];
    
    while (alternativer.length < 4) {
      const avvik = Math.floor(Math.random() * 3) + 1;
      const feilSvar = riktigSvar + (Math.random() < 0.5 ? avvik : -avvik);
      
      if (!alternativer.includes(feilSvar) && feilSvar > 0) {
        alternativer.push(feilSvar);
      }
    }
    
    return alternativer.sort(() => Math.random() - 0.5);
  };

  const nesteSporsmaal = () => {
    setSvar(null);
    setRiktigSvar(null);
    setVisNesteSporsmaal(false);
    if (valgtTier) {
      genererTall(valgtTier);
    }
  };

  const velgTier = (tier: number) => {
    setValgtTier(tier);
    genererTall(tier);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button 
          className={`${styles.backButton} ${styles.delButton}`}
          onClick={onBack}
        >
          ← Tilbake til meny
        </button>
        <div className={styles.scoreBoard}>
          <div className={styles.scoreItem}>
            <span>Streak: {streak} 🔥</span>
          </div>
        </div>
      </div>

      {!valgtTier ? (
        <div className={styles.tierValg}>
          <h2>Velg hvilken tier du vil øve på:</h2>
          <div className={styles.tierButtons}>
            {[10, 20, 30, 40, 50].map((tier) => (
              <button
                key={tier}
                onClick={() => velgTier(tier)}
                className={styles.tierButton}
              >
                {tier}-venner
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.gameCard}>
          <h2 className={styles.question}>
            Hva er {valgtTier}-vennen til {tall1}?
            <span className={styles.emoji}>🤔</span>
          </h2>

          <div className={styles.optionsGrid}>
            {lagAlternativer().map((alternativ, index) => (
              <button
                key={index}
                onClick={() => !svar && sjekkSvar(alternativ)}
                disabled={svar !== null}
                className={`${styles.optionButton} 
                  ${svar === alternativ && riktigSvar ? styles.correct : ''}
                  ${svar === alternativ && !riktigSvar ? styles.wrong : ''}
                  ${svar !== null && alternativ === manglendeTall ? styles.showCorrect : ''}`}
              >
                {alternativ}
              </button>
            ))}
          </div>

          {visNesteSporsmaal && (
            <div className={styles.feedback}>
              {riktigSvar ? (
                <div className={styles.correctFeedback}>
                  <p>Supert! 🌟 Du er kjempeflink!</p>
                  <div className={styles.celebration}>
                    🎉 {streak > 1 ? `${streak} i streak! 🔥` : ''}
                  </div>
                </div>
              ) : (
                <div className={styles.wrongFeedback}>
                  <p>Prøv igjen! {valgtTier}-vennen til {tall1} er {manglendeTall}</p>
                  <p className={styles.encouragement}>Du klarer det neste gang! 💪</p>
                </div>
              )}
              <button onClick={nesteSporsmaal} className={styles.nextButton}>
                Neste spørsmål →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
