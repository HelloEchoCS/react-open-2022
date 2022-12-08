import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter));
  });
  let timeoutId = useSelector(state => state.notification.timeoutId);
  const dispatch = useDispatch();
  const voteAnecdote = (id) => {
    
    const anecdote = anecdotes.find(anecdote => anecdote.id === id);
    dispatch(vote(id));
    
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(dispatch.bind(null, { type: 'notification/clear' }), 5000);
    
    const payload = {
      message: `you voted '${anecdote.content}'`,
      timeoutId,
    }
    dispatch({ type: 'notification/notify', payload });
  };

  return (
    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteAnecdote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList;