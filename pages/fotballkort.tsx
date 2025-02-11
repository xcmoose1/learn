import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import styles from '../styles/Fotballkort.module.css';
import kortData from '../data/fotballkort.json';
import moreKortData from '../data/fotballkort_more.json';
import Image from 'next/image';
import { useSpeech } from '../hooks/useSpeech';

// Kombiner spillere fra begge filer
const alleSpillere = [...kortData.spillere, ...moreKortData.spillere];

interface Spiller {
  id: number;
  navn: string;
  klubb: string;
  nasjonalitet: string;
  posisjon: string;
  bilde: string;
  sjelden: string;
  klubbFarger: {
    primær: string;
    sekundær: string;
  };
  faktaListe: string[][];
  oppgaver: {
    spørsmål: string;
    alternativer: (string | number)[];
    svar: number;
  }[];
  stats: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    physical: number;
  };
}

export default function Fotballkort() {
  const [låsteKort, setLåsteKort] = useState<number[]>([]);
  const [aktivtKort, setAktivtKort] = useState<number | null>(null);
  const [visMålAnimasjon, setVisMålAnimasjon] = useState(false);
  const [faktaIndex, setFaktaIndex] = useState(0);
  const [visVelkomst, setVisVelkomst] = useState(true);
  const [nesteKortId, setNesteKortId] = useState<number>(1);
  const [currentWord, setCurrentWord] = useState('');
  const { speak, cancel, speaking, supported } = useSpeech({
    text: currentWord,
    lang: 'nb-NO',
    rate: 1
  });

  useEffect(() => {
    // Last inn lagrede data
    const lagretData = localStorage.getItem('fotballkortData');
    if (lagretData) {
      const data = JSON.parse(lagretData);
      setLåsteKort(data.låsteKort || []);
      setNesteKortId(data.nesteKortId || 2);
      setVisVelkomst(false);
    } else {
      // Start med Haaland-kortet
      setLåsteKort([1]);
      setNesteKortId(2);
    }
  }, []);

  // Lagre data når det endres
  useEffect(() => {
    localStorage.setItem('fotballkortData', JSON.stringify({
      låsteKort,
      nesteKortId
    }));
  }, [låsteKort, nesteKortId]);

  const håndterRiktigSvar = () => {
    setVisMålAnimasjon(true);
    const audio = new Audio('/sounds/goal.mp3');
    audio.play();
    
    // Lukk det aktive kortet
    setAktivtKort(null);
    
    // Oppdater fakta index
    setFaktaIndex(prev => prev + 1);
    
    // Vis neste kort
    const nesteKort = alleSpillere.find(s => s.id === nesteKortId);
    if (nesteKort) {
      setLåsteKort(prev => [...prev, nesteKortId]);
      setNesteKortId(prev => prev + 1);
      const unlockAudio = new Audio('/sounds/unlock.mp3');
      unlockAudio.play();
    }

    setTimeout(() => {
      setVisMålAnimasjon(false);
    }, 2000);
  };

  const håndterFeilSvar = () => {
    const audio = new Audio('/sounds/miss.mp3');
    audio.play();
    
    // Vis visuell tilbakemelding for feil svar
    const svarKnapper = document.querySelectorAll(`.${styles.svarKnapp}`);
    svarKnapper.forEach(knapp => {
      knapp.classList.add(styles.feilSvar);
      setTimeout(() => knapp.classList.remove(styles.feilSvar), 1000);
    });
  };

  const håndterKortKlikk = (spiller: Spiller) => {
    if (!låsteKort.includes(spiller.id)) return;
    setAktivtKort(spiller.id);
  };

  const playWord = (word: string, speed: number = 1) => {
    setCurrentWord(word);
    setTimeout(() => speak(), 0);
  };

  return (
    <Layout title="Fotballkort">
      <div className={styles.container}>
        <h1 className={styles.tittel}>Fotballkort</h1>
        <div className={styles.progress}>
          Kort: {låsteKort.length}/{alleSpillere.length} 🎮
        </div>
        
        {visVelkomst && (
          <motion.div 
            className={styles.velkomst}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2>Velkommen til Fotballkort! 🎉</h2>
            <p>Svar riktig på spørsmål for å låse opp nye fotballkort!</p>
            <ul>
              <li> 📚 Les fakta om spillerne</li>
              <li> 🎯 Svar på morsomme oppgaver</li>
              <li> ⭐ Samle alle 50 kort!</li>
            </ul>
            <button 
              className={styles.startKnapp}
              onClick={() => setVisVelkomst(false)}
            >
              La oss begynne! →
            </button>
          </motion.div>
        )}

        {!visVelkomst && (
          <div className={styles.kortGrid}>
            {alleSpillere.map((spiller) => (
              <motion.div
                key={spiller.id}
                className={`${styles.kort} ${styles[spiller.sjelden]}`}
                onClick={() => håndterKortKlikk(spiller)}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.rating}>{spiller.stats.shooting}</div>
                <div className={styles.posisjon}>{spiller.posisjon}</div>
                
                <div className={styles.spillerBildeContainer}>
                  <Image
                    src={spiller.bilde}
                    alt={spiller.navn}
                    fill
                    className={styles.spillerBilde}
                  />
                </div>

                <div className={styles.spillerNavn}>{spiller.navn}</div>
                <div className={styles.klubbInfo}>
                  <span>{spiller.klubb}</span>
                  <span>•</span>
                  <span>{spiller.nasjonalitet}</span>
                </div>

                <div className={styles.statsContainer}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>PAC</span>
                    <span className={styles.statValue}>{spiller.stats.pace}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>SHO</span>
                    <span className={styles.statValue}>{spiller.stats.shooting}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>PAS</span>
                    <span className={styles.statValue}>{spiller.stats.passing}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>DRI</span>
                    <span className={styles.statValue}>{spiller.stats.dribbling}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>DEF</span>
                    <span className={styles.statValue}>{spiller.stats.defending}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>PHY</span>
                    <span className={styles.statValue}>{spiller.stats.physical}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {visMålAnimasjon && (
          <motion.div 
            className={styles.målAnimasjon}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <h2>MÅL! 🥅⚽</h2>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
