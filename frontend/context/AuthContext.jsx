// frontend/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // on mount, verify session
    (async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:3000/auth/me',
          { withCredentials: true }
        )
        setUser(data)  // now has { firstName, lastName, email, _id }
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const login = async creds => {
    await axios.post('http://localhost:3000/auth/login', creds, { withCredentials: true })
    setUser({ authenticated: true })
    navigate('/')
  }

  const register = async profile => {
    await axios.post('http://localhost:3000/auth/register', profile, { withCredentials: true })
    await login({ email: profile.email, password: profile.password })
  }

  const logout = async () => {
    await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
