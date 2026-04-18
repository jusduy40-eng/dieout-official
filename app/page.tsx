'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';

const Spline = dynamic(
  () => import('@splinetool/react-spline/next'),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-full bg-black" /> 
  }
);

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <Navbar />
      
      {isLoading && !sceneLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="w-28 h-28 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="mt-8 text-2xl font-bold text-gradient tracking-widest">LOADING</p>
        </div>
      )}
      
      <Suspense fallback={null}>
        <Spline
          scene="https://prod.spline.design/VsV1P0JaNGaAroo4/scene.splinecode"
          onLoad={() => {
            setSceneLoaded(true);
            setTimeout(() => setIsLoading(false), 500);
          }}
          className="w-full h-full"
        />
      </Suspense>

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-black mb-4 text-gradient tracking-tighter pointer-events-auto"
          style={{ fontFamily: 'var(--font-orbitron)' }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          DIEOUT
        </motion.h1>

        <motion.button
          onClick={() => router.push('/members')}
          className="pointer-events-auto btn-primary text-lg tracking-wider mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 200 }}
        >
          ENTER UNIVERSE
        </motion.button>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/50" />
    </main>
  );
}