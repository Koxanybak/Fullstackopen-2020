import anecdoteService from "../services/anecdoteService"

const reducer = (state = [], action) => {
  if (action.type === "NEW_ANECDOTE") {
    return [...state, action.data]
  } else if (action.type === "VOTE") {
    const anecdoteToChange = state.find(anecdote => anecdote.id === action.data.id)
    const changed = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
    return state.map(anecdote => anecdote.id === action.data.id ? changed : anecdote)
  } else if (action.type === "INIT") {
    return action.data
  }

  return state
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote
    })
  }
}

export const createVote = anecdoteObject => {
  return async dispatch => {
    await anecdoteService.update({
      ...anecdoteObject,
      votes: anecdoteObject.votes + 1
    })
    dispatch({
      type: "VOTE",
      data: { id: anecdoteObject.id },
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT",
      data: anecdotes
    })
  }
}

export default reducer