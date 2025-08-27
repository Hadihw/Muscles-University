'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-axiom">Muscles University</h1>
        <p>Next.js app scaffolded. Landing page coming soon.</p>
        <div className="space-x-4">
          <Link className="btn-light" href="/preauth/landing">Go to Landing</Link>
        </div>
      </div>
    </main>
  )
}


