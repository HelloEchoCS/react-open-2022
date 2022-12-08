import { useState } from "react"

// import Togglable from "./Togglable";
const BlogDetails = ({ blog }) => {
  return (
  <>
    <p>{blog.url}</p>
    <p>{blog.author}</p>
  </>
  );
}

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false);
  const toggleDetails = () => setVisible(!visible);
  const showWhenVisible = { display: visible ? '' : 'none' };
  const buttonName = visible ? 'hide' : 'view';

  return (
    <div>
      {blog.title} {blog.author} <button onClick={toggleDetails}>{buttonName}</button>
      <div style={showWhenVisible}>
        <BlogDetails blog={blog} />
      </div>
    </div>
  )
}

export default Blog;