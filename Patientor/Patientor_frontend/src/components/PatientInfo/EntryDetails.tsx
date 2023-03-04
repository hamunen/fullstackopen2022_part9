import {
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { useContext } from "react";
import DiagnosisContext from "../../context/diagnosisContext";
import { assertNever } from "../../utils";
import { EntryContainer } from "../../styles";
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";

const HealthCheckRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: "gold" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: "red" }} />;
    case HealthCheckRating.CriticalRisk:
      return <WarningOutlinedIcon sx={{ color: "red" }} />;
  }
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <>
    {entry.date} <LocalHospitalOutlinedIcon /> <br />
    <i>{entry.description}</i> <br />
    Discharged {entry.discharge.date}: {entry.discharge.criteria}
  </>
);
const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <>
    {entry.date} <WorkOutlineOutlinedIcon /> ({entry.employerName}) <br />
    <i>{entry.description}</i> <br />
    {entry.sickLeave &&
      `got some sick leave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`}
  </>
);
const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <>
    {entry.date} <MonitorHeartOutlinedIcon /> <br />
    <i>{entry.description}</i> <br />
    <HealthCheckRatingIcon rating={entry.healthCheckRating} /> <br />
  </>
);

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const EntryInfo = ({ entry }: { entry: Entry }) => {
  const diagnoses = useContext(DiagnosisContext);

  return (
    <EntryContainer>
      <EntryDetails entry={entry} />
      <ul>
        {entry.diagnosisCodes?.map((c) => (
          <li key={c}>
            {c} {diagnoses.find((d) => d.code === c)?.name}
          </li>
        ))}
      </ul>
      diagnosed by {entry.specialist}
    </EntryContainer>
  );
};

export default EntryInfo;
