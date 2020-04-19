import React, { useState, useEffect } from 'react'

import Blogs, { ExtendedBlog } from './components/Blogs'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import Menu from "./components/Menu"
import Users, { ExtendedUser } from "./components/Users"

import userService from "./services/users"

import { useDispatch, useSelector } from "react-redux"
import { passLogin, createLogout, } from "./reducers/loginReducer"
import { initializeBlogs, } from "./reducers/blogReducer"

import { Route, Switch, useRouteMatch } from "react-router-dom"

const App = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(users => {
        setUsers(users)
      })
  }, [])

  const blogFormRef = React.createRef()

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const notification = useSelector(state => {
    return state.notification
  })

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(passLogin())
  }, [dispatch])

  const logout = () => {
    dispatch(createLogout())
  }
  const toggleBlogForm = () => {
    blogFormRef.current.changeVisible()
  }

  let match = useRouteMatch("/users/:id")
  const userToShow = match
    ? users.find(u => u.id === match.params.id)
    : null

  match = useRouteMatch("/blogs/:id")
  const blogToShow = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={notification} />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <div>
        <Menu />
        {`${user.name} logged in`}<button onClick={logout} >logout</button>
      </div>
      <Notification message={notification} />
      <Switch>
        <Route path="/blogs/:id">
          <ExtendedBlog blog={blogToShow} user={user} />
        </Route>

        <Route path="/blogs">
          <h2>Blogs</h2>
          <Blogs blogs={blogs} />

          <h3>Create new</h3>
          <Togglable showButtonLabel="Create a new blog" hideButtonLabel="cancel" ref={blogFormRef}>
            <BlogForm toggle={toggleBlogForm} />
          </Togglable>
        </Route>

        <Route path="/users/:id">
          <ExtendedUser user={userToShow} />
        </Route>

        <Route path="/users">
          <h2>Users</h2>
          <Users users={users} />
        </Route>
      </Switch>
    </div>
  )
}

const Notification = ({ message }) => {
  return message !== null ? (
    <div className="error" >
      {message}
    </div>
  ) : null
}

export default App