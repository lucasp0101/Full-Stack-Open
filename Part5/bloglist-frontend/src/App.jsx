import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const [notification, setNotification] = useState("null")

  // Load all the blogs from the backend on the first render
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Get the saved user from local storage if there is one
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser') 
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      setUser(user)
      setUsername('')
      setPassword('')
      blogService.setToken(user.token)

      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 

      console.log("Logged in succesfully")
    } 
    catch (exception) {
      console.log('Wrong credentials')
    }

    console.log("Logging in with: ", username, " ", password)
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)

    window.localStorage.removeItem('loggedUser')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    const newBlog = {title: newTitle, author: newAuthor, url: newURL}

    try {
      const result = await blogService.newBlog(newBlog)
      console.log(result)
      setBlogs(blogs.concat(result))
      setNotification(`New blog: ${result.title} created.`)

      setNewTitle('')
      setNewAuthor('')
      setNewURL('')
      
      setTimeout(
        () => setNotification(null),
        2000)
    
    }catch (exception) {
      console.log(exception)
      setNotification(`Error when creating the new blog: ${exception}`)
      setTimeout(
        () => setNotification(null),
        2000)
    }
  }

  return (
    <div>
      {notification === null ? <></> : <Notification message = {notification}/>}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <br />
      <div>
        {user === null ? 
          <LoginForm handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword}/> : 
          <div>
            <p>{user.name} logged in</p>
            <NewBlogForm handleSubmit={handleNewBlog} setNewTitle={setNewTitle} setNewAuthor={setNewAuthor} setNewURL={setNewURL}/>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default App