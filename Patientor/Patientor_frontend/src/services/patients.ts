import axios from "axios";
import {
  HealthCheckEntry,
  HealthCheckEntryFormValues,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const get = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (
  patientId: string,
  object: HealthCheckEntryFormValues
) => {
  const { data } = await axios.post<HealthCheckEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries/`,
    object
  );

  return data;
};

export default {
  getAll,
  get,
  create,
  addEntry,
};
