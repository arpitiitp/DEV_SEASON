import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'

import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProtectedRoute from '../components/ProtectedRoute'

// public pages
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Logout from './pages/logout'

// protected pages
import Problems from './pages/Problems'
import Contest from './pages/Contest'
import CreateProblem from './pages/CreateProblem'
import SolveProblem from './pages/SolveProblem'
import Progress from './pages/Progress'

export default function App() {
  // `undefined` = still loading, `null` = not authenticated, object = user data
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/me')
      .then(res => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  // while we check auth, show a loading state
  if (user === undefined) {
    return (
      <div className="flex-grow flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* top nav, can use `user` to show login/logout links */}
      <Navbar user={user} />

      {/* main content */}
      <main className="flex-grow">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home user={user} />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/problems" /> : <Login setUser={setUser} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/logout"
            element={<Logout setUser={setUser} />}
          />

          {/* protected routes */}
          <Route
            path="/problems"
            element={
              <ProtectedRoute user={user}>
                <Problems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contest"
            element={
              <ProtectedRoute user={user}>
                <Contest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute user={user}>
                <CreateProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/solve/:id"
            element={
              <ProtectedRoute user={user}>
                <SolveProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute user={user}>
                <Progress />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* sticky footer */}
      <Footer />
    </div>
  )
}
