import { NewPatient, Gender, HealthCheckRating, Diagnose, SickLeave, Discharge } from "./types";
import { Entry } from "./types";
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (text: any): text is Gender => {
  return Object.values(Gender).includes(text);
};

const isHCR = (text: any): text is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(text);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Name missing or incorrect " + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error("Date of birth missing or incorrect " + date);
  }
  return date;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Occupation missing or incorrect " + occupation);
  }
  return occupation;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Gender missing or incorrect " + gender);
  }
  return gender;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Ssn missing or incorrect " + ssn);
  }
  return ssn;
};

const parseString = (text: any, type: string): string => {
  if (!text || !isString(text)) {
    throw new Error(type + " missing or incorrect " + text);
  }
  return text;
};

const parseHCR = (text: any): HealthCheckRating => {
  if (!text || !isHCR) {
    throw new Error("HCR missing or incorrect " + text);
  }
  return text;
};

const parseHealthCheck = (text: any): "HealthCheck" => {
  if (!text || !["HealthCheck"].includes(text)) {
    throw new Error("type missing or incorrect " + text);
  }
  return text;
};

const parseHospital = (text: any): "Hospital" => {
  if (!text || !["Hospital"].includes(text)) {
    throw new Error("type missing or incorrect " + text);
  }
  return text;
};

const parseOccupationalHealthcare = (text: any): "OccupationalHealthcare" => {
  if (!text || !["OccupationalHealthcare"].includes(text)) {
    throw new Error("type missing or incorrect " + text);
  }
  return text;
};

const parseDiagnosis = (list: any): Array<Diagnose['code']> => {
  list.forEach((d: any) => {
    if (!isString(d)) {
      throw new Error("diagnosiscode missing or incorrect " + d);
    }
  });

  return list;
};

const parseEmployerName = (text: any): string => {
  if (!text|| !isString(text)) {
    throw new Error("emplouyer missing or incorrect " + text);
  }
  return text;
};

const parseSickLeave = (start: any, end: any): SickLeave => {
  if ((start && end) && (!isString(start) || !isString(end))) {
    throw new Error("sickLeave missing or incorrect " + start + end);
  }
  return {
    startDate: start,
    endDate: end
  };
};

const parseDischarge = (text: any): Discharge => {
  if (!text || (text && (!text.date || !text.criteria) || (!isString(text.date) || !isString(text.criteria)))) {
    throw new Error("Discharge missing or incorrect " + text);
  }
  return text;
};


export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    entries: new Array<Entry>(),
  };
};

export const toNewEntry = (object: any): Entry | null => {
  switch (object.type) {
    case "HealthCheck":
      return {
        id: (Math.random() * 9999999).toString(),
        description: parseString(object.description, "description"),
        date: parseString(object.date, "date"),
        specialist: parseString(object.specialist, "specialist"),
        diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
        type: parseHealthCheck(object.type),
        healthCheckRating: parseHCR(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        id: (Math.random() * 9999999).toString(),
        description: parseString(object.description, "description"),
        date: parseString(object.date, "date"),
        specialist: parseString(object.specialist, "specialist"),
        diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
        type: parseOccupationalHealthcare(object.type),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.start, object.end)
      };
      case "Hospital":
        return {
          id: (Math.random() * 9999999).toString(),
          description: parseString(object.description, "description"),
          date: parseString(object.date, "date"),
          specialist: parseString(object.specialist, "specialist"),
          diagnosisCodes: parseDiagnosis(object.diagnosisCodes),
          type: parseHospital(object.type),
          discharge: parseDischarge(object.discharge)
        };
      default:
        return null;
  }
};