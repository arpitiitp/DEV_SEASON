// frontend/src/pages/Register.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/problems')
  }, [user, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/problems')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Create Your Account
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                required
                value={form.firstName}
                onChange={e =>
                  setForm(f => ({ ...f, firstName: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                required
                value={form.lastName}
                onChange={e =>
                  setForm(f => ({ ...f, lastName: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={e =>
                setForm(f => ({ ...f, password: e.target.value }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}
