import { useDispatch } from "react-redux"

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const keyword = event.target.value;
    dispatch({ type: 'filter/keyword', payload: keyword });
    // input-field value is in variable event.target.value
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter