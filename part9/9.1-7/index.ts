import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello World!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    const data = {
      weight,
      height,
      bmi,
    };
    res.send(data);
  } catch (err) {
    res.status(400).send({ error: "malformatted parameters" });
  }
})

app.listen(3000);