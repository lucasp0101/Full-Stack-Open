/*
  Router for /api/blogs
*/

const { Blog } = require('../models/blog');

const blogRouter = require('express').Router();

// TODO: error control

// Get blog posts from the db 
blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs);
    });
});

// Add a blog post to the db
blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);
  blog
    .save()
    .then(result => {
      response.status(201).json(result);
    });
});

module.exports = blogRouter;