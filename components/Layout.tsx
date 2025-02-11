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

  const menuItems = [
    { href: '/', label: '🏠 Hjem', icon: '⚽' },
    { href: '/matematikk', label: '🔢 Matematikk', icon: '📊' },
    { href: '/lesespill', label: '📚 Lesespill', icon: '📖' },
    { href: '/tegning', label: '🎨 Tegning', icon: '✏️' },
  ];

  return (
    <div className="min-h-screen bg-darker-blue">
      <Head>
        <title>{title} | Fotball Læring</title>
        <meta name="description" content="Lær mens du har det gøy med fotball!" />
      </Head>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-dark-blue to-darker-blue border-b border-neon-blue/20">
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
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
            <nav className="fixed top-16 right-0 bottom-0 w-64 bg-dark-blue">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block btn-neon group px-3 py-2 rounded-md text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-dark-blue to-darker-blue border-t border-neon-blue/20">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-white/60"> 2025 Fotball Læring</p>
            <div className="flex items-center space-x-2">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                ⚽
              </motion.span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
