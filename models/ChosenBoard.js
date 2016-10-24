const mongoose = require('mongoose')

// can set validation in the schema.
const boardSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  createdAt: { type: Date },
  image: { type: String },
  messages: {type: []}
})

const ChosenBoard = mongoose.model('ChosenBoard', boardSchema)

module.exports = ChosenBoard;

// comes prebuilt with all the cool methods

// METHODS

// find
// findOne
// findById
// FindOneAndUpdate
// FindOneAndRemove
// FindByIdAndRemove

// etc
