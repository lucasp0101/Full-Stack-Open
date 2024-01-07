import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let TOKEN = null

// TODO: refactor this to work with async instead of then
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const newBlog = (newBlog) => {
  const request = axios.post(
    baseUrl, 
    JSON.stringify(newBlog),
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`}
    })

  return request.then(response => response.data)
}

const updateBlog = async (newBlog) => {
  console.log(newBlog);
  const request = axios.put(
    baseUrl.concat(`/${newBlog.id}`),
    JSON.stringify(newBlog),
    {
      headers :{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      }
    }
  )

  return request.then(response => response.data)
}

const setToken = (token) => {
  TOKEN = token
}

export default { getAll, newBlog, setToken, updateBlog }