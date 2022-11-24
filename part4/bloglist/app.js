// const http = require('http');
const express = require('express');
const router = require('./controllers/bloglist');
// const cors = require('cors');
const app = express();
// app.use(cors())
app.use('/api/blogs', router);

module.exports = app;