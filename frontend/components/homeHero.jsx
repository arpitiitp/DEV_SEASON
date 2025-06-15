// frontend/components/HomeHero.jsx
import React from 'react'

export default function HomeHero() {
  return (
    <section className="max-w-7xl mx-auto mt-8 px-4 flex flex-col-reverse md:flex-row items-center gap-8">
      {/* Left: Welcome text */}
      <div className="md:w-1/2 text-gray-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-indigo-600">Online Judge</span>
        </h1>
        <p className="text-lg md:text-xl">
          Sharpen your coding skills by solving problems, organizing contests, and tracking your progress.
        </p>
      </div>

      {/* Right: Hero image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          src="/hero-coders.jpg"
          alt="Coders collaborating"
          className="w-full max-w-md rounded-lg shadow-lg object-cover"
        />
      </div>
    </section>
  )
}
