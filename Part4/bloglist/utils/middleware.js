const { info, _error } = require('./logger')

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:', request.path)
  info('Body:', request.body)
  info('authorization:', request.token)
  info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  _error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    // Assume the only possible duplicate key error is for username
    return response.status(400).send({ error: 'Username must be unique' })
  }

  console.error(error)

  next(error)
}



const getTokenFrom = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    // Return the token without the 'bearer ' prefix
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }

  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  getTokenFrom
}
