'use client'

import React, { useState, useEffect } from 'react'
import Header from './Header'
import WeightTrackingHistory from '../../Widgets/WeightTracking'
import TodaysWorkout from '../../Widgets/TodaysWorkout'
import Trainers from '../../Widgets/Trainers'
import UserProfile from '../../Widgets/Profile'
import UpcomingEvents from '../../Widgets/UpcomingEvents'
import Messages from '../../Widgets/Messages'
import {
  fetchUserData,
  fetchWeightData,
  fetchWorkouts,
  fetchTrainers,
  fetchEvents,
  fetchMessages,
} from '../../services/mockDataService'

export default function Home() {
  const [greeting, setGreeting] = useState('')
  const [userData, setUserData] = useState(null)
  const [weightData, setWeightData] = useState(null)
  const [workouts, setWorkouts] = useState([])
  const [trainers, setTrainers] = useState([])
  const [events, setEvents] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          userDataResponse,
          weightDataResponse,
          workoutsResponse,
          trainersResponse,
          eventsResponse,
          messagesResponse,
        ] = await Promise.all([
          fetchUserData(),
          fetchWeightData(),
          fetchWorkouts(),
          fetchTrainers(),
          fetchEvents(),
          fetchMessages(),
        ])

        setUserData(userDataResponse)
        setWeightData(weightDataResponse)
        setWorkouts(workoutsResponse)
        setTrainers(trainersResponse)
        setEvents(eventsResponse)
        setMessages(messagesResponse)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllData()
  }, [])

  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning')
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Good Afternoon')
    } else {
      setGreeting('Good Evening')
    }
  }, [])

  return (
    <div className="flex flex-col flex-1 px-2 bg-background min-h-0 overflow-hidden">
      <Header greeting={greeting} name={userData ? userData.firstName : ''} />
      <div className="flex flex-col lg:flex-row flex-1 mt-4 space-y-4 lg:space-y-0 lg:space-x-4 min-h-0 overflow-hidden">
        {/* Left Side */}
        <div className="w-full lg:w-3/4 flex flex-col space-y-4 min-h-0 overflow-hidden">
          <WeightTrackingHistory weightData={weightData} loading={loading} />
          <div className="flex flex-col md:flex-row flex-1 space-y-4 md:space-y-0 md:space-x-4 min-h-0 overflow-hidden">
            <Trainers trainers={trainers} loading={loading} className="flex-1" />
            <TodaysWorkout workouts={workouts} loading={loading} className="flex-1" />
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full lg:w-1/4 flex flex-col space-y-4 min-h-0 overflow-hidden">
          <UserProfile userData={userData} loading={loading} />
          <UpcomingEvents events={events} loading={loading} />
          <Messages messages={messages} loading={loading} />
        </div>
      </div>
    </div>
  )
}
