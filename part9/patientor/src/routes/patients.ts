import express from 'express';
import patientsData from '../../data/patients';
import { getNonSensitiveData, toNewPatient } from '../utils/utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const data = getNonSensitiveData(patientsData);
  res.send(data);
});

router.post('/', (req, res) => {
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = toNewPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  const returnPatient = patientService.addPatient(newPatient);
  res.json(returnPatient);
});

router.get('/:id', (req, res) => {
  const id = req.params['id'];
  const patient = patientService.findById(id);

  if (patient) {
    res.json(patient);
  }
});

export default router;