// app/artist/[slug]/page.tsx
'use client'

import { motion } from 'framer-motion'
import artistsData from '@/data/artists.json'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'

// TypeScript Interface
interface Artist {
  name: string
  slug: string
  role: string
  image: string
  bio: string
  top: boolean
  trending: boolean
  songs: Array<{
    title: string
    youtube: string
  }>
  social: {
    youtube: string
    spotify: string
    appleMusic: string
  }
}

export default function ArtistProfile({ params }: { params: { slug: string } }) {
  const artist = artistsData.find((a) => a.slug === params.slug) as Artist | undefined

  useEffect(() => {
    // Track viewed artist for secret page unlock
    if (artist) {
      const viewed = JSON.parse(localStorage.getItem('viewedArtists') || '[]')
      if (!viewed.includes(artist.slug)) {
        viewed.push(artist.slug)
        localStorage.setItem('viewedArtists', JSON.stringify(viewed))
      }
    }
  }, [artist])

  if (!artist) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black via-purple-950 to-black">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Cover Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-[0_0_50px_rgba(124,58,237,0.3)]"
          >
            <Image
              src={artist.image || '/images/artists/placeholder.jpg'}
              alt={artist.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-gradient"
                style={{ fontFamily: 'var(--font-orbitron)' }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {artist.name}
              </motion.h1>
              <p className="text-xl md:text-2xl text-purple-400 mb-4">{artist.role}</p>
              <p className="text-gray-300 max-w-2xl text-lg">{artist.bio}</p>
            </div>

            {/* Badges */}
            <div className="absolute top-6 right-6 flex gap-3">
              {artist.top && (
                <motion.div 
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-sm font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  ⭐ TOP ARTIST
                </motion.div>
              )}
              {artist.trending && (
                <motion.div 
                  className="px-4 py-2 bg-red-500 rounded-full text-sm font-bold animate-pulse"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                >
                  🔥 TRENDING
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Songs Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-gradient">LATEST TRACKS</h2>
            <div className="grid gap-4">
              {artist.songs.map((song, index) => (
                <motion.div
                  key={index}
                  className="glass p-6 rounded-2xl flex items-center justify-between hover:border-purple-500 transition-all cursor-pointer group"
                  whileHover={{ scale: 1.02, x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xl">
                      🎵
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors">
                        {song.title}
                      </h3>
                      <p className="text-gray-400 text-sm">Watch on YouTube</p>
                    </div>
                  </div>
                  <Link 
                    href={song.youtube}
                    target="_blank"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                  >
                    WATCH ▶
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Streaming Platforms Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold mb-8 text-gradient">STREAM NOW</h2>
            <div className="flex gap-4 flex-wrap">
              {artist.social.youtube && (
                <Link
                  href={artist.social.youtube}
                  target="_blank"
                  className="px-8 py-4 glass rounded-xl hover:bg-red-600 transition-all hover:scale-105 font-bold flex items-center gap-2"
                >
                  <span className="text-2xl">📺</span> YouTube
                </Link>
              )}
              {artist.social.spotify && (
                <Link
                  href={artist.social.spotify}
                  target="_blank"
                  className="px-8 py-4 glass rounded-xl hover:bg-green-600 transition-all hover:scale-105 font-bold flex items-center gap-2"
                >
                  <span className="text-2xl">🎵</span> Spotify
                </Link>
              )}
              {artist.social.appleMusic && (
                <Link
                  href={artist.social.appleMusic}
                  target="_blank"
                  className="px-8 py-4 glass rounded-xl hover:bg-pink-600 transition-all hover:scale-105 font-bold flex items-center gap-2"
                >
                  <span className="text-2xl">🎶</span> Apple Music
                </Link>
              )}
            </div>
          </motion.section>

          {/* Back Button */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href="/members"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              ← Back to Members
            </Link>
          </motion.div>

        </div>
      </main>
    </>
  )
}