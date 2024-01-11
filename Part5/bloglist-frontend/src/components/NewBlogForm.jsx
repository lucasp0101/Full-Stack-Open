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
      <input
        type="text"
        name='Title'
        placeholder='Enter the title'
        value={newTitle}
        onChange={( { target } ) => setNewTitle(target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        name='Author'
        placeholder='Enter the author'
        value={newAuthor}
        onChange={( { target } ) => setNewAuthor(target.value)}
      />
    </div>
    <div>
      <input
        type="text"
        name='URL'
        placeholder='Enter the URL'
        value={newURL}
        onChange={ ( { target } ) => setNewURL(target.value)}
      />
    </div>
    <button type='submit'>Create new blog</button>
  </form>
}

export default NewBlogForm