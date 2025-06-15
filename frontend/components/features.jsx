// frontend/components/Features.jsx
import React from 'react'

const features = [
  {
    name: 'Organize Contest',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* ClipboardList */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-2-2h-4a2 2 0 00-2 2v2h8V5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 7h6M9 11h6M9 15h6"
        />
      </svg>
    ),
  },
  {
    name: 'Solve Problems',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Code Icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 18l6-6-6-6M8 6l-6 6 6 6"
        />
      </svg>
    ),
  },
  {
    name: 'Create Problem',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Pencil Alt */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-8.586-5.414l6-6a2 2 0 112.828 2.828l-6 6M13 7l4 4"
        />
      </svg>
    ),
  },
  {
    name: 'Progress Skill',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* Chart Bar */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3v18h18M9 17v-6m4 6v-10m4 6v-4"
        />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto mt-12 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map(({ name, svg }) => (
        <div
          key={name}
          className={`
            flex flex-col items-center p-6 border border-gray-200 rounded-lg
            hover:border-indigo-600 hover:shadow-lg transform hover:-translate-y-1
            transition-all duration-200
          `}
        >
          {svg}
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        </div>
      ))}
    </section>
  )
}
