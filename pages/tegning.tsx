import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import QuizCard from '../components/QuizCard';

// Dynamisk import av Konva komponenter for å unngå SSR problemer
const Stage = dynamic(() => import('react-konva').then((mod) => mod.Stage), {
  ssr: false
});
const Layer = dynamic(() => import('react-konva').then((mod) => mod.Layer), {
  ssr: false
});
const Rect = dynamic(() => import('react-konva').then((mod) => mod.Rect), {
  ssr: false
});

// Predefinerte farger for Ronaldo-tegningen
const colors = {
  skin: '#E0B59E',
  hair: '#2A1B17',
  jersey: '#FF0000',
  shorts: '#FFFFFF',
  background: '#87CEEB',
  boots: '#000000',
};

// Quiz spørsmål som vises etter fremgang
const quizQuestions = [
  {
    question: 'Hvilket år vant Ronaldo sin første Ballon d\'Or?',
    options: ['2008', '2013', '2016', '2017'],
    correctAnswer: '2008',
    explanation: 'Cristiano Ronaldo vant sin første Ballon d\'Or i 2008 mens han spilte for Manchester United.'
  },
  {
    question: 'Hvor mange Champions League-titler har Ronaldo vunnet?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    explanation: 'Ronaldo har vunnet Champions League 5 ganger: 1 med Manchester United og 4 med Real Madrid.'
  }
];

interface Cell {
  x: number;
  y: number;
  color: string;
}

export default function Tegning() {
  const [currentColor, setCurrentColor] = useState(colors.skin);
  const [grid, setGrid] = useState<Cell[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [progress, setProgress] = useState(0);
  const stageRef = useRef(null);

  // Konstanter for grid
  const CELL_SIZE = 20;
  const GRID_WIDTH = 30;
  const GRID_HEIGHT = 40;
  const IMAGE_WIDTH = GRID_WIDTH * CELL_SIZE;
  const IMAGE_HEIGHT = GRID_HEIGHT * CELL_SIZE;
  const TOTAL_CELLS = GRID_WIDTH * GRID_HEIGHT;

  // Initialiser grid med transparent farge
  useEffect(() => {
    const initialGrid: Cell[] = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        initialGrid.push({
          x: x * CELL_SIZE,
          y: y * CELL_SIZE,
          color: 'rgba(255, 255, 255, 0.1)' // Svakt synlig hvit farge
        });
      }
    }
    setGrid(initialGrid);
  }, []);

  // Håndter klikk på en celle med opacity
  const handleCellClick = (index: number) => {
    const newGrid = [...grid];
    // Legg til opacity i fargen
    const color = currentColor === '#FFFFFF' 
      ? 'rgba(255, 255, 255, 0.7)' 
      : currentColor.replace(')', ', 0.7)').replace('rgb', 'rgba');
    
    newGrid[index] = { ...newGrid[index], color };
    setGrid(newGrid);

    // Beregn fremgang
    const filledCells = newGrid.filter(cell => cell.color !== 'rgba(255, 255, 255, 0.1)').length;
    const newProgress = Math.floor((filledCells / TOTAL_CELLS) * 100);
    setProgress(newProgress);

    // Vis quiz ved 50% fremgang
    if (newProgress >= 50 && !showQuiz) {
      setShowQuiz(true);
    }
  };

  // Håndter quiz svar
  const handleQuizAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      // Gå til neste spørsmål eller skjul quiz
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(curr => curr + 1);
      } else {
        setShowQuiz(false);
      }
    }
  };

  // Tilbakestill tegningen
  const handleReset = () => {
    const newGrid = grid.map(cell => ({ ...cell, color: 'rgba(255, 255, 255, 0.1)' }));
    setGrid(newGrid);
    setProgress(0);
    setShowQuiz(false);
    setCurrentQuestion(0);
  };

  return (
    <Layout title="Tegning - Ronaldo">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-4xl mb-4 text-white">
            Fargelegg Ronaldo
          </h1>
          <p className="text-xl text-gray-300 mb-4">
            Velg en farge og klikk på rutene for å fargelegge
          </p>
        </motion.div>

        {/* Fargepalett */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(colors).map(([name, color]) => (
            <motion.button
              key={color}
              className={`w-12 h-12 rounded-full border-4 ${
                currentColor === color ? 'border-neon-blue' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentColor(color)}
            />
          ))}
        </div>

        {/* Tegnebrett */}
        <div className="relative flex justify-center mb-8">
          <div className="relative bg-gray-800 p-4 rounded-lg">
            {/* Debug info */}
            <div className="text-white mb-4">
              <p>Grid: {GRID_WIDTH}x{GRID_HEIGHT}</p>
              <p>Cell size: {CELL_SIZE}px</p>
              <p>Image size: {IMAGE_WIDTH}x{IMAGE_HEIGHT}px</p>
            </div>
            
            {/* Bakgrunnsbilde */}
            <div className="relative bg-white rounded-lg overflow-hidden" style={{ width: IMAGE_WIDTH, height: IMAGE_HEIGHT }}>
              <Image
                src="/players/ronaldo-outline.png"
                alt="Ronaldo outline"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="absolute top-0 left-0 pointer-events-none z-10"
              />
              
              {/* Konva Stage */}
              <Stage
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="absolute top-0 left-0"
              >
                <Layer>
                  {grid.map((cell, index) => (
                    <Rect
                      key={index}
                      x={cell.x}
                      y={cell.y}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      fill={cell.color}
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth={1}
                      onClick={() => handleCellClick(index)}
                      onTap={() => handleCellClick(index)}
                      onMouseEnter={(e) => {
                        // Hover effekt
                        const stage = e.target.getStage();
                        if (stage) {
                          stage.container().style.cursor = 'pointer';
                        }
                        e.target.opacity(0.8);
                        e.target.getLayer().draw();
                      }}
                      onMouseLeave={(e) => {
                        const stage = e.target.getStage();
                        if (stage) {
                          stage.container().style.cursor = 'default';
                        }
                        e.target.opacity(1);
                        e.target.getLayer().draw();
                      }}
                    />
                  ))}
                </Layer>
              </Stage>
            </div>
          </div>
        </div>

        {/* Fremgangsbar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{progress}% fullført</span>
            <button
              className="btn-neon group px-4 py-2"
              onClick={handleReset}
            >
              Tilbakestill
            </button>
          </div>
          <div className="w-full h-2 bg-dark-blue rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-neon-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Quiz */}
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <QuizCard
              question={quizQuestions[currentQuestion].question}
              options={quizQuestions[currentQuestion].options}
              correctAnswer={quizQuestions[currentQuestion].correctAnswer}
              onAnswer={handleQuizAnswer}
            />
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
