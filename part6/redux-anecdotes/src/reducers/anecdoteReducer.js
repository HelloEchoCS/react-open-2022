const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortList = (anecdotes) => {
  return [...anecdotes].sort((a, b) => {
    if (a.votes > b.votes) return -1;
    if (a.votes < b.votes) return 1;
    return 0
  });
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: id,
  }
}

export const addNew = (content) => {
  return {
    type: 'NEW',
    data: content,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case 'VOTE':
      newState = state.map(anecdote => {
        return anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote;
      });
      break;
    case 'NEW':
      newState = state.concat({
        content: action.data,
        id: getId(),
        votes: 0
      });
      break;
    default:
      return state;
  };

  return sortList(newState);
}

export default reducer