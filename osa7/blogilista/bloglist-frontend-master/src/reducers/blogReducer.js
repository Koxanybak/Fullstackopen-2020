import blogService from "../services/blogs"
import { createNotification, deleteNotification } from "./notificationReducer"

const blogReducer = (state = [], action) => {
  if (action.type === "CREATE_BLOG") {
    return state.concat(action.data)
  } if (action.type === "INIT") {
    return action.data
  } if (action.type === "UPDATE_BLOG") {
    return state.map(b => b.id === action.data.id ? action.data : b)
  } if (action.type === "REMOVE_BLOG") {
    return state.filter(b => b.id !== action.data.id)
  } if (action.type === "COMMENT") {
    console.log("tila muuttuu")
    return state.map(b => b.id === action.data.commentedBlog.id
      ? { ...b, comments: b.comments.concat(action.data.comment) }
      : b)
  }

  return state
}

export const newBlog = blogObject => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)

      dispatch({
        type: "CREATE_BLOG",
        data: newBlog
      })

      dispatch(createNotification(`a new blog ${newBlog.title} by ${newBlog.author}`))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    } catch (exception) {
      dispatch(createNotification(exception.message))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()

    dispatch({
      type: "INIT",
      data: blogs,
    })
  }
}

export const createRemove = blog => { 
  return async dispatch => {
    try {
      await blogService.deleteBlog(blog)

      dispatch({
        type: "REMOVE_BLOG",
        data: blog,
      })
    } catch (exception) {
      dispatch(createNotification(exception.message))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }
}

export const createLike = blog => {
  return async dispatch => {
    try {
      const blogToBeUpdated = { ...blog, likes: blog.likes + 1 }

      const updatedBlog = await blogService.update(blogToBeUpdated)

      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog,
      })
    } catch (exception) {
      dispatch(createNotification(exception.message))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }
}

export const createComment = (blog, comment) => {
  return async dispatch => {
    try {
      const commentedBlog = await blogService.comment(blog, comment)

      dispatch({
        type: "COMMENT",
        data: { commentedBlog, comment },
      })
    } catch (exception) {
      dispatch(createNotification(exception.message))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }
}

export default blogReducer