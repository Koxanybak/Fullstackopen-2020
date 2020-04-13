import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from "./components/LoginForm"
import blogService from './services/blogs'
import loginService from "./services/login"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = React.createRef()
  const loginFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem("loggedBloglistUser")
    if (user) {
      const jsonUser = JSON.parse(user)
      setUser(jsonUser)
      blogService.setToken(jsonUser.token)
    }
  }, [])

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const logout = () => {
    window.localStorage.removeItem("loggedBloglistUser")
    setUser(null)
    blogService.setToken(null)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
      blogService.setToken(user.token)
      loginFormRef.current.changeVisible()
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage("wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async ({ title, author, url, }) => {
    try {
      const blog = await blogService.create({ title, author, url })

      blogFormRef.current.changeVisible()
      setErrorMessage(`a new blog ${blog.title} by ${blog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setBlogs(blogs.concat(blog))
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async blog => {
    try {
      const newBlog = {
        ...blog,
        user: blog.user.id
      }
      const updatedBlog = await blogService.update(newBlog)

      setBlogs(blogs.filter(b => b.id !== blog.id).concat(updatedBlog))
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async blog => {
    try {
      await blogService.deleteBlog(blog)

      setBlogs(blogs.filter(b => b.id !== blog.id))
    } catch (exception) {
      setErrorMessage(exception.message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification errorMessage={errorMessage} />
        <Togglable showButtonLabel="Log in" hideButtonLabel="cancel" ref={loginFormRef}>
          <LoginForm 
            username={username}
            password={password}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleLogin={handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification errorMessage={errorMessage} />
      <div>
        {`${user.name} logged in`}<button onClick={logout} >logout</button>
      </div>
      <Blogs blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
      <h3>Create new</h3>
      <Togglable showButtonLabel="Create a new blog" hideButtonLabel="cancel" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    </div>
  )
}

const Notification = ({ errorMessage }) => {
  return errorMessage !== null ? (
    <div className="error" >
      {errorMessage}
    </div>
  ) : null
}

export default App