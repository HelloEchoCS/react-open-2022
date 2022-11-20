import { useState } from 'react';

const Title = ({ text }) => <h1>{text}</h1>
const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Stats = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (all === 0) return "No feedback given"

  const average = all / 3
  const positive = good / all

  return (
    <table>
      <tbody>
        <Stat option="good" number={good} />
        <Stat option="neutral" number={neutral} />
        <Stat option="bad" number={bad} />
        <Stat option="all" number={all} />
        <Stat option="average" number={average} />
        <Stat option="positive" number={positive} />
      </tbody>
    </table>
  )
}

const Stat = ({ option, number }) => {
  return (
    <tr>
      <td>{option}</td>
      <td>{number}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = all / 3
  const positive = good / all

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Title text="give feedback" />
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />
      <Title text="statistics" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
