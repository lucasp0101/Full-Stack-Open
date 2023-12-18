const mongoose = require('mongoose')
const supertest = require('supertest')
const { app } = require('../app')

const api = supertest(app)

const { Blog } = require('../models/blog')


const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 10
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'John Doe',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 5
  },
  {
    title: 'React is easy',
    author: 'Peter Rept',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 15
  }
]

let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  let BlogObject = new Blog(initialBlogs[0])
  await BlogObject.save()
  BlogObject = new Blog(initialBlogs[1])
  await BlogObject.save()
  BlogObject = new Blog(initialBlogs[2])
  await BlogObject.save()
})

beforeAll(async () => {

  const reponseRegisterQuery = await api.post('/api/users').send({
    username: 'root',
    password: 'test',
    name: 'root'
  })

  const responseLoginQuery = await api.post('/api/login').send({
    username: 'root',
    password: 'test'
  })

  token = responseLoginQuery.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Browser can execute only Javascript'
  )
})

test('blog posts have id property', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})


test('creating a new blog post', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'your-username',
    url: 'http://example.com',
    likes: 0
  }
  await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('New Blog Post')
})

test('missing likes property defaults to 0', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Jane Smith',
    url: 'http://example.com'
  }

  await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blog = response.body.find(blog => blog.title === 'New Blog Post')

  expect(blog.likes).toBe(0)
})

test('missing title property returns 400 Bad Request', async () => {
  const newBlog = {
    author: 'Jane Smith',
    url: 'http://example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('missing url property returns 400 Bad Request', async () => {
  const newBlog = {
    title: 'New Blog Post',
    author: 'Jane Smith',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .set('authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('deleting a blog post', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]

  await api
    .delete(`/api/blogs/${blog.id}`)
    .set('authorization', `Bearer ${token}`)
    .send({ id: blog.id })
    .expect(204)

  const newResponse = await api.get('/api/blogs')
  expect(newResponse.body.length).toBe(initialBlogs.length - 1)
})

test('updating a blog post', async () => {
  const response = await api.get('/api/blogs')
  const blogToUpdate = response.body[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('authorization', `Bearer ${token}`)
    .send(updatedBlog)
    .expect(200)

  const newResponse = await api.get('/api/blogs')
  const updatedBlogInDb = newResponse.body.find(blog => blog.id === blogToUpdate.id)

  expect(updatedBlogInDb.likes).toBe(blogToUpdate.likes + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})