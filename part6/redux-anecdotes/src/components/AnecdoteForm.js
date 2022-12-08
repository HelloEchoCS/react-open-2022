import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.new.value;
    dispatch(addNew(content));
  
    event.target.new.value = '';
  }

  return (
    <form onSubmit={createAnecdote}>
      <div><input name="new" /></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm;