import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { getScore } from '../lib/score';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = 'Fotball Læring' }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [score, setScore] = useState(getScore());
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const menuItems = [
    { href: '/', label: '🏠 Hjem', icon: '⚽' },
    { href: '/matematikk', label: '🔢 Matematikk', icon: '📊' },
    { href: '/lesespill', label: '📚 Lesespill', icon: '📖' },
    { href: '/talespill', label: '🗣️ Talespill', icon: '🎯' },
    { href: '/fotballkort', label: '🎴 Fotballkort', icon: '⭐' },
  ];

  const handleReset = () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
      return;
    }
    
    // Clear all localStorage data
    localStorage.clear();
    
    // Reset confirmation state
    setShowResetConfirm(false);
    
    // Reload the page to reset all state
    window.location.reload();
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-darker-blue to-dark-blue">
      <Head>
        <title>{title} | Fotball Læring</title>
        <meta name="description" content="Lær mens du har det gøy med fotball!" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-dark-blue to-darker-blue border-b border-neon-blue/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚽
              </motion.span>
              <span className="font-heading text-2xl text-white">FOTBALL LÆRING</span>
            </Link>

            {/* Score Display */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="scoreboard-number">
                {score} poeng
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden btn-neon group p-2"
            >
              <span className="sr-only">Åpne meny</span>
              {isMenuOpen ? '✕' : '☰'}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="btn-neon group px-4 py-2 rounded-lg text-white hover:text-neon-blue transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Reset Button Group */}
            <div className="flex items-center gap-2">
              {showResetConfirm ? (
                <>
                  <button 
                    onClick={handleReset}
                    className="btn-danger px-4 py-2 rounded-lg"
                  >
                    Bekreft Reset
                  </button>
                  <button 
                    onClick={cancelReset}
                    className="btn-secondary px-4 py-2 rounded-lg"
                  >
                    Avbryt
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleReset}
                  className="btn-neon group px-4 py-2 rounded-lg"
                >
                  Reset Spill
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="btn-neon group block px-3 py-2 rounded-md text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
