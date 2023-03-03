import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import DiaryEntryComponent from "./components/DiaryEntry";

const App = () => {
  const [entries, setEntires] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState("");

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntires(data);
    });
  }, []);

  return (
    <div>
      <h3>Diary entries</h3>
      {entries.map((entry) => (
        <DiaryEntryComponent entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default App;
