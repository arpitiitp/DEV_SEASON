// backend/models/Progress.js
const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
  user:     { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  problem:  { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  verdict:  { type: String, enum: ['Accepted','Wrong Answer','Skipped'], required: true },
  comment:  { type: String },
  solvedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Progress', progressSchema)
