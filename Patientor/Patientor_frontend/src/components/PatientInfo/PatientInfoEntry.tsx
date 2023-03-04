import { Entry } from "../../types";

const PatientInfoEntry = ({ entry }: { entry: Entry }) => (
  <div>
    {entry.date} <i>{entry.description}</i>
    <ul>
      {entry.diagnosisCodes?.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  </div>
);

export default PatientInfoEntry;
