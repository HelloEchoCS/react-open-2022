const Login = ({ nameOnChange, passwordOnChange, onSubmit }) => {
  return (
  <form onSubmit={onSubmit}>
    <label>username</label>
    <input onChange={nameOnChange}></input>
    <label>password</label>
    <input onChange={passwordOnChange}></input>
    <button type="submit">login</button>
  </form>
  )
};

export default Login;