import { useEffect } from "react";
import { Patient, Entry, Diagnosis } from "../types";
import axios from "axios";
import { useStateValue, setCurrentPatient } from "../state";
import { apiBaseUrl } from "../constants";

const DiagnosisList = ({ diagnosisCodes, diagnosisList }: { diagnosisCodes: string[], diagnosisList: {[code: string]: Diagnosis} }) => {
  return (
    <>
    {diagnosisCodes.map(code => <li key={code}>{code} {diagnosisList[code].name}</li>)}
    </>
  );
};

const EntryList = ({ entry }: { entry: Entry }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <>
    <p>{entry.date} {entry.description}</p>
    {(entry.diagnosisCodes && <DiagnosisList diagnosisCodes={entry.diagnosisCodes} diagnosisList={diagnosis} />)}
    </>
  );
};

const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <>
    <h3>entries</h3>
    {entries.map(entry => <EntryList key={entry.id} entry={entry}/>)}
    </>
  );
};

const PatientDetails = ({ id }: { id: string | undefined }) => {
  if (!id) return <p>Patient not found!</p>;

  const [{ patient }, dispatch] = useStateValue();
  const fetchPatient = async (id: string) => {
    const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    dispatch(setCurrentPatient(response.data));
    return response.data;
  };

  useEffect(() => {
    void fetchPatient(id);
  }, [id]);

  if (patient) {
    return (
      <>
      <h2>{patient.name} {patient.gender}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <Entries entries={patient.entries} />
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default PatientDetails;