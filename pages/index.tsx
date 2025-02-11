import { motion } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';

const menuItems = [
  {
    href: '/lesespill',
    title: 'Fotballnyheter',
    description: 'Les spennende historier om dine favorittspillere',
    icon: '🗞️',
    color: 'bg-real-white',
    borderColor: 'border-real-gold',
    hoverEffect: 'hover:shadow-real-gold/50'
  },
  {
    href: '/matematikk',
    title: 'Målstatistikk',
    description: 'Lær matematikk med fotballresultater',
    icon: '⚽',
    color: 'bg-psg-blue',
    borderColor: 'border-psg-red',
    hoverEffect: 'hover:shadow-psg-red/50'
  },
  {
    href: '/tegning',
    title: 'Spillerkort',
    description: 'Fargelegg dine favorittspillere',
    icon: '🎨',
    color: 'bg-nassr-yellow',
    borderColor: 'border-nassr-blue',
    hoverEffect: 'hover:shadow-nassr-blue/50'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function Home() {
  return (
    <Layout title="Fotball Læring - Hjem">
      <div className="min-h-screen py-8 md:py-12 px-4 md:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-8 font-oswald tracking-wider"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            Velkommen til Fotball Læring
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white text-center mb-12 md:mb-16"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Lær mens du utforsker fotballens magiske verden! 🌟
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                whileTap={{ scale: 0.95 }}
                className="touch-manipulation"
              >
                <Link href={item.href}>
                  <div 
                    className={`${item.color} ${item.borderColor} border-4 md:border-6 rounded-xl md:rounded-2xl p-6 md:p-8 h-full shadow-xl transition-all duration-300 ${item.hoverEffect} hover:shadow-2xl`}
                  >
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6">{item.icon}</div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 font-oswald">{item.title}</h2>
                    <p className="text-gray-700 text-lg md:text-xl">{item.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
