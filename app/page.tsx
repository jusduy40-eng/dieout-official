'use client'

import dynamic from 'next/dynamic'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import Navbar from '@/components/Navbar'

// Dynamic import for Spline
const Spline = dynamic(() => import('@splinetool/react-spline/next'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black" />
})

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Timeout fallback - ถ้าโหลดไม่เสร็จใน 10 วินาที ให้ซ่อน loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleSplineLoad = () => {
    console.log('✅ Spline loaded successfully!')
    setIsLoading(false)
  }

  return (
    <main className="relative w-full h-screen overflow-hidden bg-black">
      <Navbar />
      {isLoading && <Loading />}
      
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Spline
          scene="https://prod.spline.design/VsV1P0JaNGaAroo4/scene.splinecode"
          onLoad={handleSplineLoad}
          className="w-full h-full"
        />
      </Suspense>

      {/* Fallback UI ถ้า Spline โหลดไม่สำเร็จ */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <p className="text-purple-400 text-2xl mb-4">3D Model Failed to Load</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-500"
            >
              Reload Page
            </button>
          </div>
        </div>
      )}

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-bold mb-8 text-gradient"
          style={{ fontFamily: 'var(--font-orbitron)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          DIEOUT
        </motion.h1>

        <motion.button
          onClick={() => router.push('/members')}
          className="pointer-events-auto btn-primary text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        >
          DIEOUT WE RUNNING
        </motion.button>
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/60" />
    </main>
  )
}