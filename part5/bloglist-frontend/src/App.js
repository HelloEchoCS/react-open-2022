import { useState, useEffect } from 'react'
import Blog from './components/Blog';
import LoginForm from './components/Login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs'
import loginService from './services/login'

const BlogList = ({ blogs }) => {
  return blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      window.localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      console.log(err.message);
    }
  }

  const addBlog = async blogObj => {
    try {
      const newBlog = await blogService.create(blogObj);
      setBlogs(blogs.concat(newBlog));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div>
      { user === null && <LoginForm nameOnChange={handleUsernameChange} passwordOnChange={handlePasswordChange} onSubmit={handleLogin} /> }
      { user !== null && <p>Logged in!</p> }
      <Togglable buttonLabel='add new'>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <h2>blogs</h2>
      <BlogList blogs={blogs} />
    </div>
  )
}

export default App
