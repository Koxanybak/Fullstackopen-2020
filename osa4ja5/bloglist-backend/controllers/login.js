const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

loginRouter.post("/", async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
  const match = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!match) {
    console.log("ei ollu samat")
    return response.status(401).json({ error: "invalid password or username" })
  }

  const userForToken = {
    username: body.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter