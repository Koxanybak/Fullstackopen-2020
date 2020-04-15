const notificationReducer = (state = null, action) => {
  if (action.type === "NOTIFICATION") {
    if (state !==  null) {
      clearTimeout(state.timeoutID)
    }

    return {
      message: action.data.message,
      timeoutID: action.data.timeoutID
    }
  } else if (action.type === "DELETE") {
    return null
  }

  return state
}

export const createNotification = (message, time) => {
  
  return async dispatch => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: "DELETE",
      })
    }, time * 1000)

    dispatch({
      type: "NOTIFICATION",
      data: { message, timeoutID }
    })
  }
}

export default notificationReducer