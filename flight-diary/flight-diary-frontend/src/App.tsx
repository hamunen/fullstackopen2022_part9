import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries, createEntry } from "./diaryService";
import DiaryEntryComponent from "./components/DiaryEntry";
import NewEntryForm from "./components/NewEntryForm";

const App = () => {
  const [entries, setEntires] = useState<DiaryEntry[]>([]);

  const addEntry = (entry: DiaryEntry) => {
    setEntires(entries.concat(entry));
  };

  useEffect(() => {
    getAllEntries().then((data) => {
      setEntires(data);
    });
  }, []);

  return (
    <div>
      <NewEntryForm onSubmit={addEntry} />
      <h3>Diary entries</h3>
      {entries.map((entry) => (
        <DiaryEntryComponent entry={entry} key={entry.id} />
      ))}
    </div>
  );
};

export default App;
