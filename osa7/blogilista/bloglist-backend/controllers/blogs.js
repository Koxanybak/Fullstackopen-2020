const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "invalid or missing token" })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...request.body,
    user: user.id,
  })
  if (!blog.likes) {
    blog.likes = 0
  }

  let savedBlog = await blog.save()
  savedBlog = await Blog.findById(savedBlog._id).populate("user", { username: 1, name: 1 })
  console.log(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.post("/:id/comments", async (request, response) => {
  let oldBlog = await Blog.findById(request.params.id)
  oldBlog = oldBlog._doc
  const newBlog = { ...oldBlog, comments: oldBlog.comments.concat(request.body.comment)}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate("user", { username: 1, name: 1 })
  response.status(200).json(updatedBlog.toJSON())
})

blogsRouter.delete("/:id", async (request, response) => {
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "invalid or missing token" })
  }
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)

  if (!(user.blogs.map(b => b.toString()).includes(blog._id.toString()) || blog.user.toString() === user._id.toString())) {
    return response.status(401).json({ error: "invalid or missing token" })
  }

  await blog.delete()
  user.blogs.map(b => b.toString()).filter(b => b !== blog._id.toString())
  response.status(204).end()
})

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true }).populate("user", { username: 1, name: 1 })
  response.status(200).json(updatedBlog.toJSON())
})

module.exports = blogsRouter