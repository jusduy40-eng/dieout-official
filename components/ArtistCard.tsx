'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Artist {
  name: string;
  slug: string;
  role: string;
  image: string;
  top: boolean;
  trending: boolean;
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.slug}`}>
      <div className="relative group overflow-hidden rounded-2xl glass cursor-pointer h-[500px] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]">
        <div className="relative h-full overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-40% to-transparent" />
          
          {artist.top && (
            <div className="absolute top-5 right-5 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-bold tracking-wider">
              TOP ARTIST
            </div>
          )}
          
          {artist.trending && (
            <div className="absolute top-5 left-5 px-4 py-2 bg-red-600 rounded-full text-xs font-bold tracking-wider animate-pulse">
              TRENDING
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="text-3xl font-black mb-2 text-white group-hover:text-gradient transition-all">
            {artist.name}
          </h3>
          <p className="text-gray-300 text-sm tracking-wider uppercase">{artist.role}</p>
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/50 rounded-2xl transition-all duration-500" />
      </div>
    </Link>
  );
}