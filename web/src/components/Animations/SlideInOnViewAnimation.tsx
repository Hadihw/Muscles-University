'use client'

import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

export default function SlideInOnViewAnimation({ children, direction = 'left' }: { children: ReactNode; direction?: 'left' | 'right' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const animationClass = direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left'
  return (
    <div ref={ref} className={`transition-all duration-500 ${inView ? animationClass : 'opacity-0'}`}>
      {children}
    </div>
  )
}


