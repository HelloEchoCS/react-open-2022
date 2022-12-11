import { NonSensitivePatient, NewPatient, Patient, Gender } from "../types";

const isString = (input: unknown): input is string => {
  return (typeof input === 'string') || (input instanceof String);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (input: any): input is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(input);
};

const isValidDOB = (dob: string): boolean => {
  return Boolean(Date.parse(dob));
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) throw new Error('invalid name');

  return name;
};

const parseDOB = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isValidDOB(dob)) throw new Error('invalid date of birth');

  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) throw new Error('invalid gender');

  return gender;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) throw new Error('invalid ssn');

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) throw new Error('invalid occupation');

  return occupation;
};

export const getNonSensitiveData = (data: Array<Patient>): Array<NonSensitivePatient> => {
  return data.map(patient => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
    };
  });
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDOB(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
};