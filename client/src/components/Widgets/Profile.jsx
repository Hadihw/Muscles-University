'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Edit } from 'lucide-react'

export default function Profile({ userData, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex-none">
        <Skeleton height={30} width={150} />
        <div className="flex items-center mb-4 mt-4">
          <Skeleton circle height={64} width={64} />
          <div className="ml-4">
            <Skeleton height={20} width={100} />
            <Skeleton height={15} width={80} style={{ marginTop: 5 }} />
          </div>
        </div>
        <div className="flex justify-between text-sm">
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={60} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-dark">My Profile</h2>
        <Edit className="text-dark cursor-pointer text-sm" />
      </div>
      <div className="flex items-center mb-4">
        <img
          src={userData.profilePic}
          alt="Profile"
          className="rounded-full w-16 h-16 object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold text-dark">
            {userData.firstName} {userData.lastName}
          </h3>
          <p className="text-sm text-text">@{userData.username}</p>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <div className="text-center">
          <p className="font-semibold text-dark">{userData.weight}kg</p>
          <p className="text-text">Weight</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-dark">{userData.height}cm</p>
          <p className="text-text">Height</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-dark">{userData.age}</p>
          <p className="text-text">Age</p>
        </div>
      </div>
    </div>
  )
}
