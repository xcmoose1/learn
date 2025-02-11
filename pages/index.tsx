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
    title: 'Tegning',
    description: 'Tegn dine favorittspillere og lær om dem',
    icon: '🎨',
    href: '/tegning',
    color: 'from-yellow-500 to-orange-500',
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
            Bli med på en spennende reise hvor du lærer matematikk, lesing og tegning
            gjennom fotballens magiske verden!
          </p>
        </motion.div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={activity.href}>
                <div className={`fifa-card group cursor-pointer`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-10 group-hover:opacity-20 transition-opacity rounded-xl`} />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{activity.icon}</span>
                    <h2 className="font-heading text-2xl mb-2 text-white">
                      {activity.title}
                    </h2>
                    <p className="text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Players */}
        <div className="mb-20">
          <h2 className="font-heading text-4xl mb-8 text-center text-white">
            Ukens Spillere
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {featuredPlayers.map((player, index) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <PlayerCard {...player} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link href="/matematikk">
            <button className="btn-neon group text-xl px-8 py-4">
              Start Læringen! ⚽
            </button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
