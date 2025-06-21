import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreateProblem() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '',
    description: '',
    constraints: '',
    difficulty: 'Easy',
    testCases: [{ input: '', output: '', explanation: '' }]
  })
  const [status, setStatus] = useState({ success: false, message: '' })

  const handleChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val }))

  const handleTestCaseChange = (idx, key, val) => {
    const tcs = [...form.testCases]
    tcs[idx][key] = val
    setForm(f => ({ ...f, testCases: tcs }))
  }

  const addTestCase = () =>
    setForm(f => ({
      ...f,
      testCases: [...f.testCases, { input: '', output: '', explanation: '' }]
    }))

  const removeTestCase = idx =>
    setForm(f => ({
      ...f,
      testCases: f.testCases.filter((_, i) => i !== idx)
    }))

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      constraints: '',
      difficulty: 'Easy',
      testCases: [{ input: '', output: '', explanation: '' }]
    })
    setStatus({ success: false, message: '' })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:3000/problems',
        form,
        { withCredentials: true }
      )
      setStatus({ success: true, message: 'Problem created successfully!' })
    } catch (err) {
      setStatus({
        success: false,
        message: err.response?.data?.message || 'Error creating problem'
      })
    }
  }

  if (status.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">
            {status.message}
          </h2>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add Another
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-12 mb-24">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Create New Problem</h2>
      {status.message && (
        <p
          className={`mb-6 text-center text-lg ${
            status.success ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {status.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2 text-gray-700">Title</label>
            <input
              required
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-gray-700">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={e => handleChange('difficulty', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Constraints</label>
          <textarea
            required
            rows={2}
            value={form.constraints}
            onChange={e => handleChange('constraints', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">Test Cases</h3>
          {form.testCases.map((tc, i) => (
            <div
              key={i}
              className="p-6 border border-gray-200 rounded-xl bg-gray-50 space-y-4"
            >
              <div>
                <label className="block font-medium mb-1 text-gray-700">Input</label>
                <textarea
                  required
                  rows={2}
                  value={tc.input}
                  onChange={e =>
                    handleTestCaseChange(i, 'input', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Expected Output
                </label>
                <textarea
                  required
                  rows={1}
                  value={tc.output}
                  onChange={e =>
                    handleTestCaseChange(i, 'output', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-gray-700">
                  Explanation <span className="text-sm text-gray-500">(optional)</span>
                </label>
                <textarea
                  rows={1}
                  value={tc.explanation}
                  onChange={e =>
                    handleTestCaseChange(i, 'explanation', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <button
                type="button"
                onClick={() => removeTestCase(i)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addTestCase}
            className="px-5 py-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition"
          >
            + Add Test Case
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-lg font-medium"
        >
          Create Problem
        </button>
      </form>
    </div>
  )
}