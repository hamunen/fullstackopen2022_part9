import { Diagnosis, Entry } from "../../types";

const PatientInfoEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => (
  <div>
    {entry.date} <i>{entry.description}</i>
    <ul>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>
          {c} {diagnoses.find((d) => d.code === c)?.name}
        </li>
      ))}
    </ul>
  </div>
);

export default PatientInfoEntry;
