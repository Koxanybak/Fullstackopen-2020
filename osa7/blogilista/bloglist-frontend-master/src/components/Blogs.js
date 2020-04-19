import React, { useState } from 'react'
//import Togglable from "./Togglable"
import { Link, useHistory } from "react-router-dom"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { createLike, createRemove, createComment } from "../reducers/blogReducer"

const Blogs = ({ blogs }) => (
  <div className="blogs">
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => 
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  )
  /*
  const removeStyle = {
    backgroundColor: "#ff5252"
  }

  const like = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    
    updateBlog(newBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog)
    }
  }
  
  return (
    <div className="blog" style={blogStyle}>
      <Togglable showButtonLabel="view" hideButtonLabel="hide" hideAtTop={true} alwaysShown={
        [
          `${blog.title} `,
          `${blog.author} `,
        ]
      }>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes} <button className="like" onClick={like}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username ? 
          <button className="remove" style={removeStyle} onClick={remove}>remove</button>
          : null
        }
      </Togglable>
    </div>
  )
  */
}

export const ExtendedBlog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [newComment, setNewComment] = useState("")

  const removeStyle = {
    backgroundColor: "#ff5252"
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      dispatch(createRemove(blog))
    }
    history.push("/blogs")
  }

  const like = () => {
    const newBlog = {
      ...blog,
      user: blog.user.id
    }
    dispatch(createLike(newBlog))
  }

  const handleComment = e => {
    e.preventDefault()
    dispatch(createComment(blog, newComment))
    setNewComment("")
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} <button className="like" onClick={like}>like</button>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div>
        {user.username === blog.user.username ? 
          <button className="remove" style={removeStyle} onClick={remove}>remove</button>
          : null
        }
      </div>
      <h4>comments</h4>
      <form onSubmit={handleComment}>
        <input value={newComment} onChange={e => setNewComment(e.target.value)} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
}

export default Blogs
