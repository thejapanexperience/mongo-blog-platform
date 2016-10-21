const mongoose = require('mongoose')

// can set validation in the schema.
const boardSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  createdAt: { type: Date, default:Date.now },
  image: { type: String },
  messages: {type: []}

})

const Burger = mongoose.model('Burger', boardSchema)

module.exports = Burger;

// comes prebuilt with all the cool methods

// METHODS

// find
// findOne
// findById
// FindOneAndUpdate
// FindOneAndRemove
// FindByIdAndRemove

// etc
