import { useState } from "react"

const Blog = ({blog,handeLike,handleDelete,user}) => {

  const [viewWholeBlog,toggleWhole] = useState(false) 

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    
    <div style={blogStyle} className = "default-view">
      
      <h2>{blog.title}</h2>  
      <button onClick={()=>toggleWhole(!viewWholeBlog)}>view</button>
      <br></br>
      <strong>author:</strong> {blog.author}
        <br></br>
    
     

      {viewWholeBlog && <div  className = "toggle-view">

       <strong>url:</strong>{blog.url}
        <br></br>
        <strong>likes:</strong>{blog.likes}   <button onClick={handeLike}>like</button>
        <br></br>
        </div>
}

       {user.name === blog.author && <button onClick={handleDelete}>remove</button> }
  

      
      </div>
  
  )
}

export default Blog