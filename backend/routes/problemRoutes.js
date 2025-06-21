const express = require('express')
const router  = express.Router()
const Problem = require('../models/Problem')

// 1) List all problems (summary)
router.get('/', async (req, res) => {
  const list = await Problem.find()
    .select('title difficulty createdAt')
    .sort('-createdAt')
    .lean()
  res.json(list)
})

// 2) Get full problem by ID (with testCases & constraints)
router.get('/:id', async (req, res) => {
  try {
    const prob = await Problem.findById(req.params.id)
      .populate('createdBy','firstName lastName')
      .lean()
    if (!prob) return res.status(404).json({ message:'Not found' })
    res.json(prob)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// 3) Create a new problem
router.post('/', async (req, res) => {
  const { title, description, constraints, difficulty, testCases } = req.body
  try {
    const problem = new Problem({
      title,
      description,
      constraints,
      difficulty,
      testCases,       // array of { input, output, explanation }
      createdBy: req.userId
    })
    await problem.save()
    res.status(201).json(problem)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
