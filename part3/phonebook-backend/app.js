const express = require('express');
const phonebookRouter = require('./controllers/phonebook');
const middleware = require('./utils/middleware');

const app = express();
app.use(express.json());
app.use('/api/persons', phonebookRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
