import { useState } from "react"

const BlogForm = ({handlePost})=>
{
  const [blog,setBlog] = useState(
    {
    title : '',
    author: '',
    url: '',
    likes: 0
    } 
  )

  const addBlog = (event) =>{
    event.preventDefault()
    handlePost(blog)
    setBlog({
        title : '',
        author: '',
        url: '',
        likes: 0
    })
  }
      return (
        <>    
        <h3>Create Blog</h3>

      <form onSubmit={addBlog}>
      Title: <input type='text' value = {blog.title} id = 'title' placeholder = 'title' onChange={(e) => setBlog({ ...blog, title: e.target.value })}/>
      <br></br>
  
     Url: <input type='text' value = {blog.url} id = 'url' placeholder = 'url' onChange={(e) => setBlog({ ...blog, url: e.target.value })}/>
      <br></br>

     Likes: <input type='text' value = {blog.likes} id = 'likes' placeholder = 'likes' onChange={(e) => setBlog({ ...blog, likes: e.target.value })}/>
    <br></br>

    <button type='submit'>Submit</button>
      </form>
        </>
      )

}
export default BlogForm