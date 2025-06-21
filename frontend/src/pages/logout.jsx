// frontend/src/pages/Logout.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Logout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // call the context logout, then redirect
    ;(async () => {
      await logout()
      navigate('/auth/login')  
    })()
  }, [logout, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <p className="text-lg text-gray-700">Logging you out…</p>
    </div>
  )
}
