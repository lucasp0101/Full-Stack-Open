/*
  Router for /api/blogs
*/

const { Blog } = require('../models/blog')

const blogRouter = require('express').Router()

// Get all blog posts
blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

// Create a new blog post
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
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
