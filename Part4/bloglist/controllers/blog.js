/*
  Router for /api/blogs
*/

const { Blog } = require('../models/blog')

const blogRouter = require('express').Router()

// TODO: error control

// Get blog posts from the db
blogRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

// Add a blog post to the db
blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

module.exports = blogRouter
