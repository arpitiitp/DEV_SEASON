// backend/models/Contest.js
const mongoose = require('mongoose')

const contestSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  start:     { type: Date,   required: true },
  end:       { type: Date,   required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  createdAt: { type: Date,   default: Date.now },
})

module.exports = mongoose.model('Contest', contestSchema)
