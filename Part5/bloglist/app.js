const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

// Connect to MongoDB
logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger._error('error connecting to MongoDB:', error.message)
  })

// Middleware
app.use(middleware.getTokenFrom)
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

exports.app = app
