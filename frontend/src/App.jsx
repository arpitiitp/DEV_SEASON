// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar   from '../components/navbar'
import Footer   from '../components/footer'

// page imports
import Home     from './pages/home'
import Login    from './pages/login'
import Register from './pages/register'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* top nav */}
      <Navbar />

      {/* router outlets */}
      <main className="flex-grow">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      {/* sticky footer */}
      <Footer />
    </div>
  )
}
