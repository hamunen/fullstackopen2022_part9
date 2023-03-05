//import { styled } from '@mui/material/styles';
//import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';

import { HealthCheckEntryFormValues, Patient } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import { Gender } from "../../types";
import EntryInfo from "./EntryDetails";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (id === undefined) return;

    const fetchPatient = async () => {
      const patient = await patientService.get(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (id === undefined || patient === undefined)
    return <div>Patient not found</div>;

  const getGenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return "♂";
      case Gender.Female:
        return "♀";
      default:
        return "";
    }
  };

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const entry = await patientService.addEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="patient">
      <h2>
        {patient.name} {getGenderIcon()}
      </h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation} <br />
      date of birth: {patient.dateOfBirth}
      <h3>entries</h3>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="outlined" size="small" onClick={() => openModal()}>
        Add New Entry
      </Button>
      {patient.entries.map((e) => (
        <EntryInfo key={e.id} entry={e} />
      ))}
    </div>
  );
};

export default PatientInfo;
