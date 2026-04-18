'use client';

import { useState, useEffect } from 'react';
import artistsData from '@/data/artists.json';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function SecretPage() {
  const [viewedArtists, setViewedArtists] = useState<string[]>([]);
  const unlocked = viewedArtists.length >= artistsData.length;
  const progress = (viewedArtists.length / artistsData.length) * 100;

  useEffect(() => {
    const viewed = localStorage.getItem('viewedArtists');
    if (viewed) setViewedArtists(JSON.parse(viewed));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-8xl font-black mb-6 text-gradient tracking-tighter" style={{ fontFamily: 'var(--font-orbitron)' }}>
              SECRET VAULT
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <div className="glass rounded-2xl p-8">
                <div className="flex justify-between text-lg mb-4">
                  <span className="text-purple-400 font-bold tracking-wider">UNLOCK PROGRESS</span>
                  <span className="text-cyan-400 font-bold">{viewedArtists.length}/{artistsData.length}</span>
                </div>
                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          {unlocked ? (
            <div className="max-w-4xl mx-auto">
              <div className="glass p-16 rounded-3xl border-2 border-purple-500/50 text-center">
                <h2 className="text-6xl font-black text-gradient mb-6 tracking-tighter" style={{ fontFamily: 'var(--font-orbitron)' }}>
                  ALL SECRETS UNLOCKED
                </h2>
                <p className="text-2xl text-cyan-400 mb-8 tracking-wider">Welcome to the Inner Circle</p>
                <div className="p-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-2xl">
                  <p className="text-xl text-gray-300">Exclusive content available soon</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass p-16 rounded-3xl">
                <div className="text-8xl mb-6">🔒</div>
                <h2 className="text-4xl font-black mb-4 text-gradient">CONTENT LOCKED</h2>
                <p className="text-gray-400 mb-8 text-lg">View all artist profiles to unlock exclusive content</p>
                <Link href="/members" className="btn-primary inline-block">
                  View Members
                </Link>
              </div>
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/members" className="text-purple-400 hover:text-purple-300 transition-colors tracking-wider">
              ← Back to Members
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}