import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = ({ createAnecdote, createNotification }) => {

  const newAnecdote = event => {
    event.preventDefault()

    const content = event.target.content.value

    createAnecdote(content)
    createNotification(`Created a new anecdote`, 5)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createNotification, createAnecdote,
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)