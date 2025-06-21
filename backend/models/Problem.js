// backend/models/Problem.js
const mongoose = require('mongoose')

const testCaseSchema = new mongoose.Schema({
  input:       { type: String, required: true },
  output:      { type: String, required: true },
  explanation: { type: String }
}, { _id: false })

const problemSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  constraints: { type: String, required: true },
  difficulty:  { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
  testCases:   [testCaseSchema],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  createdAt:   { type: Date, default: Date.now },
})

module.exports = mongoose.model('Problem', problemSchema)
