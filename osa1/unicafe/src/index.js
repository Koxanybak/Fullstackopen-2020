import React, { useState} from "react"
import ReactDOM from "react-dom"

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  const all = good + bad + neutral

  if (all==0){
    return (
      <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGood} />
      <Button text="neutral" handleClick={handleNeutral} />
      <Button text="bad" handleClick={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (<button onClick={handleClick}>{text}</button>)
}

const StatisticLine = ({ text, amount }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{amount}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <div>
      <StatisticLine text="good" amount={good} />
      <StatisticLine text="neutral" amount={neutral} />
      <StatisticLine text="bad" amount={bad} />
      <StatisticLine text="all" amount={all} />
      <StatisticLine text="average" amount={(good*1 + neutral*0 + bad*-1)/all} />
      <StatisticLine text="positive" amount={good/all*100 + " %"} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))