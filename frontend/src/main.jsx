// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '../context/AuthContext'
import App from './App'
import axios from 'axios'
import './index.css'

// tell Axios to always send cookies on cross-site requests
axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
