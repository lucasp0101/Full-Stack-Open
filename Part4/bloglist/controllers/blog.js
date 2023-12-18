const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const logger = require('../utils/logger')

const { Blog } = require('../models/blog')
const { User } = require('../models/user')

const blogRouter = require('express').Router()

// Get all blog posts
blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

// Create a new blog post
blogRouter.post('/', async (request, response, next) => {
  logger.info(request)
  
  const decodedToken = jwt.verify(request.token, config.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'Token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...request.body,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// Delete a blog post
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// Update a blog post
blogRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter
