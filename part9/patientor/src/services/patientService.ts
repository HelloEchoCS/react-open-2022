import { NewPatient, Patient } from "../types";
import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";

const addPatient = (newPatient: NewPatient): Patient => {
  const patient = {
    ...newPatient,
    id: uuid(),
  } as Patient;

  patients.push(patient);

  return patient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default { addPatient, findById };