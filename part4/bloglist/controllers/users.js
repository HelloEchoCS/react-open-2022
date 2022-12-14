const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/user');
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;