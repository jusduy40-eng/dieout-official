// app/secret/page.tsx (แก้ไข)
'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import artistsData from '@/data/artists.json'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SecretPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [viewedArtists, setViewedArtists] = useState<string[]>([])

  useEffect(() => {
    const viewed = localStorage.getItem('viewedArtists')
    if (viewed) {
      const parsed = JSON.parse(viewed)
      setViewedArtists(parsed)
      if (parsed.length >= artistsData.length) {
        setUnlocked(true)
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-black px-6 pt-20">
        {!unlocked ? (
          <motion.div 
            className="text-center max-w-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-8xl mb-8"
            >
              🔒
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient" style={{ fontFamily: 'var(--font-orbitron)' }}>
              SECRET LOCKED
            </h1>
            
            <p className="text-gray-400 mb-8 text-lg">
              View all artists to unlock hidden content
            </p>
            
            <div className="mb-8">
              <p className="text-2xl text-purple-400 mb-4 font-bold">
                Progress: {viewedArtists.length} / {artistsData.length}
              </p>
              <div className="w-80 h-3 bg-gray-800 rounded-full overflow-hidden mx-auto shadow-[0_0_20px_rgba(124,58,237,0.3)]">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(viewedArtists.length / artistsData.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Viewed Artists List */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {artistsData.map((artist) => (
                <div
                  key={artist.slug}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    viewedArtists.includes(artist.slug)
                      ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                      : 'bg-gray-800 text-gray-600'
                  }`}
                >
                  {viewedArtists.includes(artist.slug) ? '✓' : '○'} {artist.name}
                </div>
              ))}
            </div>
            
            <Link 
              href="/members" 
              className="inline-block btn-primary text-lg"
            >
              GO TO MEMBERS →
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 30px rgba(124, 58, 237, 0.5)",
                  "0 0 80px rgba(124, 58, 237, 0.8)",
                  "0 0 30px rgba(124, 58, 237, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block p-12 rounded-3xl glass mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-9xl mb-8"
              >
                🎁
              </motion.div>
              
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient" style={{ fontFamily: 'var(--font-orbitron)' }}>
                SECRET UNLOCKED
              </h1>
              
              <p className="text-2xl text-cyan-400 mb-8">
                Congratulations! You found the secret card.
              </p>
              
              <div className="p-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-2xl border-2 border-purple-500/50">
                <p className="text-2xl font-bold mb-4">🎉 Special Content</p>
                <p className="text-gray-300 text-lg">
                  You're a true DIEOUT fan!<br/>
                  More exclusive content coming soon...
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8"
              >
                <Link 
                  href="/members" 
                  className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-bold hover:scale-105 transition-transform"
                >
                  Explore More →
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </>
  )
}