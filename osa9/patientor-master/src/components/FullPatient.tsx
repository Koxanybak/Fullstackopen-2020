import React, { useState, useEffect } from "react";
import { useStateValue, addEntry } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient,
  Entry,
  Diagnosis,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from "../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { editPatient } from "../state";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/EntryForm";

const HospitalEntryC: React.FC<{ e: HospitalEntry; diagnoses: Diagnosis[] }> = ({ e, diagnoses }) => {
  return (
    <div>
      {e.date} {e.description} {e.discharge.criteria} {e.discharge.date}
      <ul>
        {e.diagnosisCodes
          ? e.diagnosisCodes.map(dc => {
            const diag = diagnoses.find(d => d.code === dc);
            return diag ? (
              <li key={dc}>
                {dc} {diag.name}
              </li>
            ) : null;
          })
          : null }
      </ul>
    </div>
  );
};
const OccupationalHealthcareEntryC: React.FC<{ e: OccupationalHealthcareEntry; diagnoses: Diagnosis[] }> = ({ e, diagnoses }) => {
  return (
    <div>
      {e.date} {e.description} {e.employerName}
      <ul>
        {e.diagnosisCodes
          ? e.diagnosisCodes.map(dc => {
            const diag = diagnoses.find(d => d.code === dc);
            return diag ? (
              <li key={dc}>
                {dc} {diag.name}
              </li>
            ) : null;
          })
          : null }
      </ul>
    </div>
  );
};
const HealthCheckEntryC: React.FC<{ e: HealthCheckEntry; diagnoses: Diagnosis[] }> = ({ e, diagnoses }) => {
  return (
    <div>
      {e.date} {e.description} {e.healthCheckRating}
      <ul>
        {e.diagnosisCodes
          ? e.diagnosisCodes.map(dc => {
            const diag = diagnoses.find(d => d.code === dc);
            return diag ? (
              <li key={dc}>
                {dc} {diag.name}
              </li>
            ) : null;
          })
          : null }
      </ul>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({ entry, diagnoses }) => {
  switch (entry.type) {
  case "Hospital":
    return <HospitalEntryC e={entry} diagnoses={diagnoses} />;
  case "OccupationalHealthcare":
    return <OccupationalHealthcareEntryC e={entry} diagnoses={diagnoses} />;
  case "HealthCheck":
    return <HealthCheckEntryC e={entry} diagnoses={diagnoses} />;
  }
};

const FullPatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (patient) {
        const { data: newEntry } = await axios.post<Entry>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch(addEntry(patient, newEntry));
        closeModal();
      }
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
      window.alert(e.response.data);
    }
  };

  const { id } = useParams<{ id: string }>();

  const [{ diagnoses }] = useStateValue();
  useEffect(() => {
    const patient = Object.values(patients).find(p => p.id === id);
    if (patient) {
      if (!patient.ssn) {
        axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        )
        .then(response => {
          dispatch(editPatient(response.data));
          setPatient(response.data);
        });
      } else {
        setPatient(patient);
      }
    }
  }, [patients]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}, {patient.gender}</h2>
      <div>
        {patient.ssn}
      </div>
      <div>
        {patient.occupation}
      </div>
      <h3>entries</h3>
      <div>
        {patient.entries.map(e => {
          return (
            <div key={e.id}>
              <EntryDetails entry={e} diagnoses={diagnoses} />
            </div>
          );
        })}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default FullPatient;