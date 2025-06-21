import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

// Utility to convert MongoDB ObjectId to a shorter numeric ID for easier lookup
function decodeHexId(hexId) {
  // Use the last 8 characters (32 bits) for a safe numeric conversion
  return parseInt(hexId.slice(-8), 16)
}

export default function SolveProblem() {
  const { id } = useParams()
  const [prob, setProb] = useState(null)

  useEffect(() => {
    axios
      .get(`http://localhost:3000/problems/${id}`, { withCredentials: true })
      .then(res => setProb(res.data))
      .catch(console.error)
  }, [id])

  if (!prob) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600">Loading problem...</p>
      </div>
    )
  }

  const numericId = decodeHexId(prob._id)

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-8 mb-16">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
        {`#${numericId} - ${prob.title}`}
      </h1>

      <p className="text-gray-700 mb-6 whitespace-pre-line">{prob.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Constraints</h2>
        <ul className="list-disc list-inside text-gray-600 border-l-4 border-indigo-500 pl-4 space-y-1">
          {prob.constraints.split('\n').map((line, idx) => (
            <li key={idx}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Difficulty:</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
            ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
             prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
             'bg-red-100 text-red-800'}`}
        >
          {prob.difficulty}
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Test Cases</h2>
        <ul className="space-y-4">
          {prob.testCases.map((tc, i) => (
            <li key={i} className="p-6 bg-gray-50 rounded-xl border border-gray-200">
              <p className="mb-2 text-gray-700">
                <span className="font-medium">Input:</span> {tc.input}
              </p>
              <p className="mb-2 text-gray-700">
                <span className="font-medium">Expected:</span> {tc.output}
              </p>
              {tc.explanation && (
                <p className="text-gray-600 italic">
                  {tc.explanation}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}