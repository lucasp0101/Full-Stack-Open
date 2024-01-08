import { forwardRef, useState } from 'react'

const NewBlogForm = ({ createNewBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()

    const newBlog = { title: newTitle, author: newAuthor, url: newURL }
    createNewBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewURL('')
  }

  return <
    form onSubmit={addNewBlog}>
    <div>
          title
      <input
        type="text"
        name='Title'
        value={newTitle}
        onChange={( { target } ) => setNewTitle(target.value)}
      />
    </div>
    <div>
          author
      <input
        type="text"
        name='Author'
        value={newAuthor}
        onChange={( { target } ) => setNewAuthor(target.value)}
      />
    </div>
    <div>
          url
      <input
        type="text"
        name='URL'
        value={newURL}
        onChange={ ( { target } ) => setNewURL(target.value)}
      />
    </div>
    <button type='submit'>Create new blog</button>
  </form>
}

export default NewBlogForm