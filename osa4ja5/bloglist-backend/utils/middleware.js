const morgan = require("morgan")
const logger = require("./logger")

morgan.token("json-data", (request, response) => {
  return JSON.stringify(request.body)
})

const requestLogger = morgan(":method :url :status :res[content-length] - :response-time ms :json-data")

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
  
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    console.log("olipa paska tokeni")
    return response.status(401).json({ error: "invalid token" })
  }

  logger.error(error.message)

  next(error)
}

module.exports = {
  unknownEndpoint, errorHandler, requestLogger, tokenExtractor,
}