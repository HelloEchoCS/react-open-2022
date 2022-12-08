// const http = require('http');
const express = require('express');
const router = require('./controllers/bloglist');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
// const cors = require('cors');
const app = express();
// app.use(cors())
app.use('/api/blogs', router);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

module.exports = app;