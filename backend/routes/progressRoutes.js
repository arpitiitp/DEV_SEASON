// backend/routes/progressRoutes.js
const express   = require('express')
const router    = express.Router()
const Progress  = require('../models/Progress')

// GET /progress  → all progress for logged-in user
router.get('/', async (req, res) => {
  const list = await Progress.find({ user: req.userId })
    .populate('problem','title difficulty')
    .sort('-solvedAt')
    .lean()
  res.json(list)
})

// POST /progress → submit verdict on a problem
router.post('/', async (req, res) => {
  const { problemId, verdict, comment } = req.body
  try {
    const entry = new Progress({
      user: req.userId,
      problem: problemId,
      verdict,
      comment
    })
    await entry.save()
    res.status(201).json(entry)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
