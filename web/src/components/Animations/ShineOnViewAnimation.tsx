'use client'

import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

export default function ShineOnViewAnimation({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <div ref={ref} className="relative">
      {inView && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-light to-transparent opacity-30 animate-shine" style={{ backgroundSize: '400% 400%' }} />
      )}
      {children}
    </div>
  )
}


