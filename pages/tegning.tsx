import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import type { ReactSketchCanvasRef } from 'react-sketch-canvas';
import { useSpeechSynthesis } from 'react-speech-kit';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { fotballspillere, Quiz } from '../data/fotballspillere';
import * as htmlToImage from 'html-to-image';

const farger = [
  { navn: 'Svart', hex: '#000000' },
  { navn: 'Rød', hex: '#FF0000' },
  { navn: 'Blå', hex: '#0000FF' },
  { navn: 'Grønn', hex: '#00FF00' },
  { navn: 'Gul', hex: '#FFFF00' },
  { navn: 'Oransje', hex: '#FFA500' },
  { navn: 'Lilla', hex: '#800080' },
  { navn: 'Rosa', hex: '#FFC0CB' },
  { navn: 'Brun', hex: '#8B4513' },
  { navn: 'Grå', hex: '#808080' },
];

export default function Tegning() {
  const [currentSpiller, setCurrentSpiller] = useState(fotballspillere[0]);
  const [currentColor, setCurrentColor] = useState(farger[0].hex);
  const [isErasing, setIsErasing] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [currentFaktaIndex, setCurrentFaktaIndex] = useState(0);
  const [showGullstjerne, setShowGullstjerne] = useState(false);
  const canvasRef = useRef<ReactSketchCanvasRef>(null);
  const { speak, speaking, supported } = useSpeechSynthesis();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentFaktaIndex + 1) % currentSpiller.morsommeFakta.length;
      setCurrentFaktaIndex(nextIndex);
      if (supported) {
        speak({ text: currentSpiller.morsommeFakta[nextIndex] });
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [currentSpiller, currentFaktaIndex, speak, supported]);

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    setIsErasing(false);
    if (canvasRef.current) {
      canvasRef.current.eraseMode(false);
    }

    // Sjekk fargeutfordring
    const utfordring = currentSpiller.fargeutfordringer.find(u => u.farge === color);
    if (utfordring) {
      speak({ text: utfordring.beskrivelse });
    }

    // Start quiz med 20% sjanse
    if (Math.random() < 0.2 && !showQuiz) {
      const randomQuiz = currentSpiller.quiz[Math.floor(Math.random() * currentSpiller.quiz.length)];
      setCurrentQuiz(randomQuiz);
      setShowQuiz(true);
      setQuizAnswer(null);
      speak({ text: randomQuiz.sporsmal });
    }
  };

  const handleQuizAnswer = (svar: string) => {
    setQuizAnswer(svar);
    if (currentQuiz && svar === currentQuiz.riktigSvar) {
      setShowGullstjerne(true);
      speak({ text: currentQuiz.forklaring });
      setTimeout(() => {
        setShowGullstjerne(false);
        setShowQuiz(false);
        setCurrentQuiz(null);
      }, 3000);
    }
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
    if (canvasRef.current) {
      canvasRef.current.eraseMode(!isErasing);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
  };

  const undoLastStroke = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };

  const redoLastStroke = () => {
    if (canvasRef.current) {
      canvasRef.current.redo();
    }
  };

  const saveDrawing = async () => {
    const element = document.getElementById('tegning-container');
    if (element) {
      try {
        const dataUrl = await htmlToImage.toPng(element);
        const link = document.createElement('a');
        link.download = `${currentSpiller.navn.toLowerCase()}-tegning.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Kunne ikke lagre tegningen:', error);
      }
    }
  };

  const handleSpillerChange = (spiller: typeof currentSpiller) => {
    setCurrentSpiller(spiller);
    setShowQuiz(false);
    setCurrentQuiz(null);
    setQuizAnswer(null);
    clearCanvas();
    if (supported) {
      speak({ text: spiller.beskrivelse });
    }
  };

  return (
    <Layout title="Fargelegg fotballspillere">
      <div className="container mx-auto px-4 py-8">
        <Head>
          <title>Fargelegg fotballspillere</title>
        </Head>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-6">
            {fotballspillere.map((spiller) => (
              <Button
                key={spiller.id}
                onClick={() => handleSpillerChange(spiller)}
                variant={currentSpiller.id === spiller.id ? 'primary' : 'secondary'}
              >
                {spiller.navn}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="order-2 md:order-1 space-y-4">
              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-4">Farger</h2>
                <div className="grid grid-cols-5 gap-2">
                  {farger.map((farge) => (
                    <motion.button
                      key={farge.hex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full border-2 ${
                        currentColor === farge.hex ? 'border-black' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: farge.hex }}
                      onClick={() => handleColorChange(farge.hex)}
                      title={farge.navn}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-4 space-y-2">
                <Button
                  onClick={toggleEraser}
                  variant={isErasing ? 'primary' : 'secondary'}
                  fullWidth
                >
                  {isErasing ? '🧽 Visker aktiv' : '🧽 Bruk viskelær'}
                </Button>

                <Button onClick={clearCanvas} variant="secondary" fullWidth>
                  🗑️ Tøm tegningen
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={undoLastStroke} variant="secondary">
                    ↩️ Angre
                  </Button>
                  <Button onClick={redoLastStroke} variant="secondary">
                    ↪️ Gjør om
                  </Button>
                </div>

                <Button onClick={saveDrawing} variant="primary" fullWidth>
                  💾 Lagre tegning
                </Button>
              </div>

              <div className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-bold mb-2">Visste du at...</h2>
                <motion.p
                  key={currentFaktaIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-gray-600"
                >
                  {currentSpiller.morsommeFakta[currentFaktaIndex]}
                </motion.p>
              </div>
            </div>

            <div className="order-1 md:order-2 md:col-span-2">
              <div 
                id="tegning-container"
                className="bg-white rounded-lg shadow p-4 aspect-square relative"
              >
                <div
                  className="w-full h-full absolute top-0 left-0"
                  dangerouslySetInnerHTML={{ 
                    __html: currentSpiller.svg.replace(
                      /stroke="black"/g, 
                      'stroke="gray" stroke-dasharray="4"'
                    )
                  }}
                />
                <ReactSketchCanvas
                  ref={canvasRef}
                  strokeWidth={4}
                  strokeColor={currentColor}
                  canvasColor="transparent"
                  className="absolute top-0 left-0 w-full h-full"
                  style={{
                    border: 'none',
                    touchAction: 'none'
                  }}
                  allowOnlyPointerType="all"
                />

                <AnimatePresence>
                  {showGullstjerne && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl"
                    >
                      ⭐
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showQuiz && currentQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-4 bg-white rounded-lg shadow p-4"
                  >
                    <h3 className="text-xl font-bold mb-4">{currentQuiz.sporsmal}</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {currentQuiz.alternativer.map((alternativ) => (
                        <Button
                          key={alternativ}
                          onClick={() => handleQuizAnswer(alternativ)}
                          variant={
                            quizAnswer === alternativ
                              ? alternativ === currentQuiz.riktigSvar
                                ? 'success'
                                : 'error'
                              : 'secondary'
                          }
                          disabled={quizAnswer !== null}
                          fullWidth
                        >
                          {alternativ}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold mb-2">{currentSpiller.navn}</h2>
            <p className="text-gray-600">{currentSpiller.beskrivelse}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
