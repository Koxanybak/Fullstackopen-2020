const mongoose = require('mongoose')
const uv = require("mongoose-unique-validator")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})

schema.plugin(uv)

module.exports = mongoose.model('Author', schema)