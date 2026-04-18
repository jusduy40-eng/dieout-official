// app/members/page.tsx
'use client'

import { motion } from 'framer-motion'
import ArtistCard from '@/components/ArtistCard'
import artistsData from '@/data/artists.json'
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'

export default function MembersPage() {
  const [filter, setFilter] = useState<'all' | 'trending' | 'new'>('all')
  const [viewedArtists, setViewedArtists] = useState<string[]>([])

  // Track viewed artists for secret page
  useEffect(() => {
    const stored = localStorage.getItem('viewedArtists')
    if (stored) {
      setViewedArtists(JSON.parse(stored))
    }
  }, [])

  const handleArtistView = (slug: string) => {
    const updated = [...viewedArtists, slug].filter((v, i, a) => a.indexOf(v) === i)
    setViewedArtists(updated)
    localStorage.setItem('viewedArtists', JSON.stringify(updated))
  }

  const filteredArtists = artistsData.filter(artist => {
    if (filter === 'trending') return artist.trending
    if (filter === 'new') return !artist.trending
    return true
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-6 bg-gradient-to-b from-black via-purple-950 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-gradient" style={{ fontFamily: 'var(--font-orbitron)' }}>
              THE SQUAD
            </h1>
            <p className="text-xl text-gray-400">Meet the DIEOUT family</p>
            
            {/* Progress to unlock secret */}
            <div className="mt-6 max-w-md mx-auto">
              <p className="text-sm text-purple-400 mb-2">
                Secret Progress: {viewedArtists.length} / {artistsData.length}
              </p>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(viewedArtists.length / artistsData.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div 
            className="flex justify-center gap-4 mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {(['all', 'trending', 'new'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full border-2 capitalize font-bold transition-all ${
                  filter === f 
                    ? 'border-purple-500 bg-purple-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]' 
                    : 'border-gray-600 text-gray-400 hover:border-purple-400 hover:text-white'
                }`}
              >
                {f === 'all' ? 'All Members' : f}
              </button>
            ))}
          </motion.div>

          {/* Artists Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {filteredArtists.map((artist) => (
              <div key={artist.slug} onClick={() => handleArtistView(artist.slug)}>
                <ArtistCard artist={artist} />
              </div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredArtists.length === 0 && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-2xl text-gray-500">No artists found</p>
            </motion.div>
          )}
        </div>
      </main>
    </>
  )
}