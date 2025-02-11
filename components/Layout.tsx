import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import SoundEffects from './SoundEffects';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

function Layout({ children, title = 'Fotball Læring' }: LayoutProps) {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const backgroundAudio = new Audio('/sounds/stadium-ambience.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.volume = 0.1;
    setAudio(backgroundAudio);

    // Cleanup
    return () => {
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audio) {
      if (audioEnabled) {
        audio.pause();
      } else {
        audio.play();
      }
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <div className="min-h-screen relative">
      <Head>
        <title>{title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#22C55E" />
      </Head>

      <SoundEffects enabled={audioEnabled} />

      {/* Fotballbane bakgrunn - Optimalisert for nettbrett */}
      <div className="fixed inset-0 z-0 select-none touch-none">
        <div className="absolute inset-0 bg-green-600">
          {/* Midtlinje */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 md:w-2 bg-white transform -translate-x-1/2" />
          
          {/* Midtsirkel - Større på nettbrett */}
          <div className="absolute left-1/2 top-1/2 w-32 md:w-48 h-32 md:h-48 border-4 md:border-8 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          
          {/* Straffeområder - Større på nettbrett */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 md:w-96 h-24 md:h-32 border-4 md:border-8 border-white" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 md:w-96 h-24 md:h-32 border-4 md:border-8 border-white" />
        </div>
      </div>

      {/* Lyd-kontroll - Større på nettbrett */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleAudio}
        className="fixed top-6 right-6 z-50 bg-white rounded-full p-3 md:p-4 shadow-lg touch-manipulation"
      >
        {audioEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15.414l-2.829-2.828m8.486 0l-2.828 2.828M6.343 9.172l-2.829-2.829m8.486 0l-2.828 2.829" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15.414l-2.829-2.828m8.486 0l-2.828 2.828M6.343 9.172l-2.829-2.829m8.486 0l-2.828 2.829" />
          </svg>
        )}
      </motion.button>

      {/* Hovedinnhold med bedre padding for nettbrett */}
      <div className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-4 md:px-8 py-8 md:py-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Layout;
