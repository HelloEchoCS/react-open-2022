import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleTitleChange = event => setTitle(event.target.value);
  const handleAuthorChange = event => setAuthor(event.target.value);
  const handleUrlChange = event => setUrl(event.target.value);

  const onSubmit = async event => {
    event.preventDefault();
    await createBlog({ title, author, url });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>title</label>
          <input value={title} onChange={handleTitleChange}></input>
        </div>
        <div>
          <label>author</label>
          <input value={author} onChange={handleAuthorChange}></input>
        </div>
        <div>
          <label>url</label>
          <input value={url} onChange={handleUrlChange}></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
}

export default BlogForm;