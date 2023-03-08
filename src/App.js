import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginServices from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState('')
  const [message,setMessage] = useState('')

  
  
  const Notification=({message})=>
  {
    if(message===''){return null}

    if(message.includes('Wrong')|| message.includes('ERROR')){
    return (
      <div className='error'>
        {message}
      </div>
    )
    }
    else{
      return (
        <div className='add'>
          {message}
        </div>
      )
    }
  }
  const blogFormref = useRef()
  
  const handleLogin = async event =>{

    event.preventDefault()

    try{
    const user = await loginServices.login({username,password})
    window.localStorage.setItem(
      'loggedUser',JSON.stringify(user)
    )
    setUser(user)
    blogService.setToken(user.token)
    setUsername('')
    setPassword('')
    }
    catch(exception)
    {
      setMessage('Wrong username/password!')
      setUsername('')
      setPassword('')
      setInterval(() => {
        setMessage('')
      }, 3000);
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser('')
    
  }

  const handlePost = (blogObject) =>{
    blogFormref.current.toggleVisibility()

    blogService.post(blogObject)
    .then(newBlog=>{
      setBlogs(blogs.concat(newBlog))
      setMessage('new blog added')
      setInterval(() => {
        setMessage('')
      }, 3000);
    })
  }
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }
  
 const likeThis = async (blog) =>
 {
    const updatedLikes = {...blog,likes:blog.likes+1}
    console.log('old blog',updatedLikes)
    const updatedBlog = await blogService.update(updatedLikes)
    setBlogs(blogs.map(blog=>
      blog.id === updatedBlog.id?
      updatedBlog : blog).sort((a,b)=>b.likes-a.likes))
   
 }

 const deleteThis =  (blogtoDelete) => {
    if(window.confirm(`Delete ${blogtoDelete.title}?`)){
      blogService.remove(blogtoDelete)
      .then(()=>{setBlogs(blogs.filter(blog=>blog.id !== blogtoDelete.id))
        setMessage(`DELETED ${blogtoDelete.title} successfully`)
        setInterval(() => {
          setMessage('')
        }, 3000);
      })
      .catch(exception=>{
        setMessage('ERROR deleting blog')
      })
      
  
    }
 }
  
  const blogForm = () => (
    
     <Togglable label = 'new blog' ref ={blogFormref}>
      <BlogForm handlePost={handlePost}/>
     </Togglable>
  )

  const loginForm = () => (
    <Togglable label ='login'>
      <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={handleUsernameChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
    </Togglable>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b)=>b.likes - a.likes) )

    )  
  }, [])

  useEffect(() => {
    const loggedinUser =  window.localStorage.getItem('loggedUser')
    if(loggedinUser)
    {
      const user = JSON.parse(loggedinUser)
     setUser(user)
     blogService.setToken(user.token)
   
    }
 }, [])

 return (
  <div>
    <h1>Blogs</h1>
    <Notification message={message} />
    {user === '' ? 
        loginForm()
       : (
        <div>
        Logged in as user {user.name} <button onClick={handleLogout}>Logout</button>
         {blogForm()}
          {blogs.map(blog => (
          
            <Blog key={blog.id} blog={blog} handeLike ={()=>likeThis(blog)} handleDelete = {()=>deleteThis(blog)} user = {user} />
           
          
          ))}
      
       </div>
   
    )}
  </div>
)  
}

export default App