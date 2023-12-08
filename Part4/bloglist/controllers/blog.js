/*
  Router for /api/blogs
*/

const { Blog } = require('../models/blog')

const blogRouter = require('express').Router()

// Get blog posts from the db
blogRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

// Add a blog post to the db
blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter
