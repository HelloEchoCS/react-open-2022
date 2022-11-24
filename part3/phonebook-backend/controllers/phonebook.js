const phonebookRouter = require('express').Router();
const PhonebookModel = require('../models/phonebook');

phonebookRouter.get('/', (request, response) => {
  PhonebookModel.find({})
    .then((all) => response.json(all))
    .catch((err) => console.log(err.message));
});

phonebookRouter.post('/', (request, response, next) => {
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

phonebookRouter.get('/info', (request, response) => {
  PhonebookModel.find({})
    .then((all) => {
      const msg = `<p>Phonebook has info for ${all.length} people</p>`;
      const date = `<p>${new Date(Date.now()).toString()}</p>`;
      response.send(msg + date);
    });
});

phonebookRouter.delete('/:id', (request, response, next) => {
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

module.exports = phonebookRouter;
