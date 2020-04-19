const notificationReducer = (state = null, action) => {
  if (action.type === "NOTIFICATION") {
    return action.data.message
  } if (action.type === "DELETE") {
    return null
  }

  return state
}

export const createNotification = message => {
  return {
    type: "NOTIFICATION",
    data: { message }
  }
}

export const deleteNotification = () => {
  return {
    type: "DELETE",
  }
}

export default notificationReducer