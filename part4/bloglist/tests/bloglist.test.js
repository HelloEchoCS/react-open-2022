const mongoose = require('mongoose');
const supertest = require('supertest');
const { response } = require('../app');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);

const initialBlogs = [
  {
    title: 'first blog',
    author: 'chris',
    url: 'http://localhost',
    likes: 3,
  },
  {
    title: 'second blog',
    author: 'echo',
    url: 'http://localhost',
    likes: 4,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArray = blogObjects.map(obj => obj.save());
  await Promise.all(promiseArray);
});

test('all blogs are fetched', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(2);
}, 100000);

test('a valid blog can be added', async () => {
  const validBlog = {
    title: 'third blog',
    author: 'chris & echo',
    url: 'http://localhost',
    likes: 10,
  };
  await api
    .post('/api/blogs')
    .send(validBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const response = await api.get('/api/blogs')
  const titles = response.body.map((blog) => blog.title);
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain('third blog');
});

test('a blog without title cannot be created', async () => {
  const invalidBlog = {
    author: 'chris & echo',
    url: 'http://localhost',
    likes: 10,
  };
  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
})

afterAll(() => {
  mongoose.connection.close();
});