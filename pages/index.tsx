import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PlayerCard from '../components/PlayerCard';
import Link from 'next/link';

const activities = [
  {
    title: 'Matematikk',
    description: 'Lær matematikk gjennom morsomme fotballoppgaver',
    icon: '🔢',
    href: '/matematikk',
    color: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Lesespill',
    description: 'Les spennende historier om fotballspillere',
    icon: '📚',
    href: '/lesespill',
    color: 'from-green-500 to-teal-500',
  },
  {
    title: 'Talespill',
    description: 'Øv på uttale og sammensatte ord med fotballtema',
    icon: '🗣️',
    href: '/talespill',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    title: 'Fotballkort',
    description: 'Samle kort, lær fakta og løs morsomme oppgaver',
    icon: '🎴',
    href: '/fotballkort',
    color: 'from-pink-500 to-red-500',
  },
];

const featuredPlayers = [
  {
    name: 'Erling Haaland',
    image: '/players/haaland.png',
    rating: 91,
    position: 'ST',
    club: 'Manchester City',
    country: 'Norge',
    stats: {
      pace: 89,
      shooting: 93,
      passing: 80,
      dribbling: 85,
      defending: 45,
      physical: 88,
    },
  },
  {
    name: 'Martin Ødegaard',
    image: '/players/odegaard.png',
    rating: 87,
    position: 'CAM',
    club: 'Arsenal',
    country: 'Norge',
    stats: {
      pace: 78,
      shooting: 82,
      passing: 89,
      dribbling: 88,
      defending: 55,
      physical: 68,
    },
  },
  {
    name: 'Ada Hegerberg',
    image: '/players/hegerberg.png',
    rating: 90,
    position: 'ST',
    club: 'Lyon',
    country: 'Norge',
    stats: {
      pace: 85,
      shooting: 91,
      passing: 82,
      dribbling: 86,
      defending: 42,
      physical: 78,
    },
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-heading text-6xl mb-6 text-white">
            Lær med <span className="text-neon-blue">Fotball</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Velkommen til en morsom måte å lære på! Her kan du øve på matematikk,
            lesing og uttale mens du lærer om fotball.
          </p>
        </motion.div>
      </section>

      {/* Activities Grid */}
      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {activities.map((activity) => (
            <Link
              key={activity.title}
              href={activity.href}
              className={`block p-6 rounded-xl bg-gradient-to-br ${activity.color} 
                transform hover:scale-105 transition-all duration-300 
                shadow-lg hover:shadow-xl`}
            >
              <div className="text-4xl mb-4">{activity.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {activity.title}
              </h3>
              <p className="text-white/90">{activity.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Players */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Populære Spillere
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
