'use client'

import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function WeightTrackingHistory({ weightData, loading }) {
  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col min-h-0">
        <Skeleton height={30} width={200} />
        <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
        <div className="flex-1">
          <Skeleton height="100%" />
        </div>
      </div>
    )
  }

  const data = {
    labels: weightData.labels,
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightData.data,
        borderColor: 'rgb(17, 24, 39)',
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.min(...weightData.data) - 1,
        max: Math.max(...weightData.data) + 1,
      },
    },
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex-1 flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-semibold text-dark">Weight Tracking</h2>
          <p className="text-xs text-text">
            Your current weight is {weightData.data[weightData.data.length - 1]} kg
          </p>
        </div>
        <select className="border border-gray-300 rounded px-2 py-1 text-xs">
          <option>Week</option>
          <option>Month</option>
        </select>
      </div>
      <div className="flex-1">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
