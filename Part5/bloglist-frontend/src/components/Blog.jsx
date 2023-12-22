import { useState } from "react"

const Blog = ({ blog }) => {
  const styleSection = {
    'border': '2px solid',
    'display': 'flex',
    'justify-content': 'center',
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
          {blog.likes} <button>Like</button><br/>
          {blog.url} <br/>
        </div>
      </div>
    )
  }

  return (
    <div style={styleSection}>
      {blog.title} <button onClick={toggleDetail}>Show</button><br/>
    </div>
  )
}

export default Blog