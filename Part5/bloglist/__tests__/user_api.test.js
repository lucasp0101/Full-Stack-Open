const bcrypt = require('bcrypt')
const supertest = require('supertest')
const helper = require('./test_helper')
const { app } = require('../app')

const api = supertest(app)

const { User } = require('../models/user')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

    expect(response.body.username).toBe(newUser.username)
    expect(response.body.name).toBe(newUser.name)
  })

  test('creation fails with invalid password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'sa', // Invalid password (less than 3 characters)
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(response.body.error).toBe('Password must be at least 3 characters long')
  })

  test('creation fails with invalid username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'a', // Invalid username (less than 3 characters)
      name: 'Test User',
      password: 'password',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).not.toContain(newUser.username)

    expect(response.body.error).toBe('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).')
  })

  
  test('creation fails with duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root', // Duplicate username
      name: 'Test User',
      password: 'password',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    expect(response.body.error).toBe('Username must be unique')
  })
})