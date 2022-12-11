import express from 'express';
import diagnosesData from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = diagnosesData;
  res.send(data);
});

export default router;