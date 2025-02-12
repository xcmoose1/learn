import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // Sjekk om brukeren har et navn lagret
    const savedUser = localStorage.getItem('username');
    setUser(savedUser);
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
