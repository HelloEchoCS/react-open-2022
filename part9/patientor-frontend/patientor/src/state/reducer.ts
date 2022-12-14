import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_CURRENT_PATIENT";
      payload: Patient | null;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_CURRENT_PATIENT":
      return {
        ...state,
        patient: action.payload
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: action.payload.reduce((obj, diagnose) => {
          return {...obj, [diagnose.code]: diagnose};
        }, {}),
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setCurrentPatient = (patient: Patient): Action => {
  return {
    type: "SET_CURRENT_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis,
  };
};
