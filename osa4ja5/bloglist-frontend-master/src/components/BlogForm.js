import React, { useState }from "react"
import PropTypes from "prop-types"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const addBlog = event => {
    event.preventDefault()
    createBlog({ title, author, url })
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  
  return (
    <form onSubmit={addBlog} >
      <div>
        title: <input id="title" value={title} onChange={handleTitleChange} name="Title" />
      </div>
      <div>
        author: <input id="author" value={author} onChange={handleAuthorChange} name="Author" />
      </div>
      <div>
        url: <input id="url" value={url} onChange={handleUrlChange} name="Url" />
      </div>
      <button type="submit" >create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm