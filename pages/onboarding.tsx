import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { saveUser, getUser, generateUserId, UserProfile } from '../lib/user';

const avatars = [
  {
    id: 'haaland',
    name: 'Erling Haaland',
    image: '/avatars/haaland.png',
    description: 'Målmaskin fra Norge 🇳🇴'
  },
  {
    id: 'messi',
    name: 'Lionel Messi',
    image: '/avatars/messi.png',
    description: 'Fotballmagikeren fra Argentina 🇦🇷'
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo',
    image: '/avatars/ronaldo.png',
    description: 'Superstjernen fra Portugal 🇵🇹'
  },
  {
    id: 'lewandowski',
    name: 'Robert Lewandowski',
    image: '/avatars/lewandowski.png',
    description: 'Målscorer fra Polen 🇵🇱'
  },
  {
    id: 'graham',
    name: 'Caroline Graham Hansen',
    image: '/avatars/graham.png',
    description: 'Norsk teknikkdronning 🇳🇴'
  },
  {
    id: 'tegner',
    name: 'Kreativ Kunstner',
    image: '/avatars/artist.png',
    description: 'For deg som liker å tegne 🎨'
  },
  {
    id: 'matematiker',
    name: 'Matte-Mester',
    image: '/avatars/mathematician.png',
    description: 'For deg som elsker tall 🔢'
  }
];

const Onboarding = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (user) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Du må skrive inn et navn');
      return;
    }
    
    if (!selectedAvatar) {
      setError('Du må velge en avatar');
      return;
    }

    const user: UserProfile = {
      id: generateUserId(),
      name: name.trim(),
      avatar: selectedAvatar,
      createdAt: new Date().toISOString()
    };

    saveUser(user);
    router.push('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <>
      <Head>
        <title>Velg din spillerfigur</title>
        <meta name="description" content="Velg din avatar og navn for å starte læringen" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Velkommen til Læringsportalen!
            </h1>
            <p className="text-lg text-gray-600">
              Velg din spillerfigur og navn for å starte eventyret
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Hva heter du?
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                placeholder="Skriv navnet ditt her..."
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-4">
                Velg din spillerfigur
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {avatars.map((avatar) => (
                  <motion.div
                    key={avatar.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`w-full h-full p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAvatar === avatar.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={avatar.image}
                          alt={avatar.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{avatar.name}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2">{avatar.description}</p>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-800 rounded-lg">
                {error}
              </div>
            )}

            <Button
              variant="primary"
              fullWidth
              type="submit"
              className="text-lg py-3"
            >
              Start læringen!
            </Button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Onboarding;
