const NewBlogForm = ({ handleSubmit, setNewTitle, setNewAuthor, setNewURL }) => {
  return <
      form onSubmit={handleSubmit}>
        <div>
          title 
          <input 
            type="text" 
            name='Title'
            onChange={( { target } ) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author 
          <input 
            type="text" 
            name='Author' 
            onChange={( { target } ) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url 
          <input 
            type="text"
            name='URL'
            onChange={ ( { target } ) => setNewURL(target.value)}
          />
        </div>
        <button type='submit'>Create new blog</button>
      </form>
}

export default NewBlogForm