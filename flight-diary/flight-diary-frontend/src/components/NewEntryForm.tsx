import { useState } from "react";
import { createEntry } from "../diaryService";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";

const NewEntryForm = ({ onSubmit }: { onSubmit(entry: DiaryEntry): void }) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment,
    };

    createEntry(newEntry).then((data) => {
      onSubmit(data);
    });

    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <form onSubmit={entryCreation}>
        <label>
          date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <br />

        <label>
          visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </label>
        <br />

        <label>
          weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </label>
        <br />

        <label>
          comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="add" />
      </form>
    </div>
  );
};

export default NewEntryForm;
