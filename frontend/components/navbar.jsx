// src/components/Navbar.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()

  const navLinks = [
    { name: 'Home',     to: '/'         },
    { name: 'Contest',  to: '/contest'  },
    { name: 'Problems', to: '/problems' },
  ]

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo + desktop links */}
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
          </Link>
          <nav className="hidden md:flex space-x-6 ml-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                className={`
                  relative px-2 py-1 font-medium text-gray-700
                  before:absolute before:bottom-0 before:left-0
                  before:h-0.5 before:w-0 before:bg-indigo-600
                  before:transition-all before:duration-300
                  hover:text-indigo-600 hover:before:w-full
                  transform hover:scale-105 hover:translate-y-0.5
                  transition ease-in-out duration-200
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* desktop auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* mobile menu toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="md:hidden p-2 rounded hover:bg-gray-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="space-y-1 px-4 py-3">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition font-medium"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <button
                onClick={() => { setOpen(false); logout() }}
                className="w-full text-left px-3 py-2 mt-1 rounded-md border border-red-600 text-red-600 hover:bg-red-50 transition font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 mt-1 rounded-md text-indigo-600 hover:bg-indigo-50 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 mt-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
