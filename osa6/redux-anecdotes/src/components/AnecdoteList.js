import React from "react"
import { createVote } from "../reducers/anecdoteReducer"
import { createNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteList = ({ anecdotes, createVote, createNotification }) => {

  const vote = id => {
    const anecdoteToBeVoted = anecdotes.find(a => a.id === id)

    createVote(anecdoteToBeVoted)
    createNotification(`You voted "${anecdoteToBeVoted.content}"`, 5)
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapDispatchToProps = {
  createVote, createNotification,
}

const mapStateToProps = state => {
  return {
    filter: state.filter,
    anecdotes: state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)