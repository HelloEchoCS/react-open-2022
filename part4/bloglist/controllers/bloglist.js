const express = require('express');
const jwt = require('jsonwebtoken');
require('express-async-errors');
const bloglistRouter = express.Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

const getTokenFrom = request => {
  const authHeader = request.get('authorization');
  if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7);
  }

  return null;
}

bloglistRouter.use(express.json());

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

bloglistRouter.post('/', async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = token === null
    ? null
    : jwt.verify(token, process.env.SECRET);

  if (!decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
});

bloglistRouter.use(middleware.errorHandler);

module.exports = bloglistRouter;