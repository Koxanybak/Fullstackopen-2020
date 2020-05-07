import diagnoses from "../../data/diagnoses.json";
import { Diagnose } from "../types";

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};