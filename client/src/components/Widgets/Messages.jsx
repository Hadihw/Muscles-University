'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ChevronRight } from 'lucide-react'

export default function Messages({ messages, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col flex-1">
        <Skeleton height={30} width={150} />
        <div className="space-y-4 mt-4 flex-1 overflow-y-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Skeleton circle height={40} width={40} />
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
        <h2 className="text-lg font-semibold text-dark">Messages</h2>
        <button className="text-sm text-primary hover:underline flex items-center">
          View all <ChevronRight className="ml-1 w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <img
              src={message.senderImage}
              alt={message.senderName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-dark">{message.senderName}</h3>
              <p className="text-sm text-text">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
