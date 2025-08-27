import React from 'react'
import { Bell } from 'lucide-react'

export default function Header({ greeting, name }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-xl font-bold text-dark">
          {greeting}
          {name ? `, ${name}!` : '!'}
        </h1>
        <p className="text-sm text-text">Ready for your workout?</p>
      </div>
      <div className="flex-shrink-0">
        <Bell className="text-dark text-lg cursor-pointer" />
      </div>
    </div>
  )
}
