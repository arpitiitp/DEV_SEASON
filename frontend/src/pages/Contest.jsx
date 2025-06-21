// src/pages/Contest.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Contest() {
  const [contests, setContests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get('http://localhost:3000/contests', {
          withCredentials: true
        })
        setContests(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to load contests.')
      } finally {
        setLoading(false)
      }
    }
    fetchContests()
  }, [])

  if (loading) return <p className="p-6 text-center">Loading contests…</p>
  if (error)   return <p className="p-6 text-red-600">{error}</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contests</h1>
      {contests.length === 0 ? (
        <p>No contests available.</p>
      ) : (
        <ul className="space-y-4">
          {contests.map(contest => (
            <li key={contest._id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{contest.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(contest.start).toLocaleString()} &ndash;{' '}
                    {new Date(contest.end).toLocaleString()}
                  </p>
                </div>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                >
                  Join
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
