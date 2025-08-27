'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ChevronRight } from 'lucide-react'

export default function Trainers({ trainers, loading, className }) {
  if (loading) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow-md ${className} flex flex-col min-h-0`}>
        <Skeleton height={30} width={150} />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-auto mt-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} height={128} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className} flex flex-col min-h-0`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-dark">Trainers</h2>
        <button className="text-sm text-primary hover:underline flex items-center">
          View all <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 overflow-y-auto">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className={`${trainer.color} rounded-lg overflow-hidden relative h-32`}
          >
            <img src={trainer.image} alt={trainer.name} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white">
              <h3 className="font-semibold">{trainer.name}</h3>
              <p className="text-sm">{trainer.expertise}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
