import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const styleSection = {
    'border': '2px solid',
    'justifyContent': 'center',
    'width': 'fit-content',
    'margin': '12px'
  }
  const styleContent = {
    'flex': 'none',
  }
  const [detail, setDetail] = useState(false)

  const toggleDetail = () => {
    setDetail(!detail)
  }

  if (detail){
    return (
      <div style={styleSection}>
        <div style={styleContent}>
          {blog.title} <button onClick={toggleDetail}>Hide</button><br/>
          {blog.author} <br/>
          {blog.likes} <button onClick={
            () => handleLike({...blog})
            }>Like</button><br/>
          {blog.url} 
          <br/>
          {/*Only show the delete button if the current user is the creator of the blog*/}
          {blog.user === currentUser ? <button onClick={() => handleDelete(blog)}>Delete post</button> : <></>}
        </div>
      </div>
    )
  }

  return (
    <div style={styleSection}>
      {blog.title} <button onClick={toggleDetail}>Show</button>
      <br/>
      {/*Only show the delete button if the current user is the creator of the blog*/}
      {blog.author === currentUser ? <button onClick={() => handleDelete(blog)}>Delete post</button> : <></>}
    </div>
  )
}

export default Blog