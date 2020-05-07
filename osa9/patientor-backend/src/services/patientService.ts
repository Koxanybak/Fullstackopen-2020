import patients from "../../data/patients";
import { NonSensPatient, Patient, Entry } from "../types";

export const getPatients = (): NonSensPatient => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

export const addPatient = (patient: Patient): NonSensPatient => {
  const newPatient = {
    ...patient,
    id: (Math.random() * 999999).toString(),
  };
  patients.push(newPatient);
  return newPatient;
};

export const getPatientById = (id: string): Patient | null => {
  const patient = patients.find(p => p.id === id);
  return patient ? { ...patient } : null;
};

export const addEntry = (entry: Entry | null, id: string): Entry | null => {
  if (entry) {
    const patient = getPatientById(id);
    patient?.entries.push(entry);
    return entry;
  }
  return null;
};

/*{
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }*/