// src/pages/Progress.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Progress() {
  const [list, setList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/progress', { withCredentials:true })
      .then(res => setList(res.data))
      .catch(console.error)
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Progress</h1>
      <ul className="space-y-3">
        {list.map(entry => (
          <li key={entry._id} className="border p-4 rounded">
            <div className="flex justify-between">
              <span className="font-medium">{entry.problem.title}</span>
              <span className="text-sm text-gray-500">
                {new Date(entry.solvedAt).toLocaleString()}
              </span>
            </div>
            <p>Verdict: <strong>{entry.verdict}</strong></p>
            {entry.comment && <p>Comment: {entry.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
