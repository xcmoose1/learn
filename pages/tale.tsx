import { useState, useEffect } from 'react';
import { motion, Reorder, useDragControls, AnimatePresence } from 'framer-motion';
import styles from '../styles/Tale.module.css';
import lesespillData from '../data/lesespill.json';
import { useSpeech } from '../hooks/useSpeech';

const Tale = () => {
  const [activeTab, setActiveTab] = useState('sammensatte');
  const [score, setScore] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const { speak, cancel, speaking, supported } = useSpeech({
    text: currentWord,
    lang: 'nb-NO',
    rate: 1
  });

  useEffect(() => {
    const savedScore = localStorage.getItem('lesespillScore');
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  const playWord = (word: string, speed: number = 1) => {
    setCurrentWord(word);
    setTimeout(() => speak(), 0);
  };

  const handleCorrectAnswer = () => {
    const newScore = score + 1;
    setScore(newScore);
    localStorage.setItem('lesespillScore', newScore.toString());
    
    const audio = new Audio('/sounds/correct.mp3');
    audio.play();
    
    if (newScore % 10 === 0) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }
  };

  const SammensatteOrd = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState(lesespillData.sammensatteOrd[0]);
    const [wordParts, setWordParts] = useState([currentWord.del1, currentWord.del2].sort(() => Math.random() - 0.5));
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
      // Update word parts when current word changes
      setWordParts([currentWord.del1, currentWord.del2].sort(() => Math.random() - 0.5));
    }, [currentWord]);

    const moveToNextWord = () => {
      const nextIndex = (currentWordIndex + 1) % lesespillData.sammensatteOrd.length;
      setCurrentWordIndex(nextIndex);
      setCurrentWord(lesespillData.sammensatteOrd[nextIndex]);
      setShowSuccess(false);
    };

    const checkWord = () => {
      const combinedWord = wordParts.join('');
      if (combinedWord === currentWord.del1 + currentWord.del2) {
        setShowSuccess(true);
        handleCorrectAnswer();
        playWord(combinedWord);
      } else {
        const audio = new Audio('/sounds/incorrect.mp3');
        audio.play();
      }
    };

    return (
      <div className={styles.gameContainer}>
        <div className={styles.gameHeader}>
          <h2>Sett sammen ordene</h2>
          <button 
            className={styles.nextButton}
            onClick={moveToNextWord}
          >
            Neste ord →
          </button>
        </div>

        <p className={styles.instructions}>
          Dra og slipp orddelene i riktig rekkefølge for å lage et sammensatt ord
        </p>
        
        <div className={styles.wordImage}>
          <img src={currentWord.bilde} alt={currentWord.del1 + currentWord.del2} />
        </div>

        <Reorder.Group 
          axis="x" 
          values={wordParts} 
          onReorder={setWordParts}
          className={styles.wordPartsContainer}
        >
          {wordParts.map((part) => (
            <Reorder.Item
              key={part}
              value={part}
              className={styles.wordPart}
              whileDrag={{ scale: 1.1 }}
              onDragEnd={checkWord}
            >
              {part}
            </Reorder.Item>
          ))}
        </Reorder.Group>
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.playButton}
            onClick={() => playWord(currentWord.del1 + currentWord.del2)}
          >
            🔊 Hør hele ordet
          </button>
          
          {showSuccess && (
            <motion.div 
              className={styles.successMessage}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              Riktig! 🎉
              <button 
                className={styles.nextAfterSuccessButton}
                onClick={moveToNextWord}
              >
                Neste ord →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const UttaleTrening = () => {
    const [selectedSound, setSelectedSound] = useState('r_lyd');
    
    return (
      <div className={styles.gameContainer}>
        <h2>Øv på uttale</h2>
        <div className={styles.soundButtons}>
          <button 
            className={`${styles.soundButton} ${selectedSound === 'r_lyd' ? styles.active : ''}`}
            onClick={() => setSelectedSound('r_lyd')}
          >
            R-lyd
          </button>
          <button 
            className={`${styles.soundButton} ${selectedSound === 's_lyd' ? styles.active : ''}`}
            onClick={() => setSelectedSound('s_lyd')}
          >
            S-lyd
          </button>
          <button 
            className={`${styles.soundButton} ${selectedSound === 'l_lyd' ? styles.active : ''}`}
            onClick={() => setSelectedSound('l_lyd')}
          >
            L-lyd
          </button>
        </div>
        <div className={styles.wordList}>
          {lesespillData.uttaleTrening[selectedSound].map((item, index) => (
            <div key={index} className={styles.wordItem}>
              <img src={item.bilde} alt={item.ord} />
              <h3>{item.ord}</h3>
              <div className={styles.playButtons}>
                <button onClick={() => playWord(item.ord, 1)}>🔊 Normal</button>
                <button onClick={() => playWord(item.ord, 0.5)}>🐌 Sakte</button>
                <button onClick={() => playSyllables(item.ord)}>📝 Stavelser</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const playSyllables = (word: string) => {
    const syllables = word.split('-');
    syllables.forEach((syllable, index) => {
      const delay = index * 1000;
      setTimeout(() => {
        setCurrentWord(syllable);
        setTimeout(() => speak(), 0);
      }, delay);
    });
  };

  return (
    <div className={styles.container}>
      <h1>Fotball Lesespill</h1>
      
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'sammensatte' ? styles.active : ''}`}
          onClick={() => setActiveTab('sammensatte')}
        >
          Sammensatte Ord
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'uttale' ? styles.active : ''}`}
          onClick={() => setActiveTab('uttale')}
        >
          Uttaletrening
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'sammensatte' && <SammensatteOrd />}
        {activeTab === 'uttale' && <UttaleTrening />}
      </div>

      <div className={styles.score}>
        Poeng: {score}
      </div>

      <AnimatePresence>
        {showReward && (
          <motion.div 
            className={styles.reward}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <h2>Gratulerer! 🎉</h2>
            <p>Du har låst opp et nytt fotballkort!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tale;
