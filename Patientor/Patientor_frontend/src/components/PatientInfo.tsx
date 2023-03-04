//import { styled } from '@mui/material/styles';
//import { Box, Table, Button, TableHead, Typography, TableCell, TableRow, TableBody } from '@mui/material';

import { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { useParams } from "react-router-dom";
import { Gender } from "../types";

const PatientInfo = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id === undefined) return;

    const fetchPatient = async () => {
      const patient = await patientService.get(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  if (patient === undefined) return <div>Patient not found</div>;

  const getGenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return "♂";
      case Gender.Female:
        return "♀";
      default:
        return "asd";
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
    </div>
  );
};

export default PatientInfo;
