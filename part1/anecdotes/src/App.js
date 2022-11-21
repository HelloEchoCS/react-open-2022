import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Votes = ({ votes }) => {
  return (
    <p>
      has {votes} votes
    </p>
  )
}

const Title = ({ text }) => <h1>{text}</h1>
const Anecdote = ({ text }) => <p>{text}</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const initPoints = () => {
    const returnArray = [];
    for (let i = 0; i < anecdotes.length; i += 1) {
      returnArray.push(0);
    }

    return returnArray;
  }

  const random = (n) => {
    return Math.floor(Math.random() * n);
  }

  const mostVotesIndex = () => points.indexOf(Math.max(...points))
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initPoints())

  const handleClick = () => {
    setSelected(random(anecdotes.length));
  }

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy)
  }

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]}/>
      <Votes votes={points[selected]} />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={handleClick} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVotesIndex()]} />
    </div>
  )
}

export default App