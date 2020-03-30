import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

  const rnd = () => {
    let r = Math.floor(Math.random()*6)
    setSelected(r)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  function maxIndex(list){
    let largest = 0
    list.forEach(point => {
      if (point > largest){
        largest = point
      }
    })
    return list.findIndex((point) => largest===point)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display text={props.anecdotes[selected]} />
      <Display text={`has ${points[selected]} votes`} />
      <Button handleClick={rnd} text="next anecdote" />
      <Button handleClick={handleVote} text="vote" />
      <h1>Anecdote with the most votes</h1>
      <Display text={props.anecdotes[maxIndex(points)]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({ text }) => <div>{text}</div>

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)