import React from 'react'
import Togglable from "./Togglable"
import PropTypes from "prop-types"

const Blogs = ({ blogs, updateBlog, deleteBlog, user }) => (
  <div className="blogs">
    {blogs.sort((a, b) => b.likes - a.likes).map(blog => 
      <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
    )}
  </div>
)

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
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
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  user: PropTypes.object.isRequired,
}

export default Blogs
