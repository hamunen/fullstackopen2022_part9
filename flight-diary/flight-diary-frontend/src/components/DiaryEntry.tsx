import { DiaryEntry } from "../types";

const DiaryEntryComponent = ({ entry }: { entry: DiaryEntry }) => (
  <div>
    <h4>{entry.date}</h4>
    visibility: {entry.visibility} <br />
    weather: {entry.weather}
  </div>
);

export default DiaryEntryComponent;
