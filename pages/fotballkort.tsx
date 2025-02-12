// Force update for git push - third attempt
// Force update for git push - second attempt
// Testing git push
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Fotballkort.module.css';
import alleSpillere from '../data/fotballkort.json';
import { getScore, updateScore } from '../lib/score';
import { useAudio } from '../hooks/useAudio';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Kombiner spillere fra begge filer
const alleSpillereListe = alleSpillere.spillere as Spiller[];

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
    type?: string;
    tekst?: string;
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
  const [riktigeSvar, setRiktigeSvar] = useState<{[key: number]: string[]}>({});
  const [visHjelp, setVisHjelp] = useState(false);
  const [hjelpTekst, setHjelpTekst] = useState('');
  const { play, isPlaying } = useAudio();

  useEffect(() => {
    // Last inn lagrede data
    const lagretData = localStorage.getItem('fotballkortData');
    if (lagretData) {
      const data = JSON.parse(lagretData);
      setLåsteKort(data.låsteKort || []);
      setNesteKortId(data.nesteKortId || 2);
      setRiktigeSvar(data.riktigeSvar || {});
      setVisVelkomst(false);
    } else {
      // Start med Haaland-kortet
      setLåsteKort([1]);
      setNesteKortId(2);
      setRiktigeSvar({1: []});
    }
  }, []);

  // Lagre data når det endres
  useEffect(() => {
    localStorage.setItem('fotballkortData', JSON.stringify({
      låsteKort,
      nesteKortId,
      riktigeSvar
    }));
  }, [låsteKort, nesteKortId, riktigeSvar]);

  const sjekkAlleOppgaverFullført = (kortId: number) => {
    const svar = riktigeSvar[kortId] || [];
    const kort = alleSpillereListe.find(s => s.id === kortId);
    if (!kort) return false;
    
    // Sjekk om vi har riktig svar på både matte og lesing
    const harMatteSvar = svar.includes('matte');
    const harLeseSvar = svar.includes('lesing');
    
    return harMatteSvar && harLeseSvar;
  };

  const håndterRiktigSvar = (oppgaveType: string) => {
    if (!aktivtKort) return;

    // Oppdater riktige svar for dette kortet
    const oppdaterteSvar = {
      ...riktigeSvar,
      [aktivtKort]: [...(riktigeSvar[aktivtKort] || []), oppgaveType]
    };
    setRiktigeSvar(oppdaterteSvar);

    // Sjekk om alle oppgaver er fullført
    if (sjekkAlleOppgaverFullført(aktivtKort)) {
      setVisMålAnimasjon(true);
      const audio = new Audio('/sounds/goal.mp3');
      audio.play();
      
      // Lukk det aktive kortet
      setAktivtKort(null);
      
      // Vis neste kort
      const nesteKort = alleSpillereListe.find(s => s.id === nesteKortId);
      if (nesteKort) {
        setLåsteKort([...låsteKort, nesteKort.id]);
        setNesteKortId(nesteKortId + 1);
        setRiktigeSvar({
          ...oppdaterteSvar,
          [nesteKort.id]: []
        });
      }
      
      setTimeout(() => {
        setVisMålAnimasjon(false);
      }, 2000);
    } else {
      // Spill av en lyd for riktig svar, men ikke lås opp nytt kort ennå
      const audio = new Audio('/sounds/correct.mp3');
      audio.play();
    }
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
    if (låsteKort.includes(spiller.id)) {
      setAktivtKort(spiller.id);
    }
  };

  const playWord = (word: string, speed: number = 1) => {
    setCurrentWord(word);
    setTimeout(() => play(`players.${alleSpillereListe.find(s => s.id === aktivtKort)?.navn.toLowerCase()}.intro`), 0);
  };

  return (
    <Layout title="Fotballkort">
      <div className={styles.container}>
        <h1 className={styles.tittel}>Fotballkort</h1>
        <div className={styles.progress}>
          Kort: {låsteKort.length}/{alleSpillereListe.length} 🎮
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
            {alleSpillereListe.map((spiller) => (
              <motion.div
                key={spiller.id}
                className={`${styles.kort} ${styles[spiller.sjelden]} ${låsteKort.includes(spiller.id) ? styles.unlocked : styles.locked}`}
                onClick={() => håndterKortKlikk(spiller)}
                whileHover={låsteKort.includes(spiller.id) ? { scale: 1.05 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {låsteKort.includes(spiller.id) ? (
                  <>
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
                  </>
                ) : (
                  <div className={styles.lockedCard}>
                    <span>🔒</span>
                    <p>Svar på spørsmål for å låse opp!</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {aktivtKort && (
          <motion.div 
            className={styles.spørsmålContainer}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button 
              className={styles.lukkKnapp}
              onClick={() => setAktivtKort(null)}
            >
              ✕
            </button>
            
            {alleSpillereListe.find(s => s.id === aktivtKort)?.oppgaver.map((oppgave, index) => (
              <div key={index} className={styles.oppgave}>
                {'tekst' in oppgave && oppgave.tekst && (
                  <div className={styles.oppgaveTekst}>
                    <div className={styles.lesespillContainer}>
                      <p>{oppgave.tekst}</p>
                      <div className={styles.audioControls}>
                        <button 
                          onClick={() => {
                            const spillerNavn = alleSpillereListe.find(s => s.id === aktivtKort)?.navn.toLowerCase();
                            play(`players.${spillerNavn}.reading.text${index + 1}`);
                          }}
                          disabled={isPlaying}
                          className={styles.audioButton}
                        >
                          🔊 Les høyt
                        </button>
                        <button
                          onClick={() => play('reading.instructions')}
                          disabled={isPlaying}
                          className={styles.helpButton}
                        >
                          ❓ Hjelp
                        </button>
                      </div>
                    </div>
                    <div className={styles.readingProgress}>
                      <p>Les teksten og svar på spørsmålet under:</p>
                    </div>
                  </div>
                )}
                <h3>
                  {oppgave.spørsmål}
                  {('type' in oppgave ? oppgave.type === 'matte' : true) ? (
                    <button 
                      className={styles.hjelpKnapp}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHjelpTekst(
                          oppgave.spørsmål.toLowerCase().includes('10-vennen') 
                            ? "La oss tenke på fotballbanen! 🎯\n\n" +
                              "Når vi snakker om 10-venner, er det som å ha to lag på banen.\n" +
                              "For eksempel: Hvis ett lag har 7 spillere, hvor mange spillere trenger vi for å ha 10 spillere totalt?\n\n" +
                              "Det er som å fylle laget til vi har nok spillere til en full kamp! 🏃‍♂️⚽"
                            : "La oss gjøre dette enkelt! 🎯\n\n" +
                              "Tenk på dette som å telle mål i en fotballkamp.\n" +
                              "Vi kan bruke fingrene våre som spillere for å telle!\n\n" +
                              "Ta ett skritt om gangen, akkurat som når vi dribler ballen mot mål! ⚽"
                        );
                        setVisHjelp(true);
                      }}
                    >
                      🤔 Trenger du hjelp?
                    </button>
                  ) : null}
                </h3>
                <div className={styles.alternativer}>
                  {oppgave.alternativer.map((alternativ, altIndex) => (
                    <button
                      key={altIndex}
                      className={`${styles.svarKnapp} ${
                        riktigeSvar[aktivtKort!]?.includes(oppgave.type || (index === 0 ? 'matte' : 'lesing')) ? styles.besvart : ''
                      }`}
                      onClick={() => {
                        const oppgaveType = oppgave.type || (index === 0 ? 'matte' : 'lesing');
                        if (altIndex === oppgave.svar && !riktigeSvar[aktivtKort!]?.includes(oppgaveType)) {
                          håndterRiktigSvar(oppgaveType);
                        } else if (altIndex !== oppgave.svar) {
                          håndterFeilSvar();
                        }
                      }}
                      disabled={riktigeSvar[aktivtKort!]?.includes(oppgave.type || (index === 0 ? 'matte' : 'lesing'))}
                    >
                      {alternativ}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
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

        {visHjelp && (
          <motion.div 
            className={styles.hjelpModal}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <div className={styles.hjelpInnhold}>
              <button 
                className={styles.lukkKnapp}
                onClick={() => setVisHjelp(false)}
              >
                ✕
              </button>
              <h3>La meg hjelpe deg! 🌟</h3>
              <div className={styles.hjelpTekst}>
                {hjelpTekst.split('\n').map((linje, i) => (
                  <p key={i}>{linje}</p>
                ))}
              </div>
              <button 
                className={styles.forståttKnapp}
                onClick={() => setVisHjelp(false)}
              >
                Jeg forstår! 👍
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
