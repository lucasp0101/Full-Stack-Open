import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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

      window.localStorage.setItem('loggedUser', JSON.stringify(user)) 

      console.log("Logged in succesfully")
    } 
    catch (exception) {
      console.log('Wrong credentials')
    }

    console.log("Logging in with: ", username, " ", password)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)

    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
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
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}

export default App