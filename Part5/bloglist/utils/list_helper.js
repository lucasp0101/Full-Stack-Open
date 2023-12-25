const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const mostBlogs = (blogs) => {
  let authors = lodash.groupBy(blogs, 'author')

  let authorWithMostBlogs = lodash.maxBy(Object.keys(authors), (author) => authors[author].length)

  return lodash.countBy(authors[authorWithMostBlogs], 'author')
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs
}
