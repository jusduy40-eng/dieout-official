'use client';

import { notFound } from 'next/navigation';
import artistsData from '@/data/artists.json';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';

interface Artist {
  name: string;
  slug: string;
  role: string;
  image: string;
  bio: string;
  top: boolean;
  trending: boolean;
  songs: Array<{ title: string; youtube: string }>;
  social: { youtube: string; spotify: string; appleMusic: string };
}

export default function ArtistProfile({ params }: { params: { slug: string } }) {
  const artist = artistsData.find((a) => a.slug === params.slug) as Artist | undefined;

  useEffect(() => {
    if (artist) {
      const viewed = JSON.parse(localStorage.getItem('viewedArtists') || '[]');
      if (!viewed.includes(artist.slug)) {
        viewed.push(artist.slug);
        localStorage.setItem('viewedArtists', JSON.stringify(viewed));
      }
    }
  }, [artist]);

  if (!artist) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-black via-purple-950/30 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative h-[600px] rounded-3xl overflow-hidden mb-16 shadow-[0_0_60px_rgba(124,58,237,0.3)]">
            <Image src={artist.image} alt={artist.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-30% to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-12">
              <h1 className="text-6xl md:text-8xl font-black mb-4 text-gradient tracking-tighter" style={{ fontFamily: 'var(--font-orbitron)' }}>
                {artist.name}
              </h1>
              <p className="text-2xl text-purple-400 mb-4 tracking-wider uppercase">{artist.role}</p>
              <p className="text-gray-300 max-w-2xl text-lg">{artist.bio}</p>
            </div>

            <div className="absolute top-8 right-8 flex gap-3">
              {artist.top && <div className="px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-sm font-bold">TOP ARTIST</div>}
              {artist.trending && <div className="px-5 py-2 bg-red-600 rounded-full text-sm font-bold animate-pulse">TRENDING</div>}
            </div>
          </div>

          <section className="mb-20">
            <h2 className="text-4xl font-black mb-10 text-gradient tracking-tight">LATEST TRACKS</h2>
            <div className="grid gap-4">
              {artist.songs.map((song, index) => (
                <div key={index} className="glass p-8 rounded-2xl flex items-center justify-between hover:border-purple-500/50 transition-all">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{song.title}</h3>
                    <p className="text-gray-400 text-sm">Watch on YouTube</p>
                  </div>
                  <Link href={song.youtube} target="_blank" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all">
                    WATCH
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-4xl font-black mb-10 text-gradient tracking-tight">STREAM NOW</h2>
            <div className="flex gap-4 flex-wrap">
              {artist.social.youtube && <Link href={artist.social.youtube} target="_blank" className="px-8 py-4 glass rounded-xl hover:bg-red-600/80 transition-all font-bold">YouTube</Link>}
              {artist.social.spotify && <Link href={artist.social.spotify} target="_blank" className="px-8 py-4 glass rounded-xl hover:bg-green-600/80 transition-all font-bold">Spotify</Link>}
              {artist.social.appleMusic && <Link href={artist.social.appleMusic} target="_blank" className="px-8 py-4 glass rounded-xl hover:bg-pink-600/80 transition-all font-bold">Apple Music</Link>}
            </div>
          </section>

          <div className="text-center">
            <Link href="/members" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors tracking-wider">
              ← Back to Members
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}