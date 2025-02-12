import { motion } from 'framer-motion';
import Image from 'next/image';

interface PlayerCardProps {
  player: {
    name: string;
    image: string;
    rating: number;
    position: string;
    club: string;
    country: string;
    stats: {
      pace: number;
      shooting: number;
      passing: number;
      dribbling: number;
      defending: number;
      physical: number;
    };
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const { name, image, rating, position, club, country, stats } = player;
  
  return (
    <motion.div
      className="fifa-card w-72 relative bg-dark-blue/30 backdrop-blur-sm p-4 rounded-xl"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Rating Circle */}
      <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center">
        <div className="font-tech text-2xl font-bold text-white">
          {rating}
        </div>
      </div>

      {/* Position */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-lg bg-gradient-to-br from-neon-blue to-neon-green flex items-center justify-center">
        <div className="font-tech text-xl font-bold text-white">
          {position}
        </div>
      </div>

      {/* Player Image */}
      <div className="relative w-full h-48 mb-4 bg-gradient-to-b from-dark-blue/50 to-dark-blue/80 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain mix-blend-luminosity"
        />
      </div>

      {/* Player Name */}
      <div className="text-center mb-4">
        <h3 className="font-heading text-2xl text-white">{name}</h3>
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
          <span>{club}</span>
          <span>•</span>
          <span>{country}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">PAC</span>
          <span className="font-tech text-neon-blue">{stats.pace}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">SHO</span>
          <span className="font-tech text-neon-blue">{stats.shooting}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">PAS</span>
          <span className="font-tech text-neon-blue">{stats.passing}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">DRI</span>
          <span className="font-tech text-neon-blue">{stats.dribbling}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">DEF</span>
          <span className="font-tech text-neon-blue">{stats.defending}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">PHY</span>
          <span className="font-tech text-neon-blue">{stats.physical}</span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/10 to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
    </motion.div>
  );
}
