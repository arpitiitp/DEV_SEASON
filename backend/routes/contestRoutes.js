// backend/routes/contestRoutes.js
const express = require('express')
const router  = express.Router()
const Contest = require('../models/Contest')

// GET /contests → list all contests
router.get('/', async (req, res) => {
  try {
    const contests = await Contest.find()
      .select('name start end')
      .sort('-start')
      .lean()
    res.json(contests)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error fetching contests' })
  }
})

// POST /contests → create a new contest (protected)
router.post('/', async (req, res) => {
  const { name, start, end } = req.body
  try {
    if (!name || !start || !end) {
      return res.status(400).json({ message: 'Name, start and end dates are required' })
    }
    const contest = new Contest({
      name,
      start: new Date(start),
      end:   new Date(end),
      createdBy: req.userId
    })
    await contest.save()
    res.status(201).json(contest)
  } catch (err) {
    console.error(err)
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
