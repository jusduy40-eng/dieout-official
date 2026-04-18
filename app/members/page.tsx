'use client';

import { useState, useEffect } from 'react';
import ArtistCard from '@/components/ArtistCard';
import artistsData from '@/data/artists.json';
import Navbar from '@/components/Navbar';

export default function MembersPage() {
  const [filter, setFilter] = useState<'all' | 'trending' | 'new'>('all');
  const [viewedArtists, setViewedArtists] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('viewedArtists');
    if (stored) setViewedArtists(JSON.parse(stored));
  }, []);

  const handleArtistView = (slug: string) => {
    const updated = [...viewedArtists, slug].filter((v, i, a) => a.indexOf(v) === i);
    setViewedArtists(updated);
    localStorage.setItem('viewedArtists', JSON.stringify(updated));
  };

  const filteredArtists = artistsData.filter(artist => {
    if (filter === 'trending') return artist.trending;
    if (filter === 'new') return !artist.trending;
    return true;
  });

  const progress = (viewedArtists.length / artistsData.length) * 100;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-7xl md:text-8xl font-black mb-6 text-gradient tracking-tighter" style={{ fontFamily: 'var(--font-orbitron)' }}>
              THE SQUAD
            </h1>
            <p className="text-gray-400 text-lg tracking-widest uppercase mb-12">Meet the DIEOUT Family</p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="glass rounded-2xl p-6">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-purple-400 font-bold tracking-wider">SECRET PROGRESS</span>
                  <span className="text-cyan-400 font-bold">{viewedArtists.length}/{artistsData.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {(['all', 'trending', 'new'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full border-2 capitalize font-bold tracking-wider transition-all ${filter === f ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)]' : 'border-gray-700 text-gray-400 hover:border-purple-400'}`}
              >
                {f === 'all' ? 'All Members' : f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArtists.map((artist) => (
              <div key={artist.slug} onClick={() => handleArtistView(artist.slug)}>
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}