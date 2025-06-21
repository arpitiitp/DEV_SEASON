// src/pages/Problems.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Problems() {
  const [problems, setProblems] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/problems', { withCredentials:true })
      .then(res => setProblems(res.data))
      .catch(console.error)
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Problems</h1>
      <ul className="space-y-2">
        {problems.map(p => (
          <li key={p._id}>
            <Link
              to={`/solve/${p._id}`}
              className="block p-4 border rounded hover:bg-gray-50 transition"
            >
              <div className="flex justify-between">
                <span className="font-medium">{p.title}</span>
                <span className="text-sm text-gray-500">{p.difficulty}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
