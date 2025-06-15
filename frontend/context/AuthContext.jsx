// frontend/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  // On mount, verify session by pinging a protected endpoint
  useEffect(() => {
    (async () => {
      try {
        await axios.get('http://localhost:3000/', { withCredentials: true })
        setUser({ authenticated: true })
      } catch {
        setUser(null)
      }
    })()
  }, [])

  const login = async ({ email, password }) => {
    await axios.post(
      'http://localhost:3000/login',
      { email, password },
      { withCredentials: true }
    )
    setUser({ authenticated: true })
    navigate('/')
  }

  const register = async (profile) => {
    await axios.post(
      'http://localhost:3000/register',
      profile,
      { withCredentials: true }
    )
    // auto-login
    await login({ email: profile.email, password: profile.password })
  }

  const logout = async () => {
    await axios.post(
      'http://localhost:3000/logout',
      {},
      { withCredentials: true }
    )
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// default export for the provider
export default AuthProvider

// named export for the hook
export function useAuth() {
  return useContext(AuthContext)
}
