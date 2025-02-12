import { useState } from 'react';
import styles from '../styles/TierVenner.module.css';
import { useSpeech } from '../hooks/useSpeech';

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
  const [visHjelp, setVisHjelp] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const { speak, cancel, speaking, supported } = useSpeech({
    text: currentWord,
    lang: 'nb-NO',
    rate: 0.9
  });

  const playText = (text: string) => {
    setCurrentWord(text);
    setTimeout(() => speak(), 0);
  };

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
          <button
            onClick={() => setVisHjelp(true)}
            className={styles.hjelpKnapp}
          >
            🤔 Trenger du hjelp?
          </button>
        </div>
      </div>

      {visHjelp && (
        <div className={styles.hjelpModal} onClick={() => setVisHjelp(false)}>
          <div className={styles.hjelpInnhold} onClick={e => e.stopPropagation()}>
            <h2>La meg hjelpe deg med {valgtTier || 10}-venner! 🌟</h2>
            
            <div className={styles.hjelpTekst}>
              <div className={styles.hjelpHeader}>
                <h3>Slik tenker du:</h3>
                <button 
                  onClick={() => {
                    const tekst = `La meg hjelpe deg med ${valgtTier || 10}-venner!
                    Slik tenker du:
                    Du har ${tall1} spillere på banen.
                    Du trenger totalt ${valgtTier || 10} spillere for et fullt lag.
                    Hvor mange flere spillere trenger du?
                    Tips: Tell fra ${tall1} opp til ${valgtTier || 10} for å finne svaret!`;
                    playText(tekst);
                  }}
                  className={styles.lesHoytKnapp}
                >
                  🔊 Les høyt
                </button>
              </div>
              <div className={styles.fotballBane}>
                <div className={styles.spillerGruppe}>
                  {Array(tall1).fill(0).map((_, i) => (
                    <span key={i} className={styles.spiller}>👕</span>
                  ))}
                </div>
                <div className={styles.plussTegn}>+</div>
                <div className={styles.spillerGruppe}>
                  <span className={styles.spiller}>❓</span>
                </div>
                <div className={styles.likTegn}>=</div>
                <div className={styles.spillerGruppe}>
                  <span>{valgtTier || 10}</span>
                </div>
              </div>
              
              <ul>
                <li>🎯 Du har {tall1} spillere på banen</li>
                <li>⚽ Du trenger totalt {valgtTier || 10} spillere for et fullt lag</li>
                <li>❓ Hvor mange flere spillere trenger du?</li>
              </ul>
              
              <p className={styles.tips}>
                Tips: Tell fra {tall1} opp til {valgtTier || 10} for å finne svaret!
              </p>
            </div>

            <button 
              className={styles.forståttKnapp}
              onClick={() => setVisHjelp(false)}
            >
              Jeg forstår! 👍
            </button>
          </div>
        </div>
      )}

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
