const mongoose = require('mongoose')
const uv = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  favoriteGenre: {
    type: String,
    required: true,
  }
})

schema.plugin(uv)

module.exports = mongoose.model('User', schema)