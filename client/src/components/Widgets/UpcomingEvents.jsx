'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ChevronRight, Calendar } from 'lucide-react'

export default function UpcomingEvents({ events, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col flex-1">
        <Skeleton height={30} width={200} />
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Skeleton circle height={24} width={24} />
              <div className="flex-1">
                <Skeleton height={20} width="80%" />
                <Skeleton height={15} width="60%" style={{ marginTop: 5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col flex-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-dark">Upcoming Events</h2>
        <button className="text-sm text-primary hover:underline flex items-center">
          View all <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="flex items-start space-x-3">
            <Calendar className="text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-dark">{event.title}</h3>
              <p className="text-sm text-text">
                {event.date} at {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
