const app = require("../app")
const supertest = require("supertest")
const mongoose = require("mongoose")
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("../utils/test_helper")
const jwt = require("jsonwebtoken")
const api = supertest(app)

describe("note api", () => {

  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers.map(user => new User(user)))
    
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs.map(blog => new Blog(blog)))
  })

  describe("correct form", () => {
    test("getAll returns the correct amount of JSON-blogs", async () => {
      const blogs = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)

      expect(blogs.body).toHaveLength(helper.initialBlogs.length)
    })

    test("blog has field id instead of _id", async () => {
      const blogs = await api.get("/api/blogs")

      blogs.body.forEach(blog => {
        expect(blog._id).not.toBeDefined()
        expect(blog.id).toBeDefined()
      })
    })
  })

  describe("blog addition", () => {
    test("a valid blog can be added", async () => {
      const toBeAdded = {
        title: "addedTitle",
        author: "addedAuthor",
        url: "addedUrl",
        likes: 4
      }

      const users = await helper.usersInDb()
      const user = users[0]
      const userForToken = ({
        username: user.username,
        id: user.id,
      })
      const token = jwt.sign(userForToken, process.env.SECRET)

      await api
        .post("/api/blogs")
        .send(toBeAdded)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogsAtEnd.map(blog => blog.title)).toContain(toBeAdded.title)
    })

    test("an invalid blog can't be added", async () => {
      const toBeAdded1 = {
        title: "addedTitle"
      }
      const toBeAdded2 = {
        url: "addedUrl"
      }

      const users = await helper.usersInDb()
      const user = users[0]
      const userForToken = ({
        username: user.username,
        id: user.id,
      })
      const token = jwt.sign(userForToken, process.env.SECRET)

      await api
        .post("/api/blogs")
        .send(toBeAdded1)
        .set({ Authorization: `Bearer ${token}` })
        .expect(400)
      await api
        .post("/api/blogs")
        .send(toBeAdded2)
        .set({ Authorization: `Bearer ${token}` })
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test("likes is 0 if it hasn't been given a value", async () => {
      const toBeAdded = {
        title: "addedTitle",
        author: "addedAuthor",
        url: "addedUrl",
      }

      const users = await helper.usersInDb()
      const user = users[0]
      const userForToken = ({
        username: user.username,
        id: user.id,
      })
      const token = jwt.sign(userForToken, process.env.SECRET)

      await api
        .post("/api/blogs")
        .send(toBeAdded)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.map(blog => {
        return ({
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
        })
      })).toContainEqual({
        title: "addedTitle",
        author: "addedAuthor",
        url: "addedUrl",
        likes: 0,
      })
    })
  })
  describe("blog deleting and updating", () => {
    test("an existing blog can be deleted with a valid token", async () => {
      const toBeAdded = ({
        title: "addedTitle",
        author: "addedAuthor",
        url: "addedUrl",
      })

      const users = await helper.usersInDb()
      const user = users[0]
      const userForToken = ({
        username: user.username,
        id: user.id,
      })
      const token = jwt.sign(userForToken, process.env.SECRET)

      const toBeDeleted = await api
        .post("/api/blogs")
        .send(toBeAdded)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)

      await api
        .delete(`/api/blogs/${toBeDeleted.body.id}`)
        .set({ Authorization: `Bearer ${token}` })
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      expect(blogsAtEnd).not.toContainEqual(toBeDeleted)
    })

    test("an existing blog can't be deleted without a token", async () => {
      const toBeAdded = ({
        title: "addedTitle",
        author: "addedAuthor",
        url: "addedUrl",
      })

      const users = await helper.usersInDb()
      const user = users[0]
      const userForToken = ({
        username: user.username,
        id: user.id,
      })
      const token = jwt.sign(userForToken, process.env.SECRET)

      const toBeDeleted = await api
        .post("/api/blogs")
        .send(toBeAdded)
        .set({ Authorization: `Bearer ${token}` })
        .expect(201)

      await api
        .delete(`/api/blogs/${toBeDeleted.body.id}`)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
      expect(blogsAtEnd.map(b => b.title)).toContainEqual(toBeDeleted.body.title)
    })

    test("an existing blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb()
      const toBeUpdated = blogsAtStart[0]

      await api
        .put(`/api/blogs/${toBeUpdated.id}`)
        .send({
          title: toBeUpdated.title,
          author: toBeUpdated.author,
          url: toBeUpdated.url,
          likes: toBeUpdated.likes + 10,
        })
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtStart).not.toContainEqual({...toBeUpdated, likes: toBeUpdated.likes + 10 })
      expect(blogsAtEnd).toContainEqual({...toBeUpdated, likes: toBeUpdated.likes + 10 })
    })
  })
})

describe("user api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs.map(blog => new Blog(blog)))
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers.map(user => new User(user)))
  })

  describe("user creation", () => {
    test("succeeds with a valid user", async () => {
      const toBeAdded = {
        username: "hellas",
        name: "Arto Hellas",
        password: "salainen"
      }

      await api
        .post("/api/users")
        .send(toBeAdded)
        .expect(201)
        .expect("Content-Type", /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
      expect(usersAtEnd.map(u => u.username)).toContainEqual("hellas")
    })

    test("doesn't succeed with an invalid user", async () => {
      const usersAtStart = await helper.usersInDb()
      
      const toBeAdded1 = {
        username: usersAtStart[0].username,
        name: "Arto Hellas",
        password: "salainen"
      }
      const toBeAdded2 = {
        name: "Arto Hellas",
        password: "salainen"
      }
      const toBeAdded3 = {
        username: "hellas",
        name: "Arto Hellas",
        password: "sa"
      }
      const toBeAdded4 = {
        username: "le",
        name: "Arto Hellas",
        password: "salainen"
      }

      const result1 = await api
        .post("/api/users")
        .send(toBeAdded1)
        .expect(400)
      const result2 = await api
        .post("/api/users")
        .send(toBeAdded2)
        .expect(400)
      const result3 = await api
        .post("/api/users")
        .send(toBeAdded3)
        .expect(400)
      const result4 = await api
        .post("/api/users")
        .send(toBeAdded4)
        .expect(400)

      expect(result1.body.error).toContain("unique")
      expect(result2.body.error).toContain("required")
      expect(result3.body.error).toContain("short")
      expect(result4.body.error).toContain("length")
      const usersAtEnd = await helper.usersInDb()

      expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
      expect(usersAtEnd.map(u => u.username)).not.toContainEqual("hellas")
      expect(usersAtEnd.map(u => u.username)).not.toContainEqual("le")
      expect(usersAtEnd.map(u => u.username)).not.toContainEqual("usersAtStart[0]")
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})