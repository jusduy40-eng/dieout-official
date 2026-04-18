'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface Artist {
  name: string
  slug: string
  role: string
  image: string
  top: boolean
  trending: boolean
}

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.slug}`}>
      <motion.div
        className="relative group overflow-hidden rounded-2xl glass cursor-pointer"
        whileHover={{ scale: 1.05, y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative h-96 overflow-hidden">
          <Image
            src={artist.image || '/images/artists/placeholder.jpg'}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
          
          {artist.top && (
            <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-bold">
              TOP ARTIST
            </div>
          )}
          
          {artist.trending && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 rounded-full text-xs font-bold animate-pulse">
              🔥 TRENDING
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
            {artist.name}
          </h3>
          <p className="text-gray-300">{artist.role}</p>
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500 rounded-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]" />
      </motion.div>
    </Link>
  )
}