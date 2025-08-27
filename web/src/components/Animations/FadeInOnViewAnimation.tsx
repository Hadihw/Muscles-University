'use client'

import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

export default function FadeInOnViewAnimation({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  return (
    <div ref={ref} className={`transition-opacity duration-500 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
      {children}
    </div>
  )
}


