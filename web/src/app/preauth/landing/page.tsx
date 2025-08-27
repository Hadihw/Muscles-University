'use client'

import NavigationBar from '@/components/PreAuth/NavigationBar'
import LandingPage from '@/pages/PreAuth/Landing'

export default function LandingRoute() {
  return (
    <div className="min-h-screen">
      <NavigationBar />
      <LandingPage />
    </div>
  )
}


