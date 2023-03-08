import { useState } from "react"

const Blog = ({blog,handeLike,handleDelete,user}) => {

  const [viewWholeBlog,toggleWhole] = useState(false) 
  const label = viewWholeBlog? 'hide':'view'
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      
      <h2>{blog.title}</h2>  <button onClick={()=>toggleWhole(!viewWholeBlog)}>{label}</button>
      <br></br>
    
     

      <div style={{display:viewWholeBlog?'':'none'}}>

       <strong>url:</strong>{blog.url}
        <br></br>
        <strong>likes:</strong>{blog.likes}   <button onClick={handeLike}>like</button>
        <br></br>
        <strong>author:</strong> {blog.author}
        <br></br>

       {user.name === blog.author && <button onClick={handleDelete}>remove</button> }
      </div>
      <br></br>

    </div>
  )
}

export default Blog