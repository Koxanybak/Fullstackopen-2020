const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("express-async-errors")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const config = require("./utils/config")
const logger = require("./utils/logger")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
app = express()

const url = config.MONGODB_URI
logger.info("connecting to", url)
mongoose.connect(url, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    logger.info("connected to MongoDB")
  })
  .catch(error => {
    logger.error(error.message)
  })

app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== "test") {
  app.use(middleware.requestLogger)
}
app.use(middleware.tokenExtractor)
app.use("/api/login", loginRouter)
app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

if (process.env.NODE_ENV === "test") {
  const resetRouter = require("./controllers/testing")
  app.use("/api/testing", resetRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app