const mongoose = require("mongoose")

mongoose.set("useFindAndModify", false)

const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
})
BlogSchema.set("toJSON", {
  transform: (document, returnedBlog) => {
    returnedBlog.id = returnedBlog._id.toString()
    delete returnedBlog._id
    delete returnedBlog.__v
  }
})

module.exports = mongoose.model("Blog", BlogSchema)