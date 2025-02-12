import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Talespill.module.css';
import Image from 'next/image';

interface OrdOppgave {
  ord: string;
  bilde: string;
  lyd: string;
  fokusLyd: string;
  hint: string;
  nivå: number;
  animasjon: string;
}

const ordListe: { [key: string]: OrdOppgave[] } = {
  "S-lyd": [
    {
      ord: "Scoring",
      bilde: "/images/speech/scoring.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "Tenk på lyden av en slange: sssss",
      nivå: 1,
      animasjon: "⚽ -> 🥅"
    },
    {
      ord: "Supporter",
      bilde: "/images/speech/supporter.png",
      lyd: "s",
      fokusLyd: "S",
      hint: "La tunga ligge rett bak tennene",
      nivå: 1,
      animasjon: "👥 -> 👏"
    }
  ],
  "R-lyd": [
    {
      ord: "Redning",
      bilde: "/images/speech/redning.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "La tunga vibrere som en motor",
      nivå: 1,
      animasjon: "🧤 -> ⚽"
    },
    {
      ord: "Dribbling",
      bilde: "/images/speech/dribbling.png",
      lyd: "r",
      fokusLyd: "R",
      hint: "Tenk på lyden av en løve: rrrrr",
      nivå: 2,
      animasjon: "👟 -> ⚽"
    }
  ],
  "K-lyd": [
    {
      ord: "Keeper",
      bilde: "/images/speech/keeper.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Trykk baktungen mot ganen",
      nivå: 1,
      animasjon: "🧤 -> 🥅"
    },
    {
      ord: "Corner",
      bilde: "/images/speech/corner.png",
      lyd: "k",
      fokusLyd: "K",
      hint: "Tenk på lyden av en kråke: kra-kra",
      nivå: 2,
      animasjon: "⚽ -> 🚩"
    }
  ]
};

export default function Talespill() {
  const [aktivLyd, setAktivLyd] = useState<string>("S-lyd");
  const [aktivOrd, setAktivOrd] = useState<number>(0);
  const [visFasit, setVisFasit] = useState(false);
  const [poeng, setPoeng] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleLydValg = (lyd: string) => {
    setAktivLyd(lyd);
    setAktivOrd(0);
    setVisFasit(false);
  };

  const handleNesteOrd = () => {
    if (aktivOrd < ordListe[aktivLyd].length - 1) {
      setAktivOrd(aktivOrd + 1);
    } else {
      // Vis feiring når man er ferdig med en lyd
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        setAktivOrd(0);
        setPoeng(poeng + 5);
      }, 3000);
    }
    setVisFasit(false);
  };

  const handleØvPåOrd = () => {
    setVisFasit(true);
    setPoeng(poeng + 1);
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>⚽ Fotball Uttale Spill 🎯</h1>
          <div className={styles.poeng}>
            Poeng: {poeng} ⭐
          </div>
        </div>

        <div className={styles.lydValg}>
          {Object.keys(ordListe).map((lyd) => (
            <button
              key={lyd}
              className={`${styles.lydKnapp} ${aktivLyd === lyd ? styles.aktivLyd : ''}`}
              onClick={() => handleLydValg(lyd)}
            >
              {lyd}
            </button>
          ))}
        </div>

        <div className={styles.spillBrett}>
          <div className={styles.ordKort}>
            <div className={styles.ordBilde}>
              <Image
                src={ordListe[aktivLyd][aktivOrd].bilde}
                alt={ordListe[aktivLyd][aktivOrd].ord}
                width={300}
                height={300}
                priority
              />
            </div>
            
            <h2 className={styles.ord}>
              {ordListe[aktivLyd][aktivOrd].ord}
            </h2>

            <div className={styles.fokusLyd}>
              Fokuser på {ordListe[aktivLyd][aktivOrd].fokusLyd}-lyden
            </div>

            {showHint && (
              <div className={styles.hint}>
                💡 {ordListe[aktivLyd][aktivOrd].hint}
              </div>
            )}

            <div className={styles.knapper}>
              <button 
                className={styles.hintKnapp}
                onClick={() => setShowHint(!showHint)}
              >
                Vis hint
              </button>

              <button 
                className={styles.øvKnapp}
                onClick={handleØvPåOrd}
              >
                Jeg har øvd!
              </button>

              <button 
                className={styles.nesteKnapp}
                onClick={handleNesteOrd}
              >
                Neste ord →
              </button>
            </div>
          </div>

          {visFasit && (
            <div className={styles.feedback}>
              <div className={styles.animasjon}>
                {ordListe[aktivLyd][aktivOrd].animasjon}
              </div>
              <p>Bra jobbet! 🌟</p>
            </div>
          )}
        </div>

        {showCelebration && (
          <div className={styles.celebration}>
            <h2>Fantastisk! 🎉</h2>
            <p>Du har øvd på alle ord med {aktivLyd}!</p>
            <div className={styles.trofé}>🏆</div>
          </div>
        )}
      </div>
    </Layout>
  );
}
