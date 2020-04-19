import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { newBlog } from "../reducers/blogReducer"
import { TextField, Button } from "@material-ui/core"

const BlogForm = ({ toggle }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = event => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = event => {
    setUrl(event.target.value)
  }

  const createBlog = event => {
    event.preventDefault()

    dispatch(newBlog({ title, author, url }))
    
    setTitle('')
    setAuthor('')
    setUrl('')

    toggle()
  }
  
  return (
    <form onSubmit={createBlog} >
      <div>
        <TextField id="title" label="title" onChange={handleTitleChange} />
      </div>
      <div>
        <TextField id="author" label="author" onChange={handleAuthorChange} />
      </div>
      <div>
        <TextField id="url" label="url" onChange={handleUrlChange} />
      </div>
      <Button variant="contained" color="primary" type="submit">
        create
      </Button>
    </form>
  )
}

export default BlogForm