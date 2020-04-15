const filterReducer = (state = '', action) => {
  if (action.type === "FILTER") {
    return action.data.filter
  }

  return state
}

export const createFilter = filter => {
  return {
    type: "FILTER",
    data: { filter }
  }
}

export default filterReducer