import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let TOKEN = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (token) => {
  TOKEN = token
}

export default { getAll, setToken }