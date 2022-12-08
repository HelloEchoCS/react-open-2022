const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/user');
const loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  const match = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash);

  if (!match) response.status(400).send('invalid credentials!');

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;