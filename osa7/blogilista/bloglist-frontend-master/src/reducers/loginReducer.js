import loginService from "../services/login"
import blogService from "../services/blogs"
import { createNotification, deleteNotification } from "./notificationReducer"

const loginReducer = (state = null, action) => {
  if (action.type === "LOGIN") {
    return action.data
  } if (action.type === "LOGOUT") {
    return null
  } if (action.type === "PASS") {
    return state
  }

  return state
}

export const createLogin = credentials => {

  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
  
      blogService.setToken(user.token)
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user))
  
      dispatch({
        type: "LOGIN",
        data: user,
      })
    } catch (exception) {
      dispatch(createNotification("wrong credentials"))
      setTimeout(() => {
        dispatch(deleteNotification())
      }, 5000)
    }
  }
}

export const passLogin = () => {
  const user = window.localStorage.getItem("loggedBloglistUser")

  if (user) {
    const jsonUser = JSON.parse(user)
    blogService.setToken(jsonUser.token)
    return {
      type: "LOGIN",
      data: jsonUser,
    }
  }

  return {
    type: "PASS",
  }
}

export const createLogout = () => {
  blogService.setToken(null)
  window.localStorage.removeItem("loggedBloglistUser")

  return {
    type: "LOGOUT",
  }
}

export default loginReducer