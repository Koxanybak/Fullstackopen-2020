const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
  {
    title: "mimmonen",
    author: "leevi",
    url: "url1",
    likes: 3,
  },
  {
    title: "tämmönen",
    author: "leevi",
    url: "url2",
    likes: 5,
  },
  {
    title: "tommonen",
    author: "mikael",
    url: "url3",
    likes: 1,
  },
  {
    title: "millanen",
    author: "leevi",
    url: "url4",
    likes: 11,
  },
  {
    title: "villanen",
    author: "harri",
    url: "url5",
    likes: 0,
  },
  {
    title: "tällänen",
    author: "mikael",
    url: "url6",
    likes: 11,
  },
  {
    title: "tollanen",
    author: "mikael",
    url: "url7",
    likes: 9,
  },
  {
    title: "sellanen",
    author: "harri",
    url: "url8",
    likes: 7,
  },
  {
    title: "sillanen",
    author: "leevi",
    url: "url9",
    likes: 3,
  },
]

const initialUsers = [
  {
    username: "leevi",
    name: "Leevi Heikkilä",
    password: "salainen",
    blogs: [],
  },
  {
    username: "harri",
    name: "Harri Rekola",
    password: "ssalainen",
    blogs: [],
  },
  {
    username: "mikael",
    name: "Mikael Järvinen",
    password: "sssalainen",
    blogs: [],
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb,
}