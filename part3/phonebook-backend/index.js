const express = require('express');
const PhonebookModel = require('./models/phonebook');

const app = express();
const baseurl = '/api/persons';

app.use(express.json());

app.get(baseurl, (request, response) => {
  PhonebookModel.find({})
    .then((all) => response.json(all))
    .catch((err) => console.log(err.message));
});

app.post(baseurl, (request, response, next) => {
  const { body } = request;
  if (!body) {
    response.status(404).send('request body cannot be empty');
    return;
  }

  const newPerson = new PhonebookModel({
    name: body.name,
    number: body.number,
  });
  newPerson.save()
    .then((saved) => {
      response.json(saved);
    })
    .catch((err) => next(err));
});

app.get('/info', (request, response) => {
  PhonebookModel.find({})
    .then((all) => {
      const msg = `<p>Phonebook has info for ${all.length} people</p>`;
      const date = `<p>${new Date(Date.now()).toString()}</p>`;
      response.send(msg + date);
    });
});

app.delete(`${baseurl}/:id`, (request, response, next) => {
  const { id } = request.params;
  PhonebookModel.findByIdAndDelete(id)
    .then((found) => {
      console.log(found);
      if (found === null) {
        response.status(404).send('Person not found');
      } else {
        response.status(204).end();
      }
    })
    .catch((err) => next(err));
});

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'invalid id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
