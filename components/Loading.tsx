'use client'

import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Spinning Circle */}
      <motion.div
        className="w-24 h-24 border-4 border-purple-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Pulsing Text */}
      <motion.p 
        className="mt-6 text-2xl font-bold"
        style={{ fontFamily: 'var(--font-orbitron)' }}
        animate={{ 
          opacity: [0.3, 1, 0.3],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-gradient">LOADING UNIVERSE</span>
      </motion.p>

      {/* Loading Dots */}
      <motion.div 
        className="flex gap-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-500 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}