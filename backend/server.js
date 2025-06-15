// server.js
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const { DBconnection } = require('./database/db.js')
const Users = require('./models/User.js')

const jwt_secret = process.env.JWT_SECRET
DBconnection()

const app = express()

// Parse JSON bodies
app.use(express.json())
// Parse cookies from the request headers
app.use(cookieParser())
// Enable CORS for our Vite front-end and allow cookies
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// Authentication middleware
// Skip auth for /login and /register
app.use((req, res, next) => {
  if (req.path === '/login' || req.path === '/register') {
    return next()
  }

  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' })
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
    // You could attach decoded user info to req.user here
    next()
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Registration endpoint
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existingUser = await Users.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new Users({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
    await newUser.save()

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { email: user.email, firstName: user.firstName, lastName: user.lastName },
      jwt_secret,
      { expiresIn: '24h' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res.json({ message: 'Login successful' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax'
  })
  return res.json({ message: 'Logout successful' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
