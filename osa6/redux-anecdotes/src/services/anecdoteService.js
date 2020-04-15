import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async content => {
  const anecdote = {
    content,
    votes: 0,
  }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async anecdoteObject => {
  const response = await axios.put(`${baseUrl}/${anecdoteObject.id}`, anecdoteObject)
  return response.data
}

export default { getAll, createAnecdote, update }