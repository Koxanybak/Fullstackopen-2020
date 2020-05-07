import express from "express";
import { getPatients, addPatient, getPatientById, addEntry } from "../services/patientService";
import { toNewPatient, toNewEntry } from "../utils";
import { Patient } from "../types";

const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.json(getPatients());
});

patientRouter.get("/:id", (req, res) => {
  res.json(getPatientById(req.params.id));
});

patientRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body) as Patient;

    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

patientRouter.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);

    const addedEntry = addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default patientRouter;