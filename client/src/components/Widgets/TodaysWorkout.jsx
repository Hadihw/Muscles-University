'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { MoreHorizontal } from 'lucide-react'

const WorkoutItemSkeleton = () => (
  <div className="flex items-center justify-between text-dark">
    <div className="flex items-center space-x-4">
      <Skeleton height={48} width={48} />
      <div>
        <Skeleton height={20} width={1} />
        <Skeleton height={15} width={80} style={{ marginTop: 5 }} />
      </div>
    </div>
    <Skeleton height={24} width={24} />
  </div>
)

export default function TodaysWorkout({ workouts, loading, className }) {
  if (loading) {
    return (
      <div className={`bg-white p-4 rounded-lg shadow-md ${className} flex flex-col min-h-0`}>
        <Skeleton height={30} width={200} />
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          {[...Array(4)].map((_, index) => (
            <WorkoutItemSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  const visibleWorkouts = workouts.slice(0, 4)
  const remainingWorkouts = workouts.length - visibleWorkouts.length

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className} flex flex-col min-h-0`}>
      <h2 className="text-lg font-semibold text-dark mb-4">Today's Workout</h2>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {visibleWorkouts.map((workout, index) => (
          <WorkoutItem
            key={index}
            title={workout.title}
            bodyPart={workout.bodyPart}
            reps={workout.reps}
            image={workout.image}
          />
        ))}
        {remainingWorkouts > 0 && (
          <div className="text-center mt-4">
            <button className="text-sm text-primary hover:underline">
              View {remainingWorkouts} more exercises
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const WorkoutItem = ({ title, bodyPart, reps, image }) => (
  <div className="flex items-center justify-between text-dark">
    <div className="flex items-center space-x-4">
      <img src={image} alt={title} className="w-12 h-12 object-cover rounded-md" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-text">{bodyPart}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className="text-sm hidden sm:inline">{reps}</span>
      <MoreHorizontal className="cursor-pointer text-text" />
    </div>
  </div>
)
