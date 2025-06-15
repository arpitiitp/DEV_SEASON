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
    if (user) navigate('/')
  }, [user, navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="First Name"
              required
              value={form.firstName}
              onChange={e =>
                setForm(f => ({ ...f, firstName: e.target.value }))
              }
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <input
              type="text"
              placeholder="Last Name"
              required
              value={form.lastName}
              onChange={e =>
                setForm(f => ({ ...f, lastName: e.target.value }))
              }
              className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e =>
              setForm(f => ({ ...f, email: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={e =>
              setForm(f => ({ ...f, password: e.target.value }))
            }
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
