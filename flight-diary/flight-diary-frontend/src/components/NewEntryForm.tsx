import { useState } from "react";
import { createEntry } from "../diaryService";
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from "../types";

const NewEntryForm = ({ onSubmit }: { onSubmit(entry: DiaryEntry): void }) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>();
  const [weather, setWeather] = useState<Weather>();
  const [comment, setComment] = useState("");
  const [notification, setNotification] = useState("");

  const notifyError = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 5000);
  };

  const invalid =
    date === "" || weather === undefined || visibility === undefined;

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (visibility === undefined) {
      notifyError("Visibility not set");
      return;
    }
    if (weather === undefined) {
      notifyError("Weather not set");
      return;
    }
    const newEntry: NewDiaryEntry = {
      date,
      visibility: visibility,
      weather: weather,
      comment,
    };

    createEntry(newEntry, notifyError).then((data) => {
      if (data !== undefined) onSubmit(data);
    });

    setDate("");
    setComment("");
    setVisibility(undefined);
    setWeather(undefined);
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <p style={{ color: "red" }}>{notification}</p>
      <form onSubmit={entryCreation}>
        <label>
          date
          <input
            value={date}
            type="date"
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
        <br />

        <label>
          visibility &ensp; great
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Great)}
          />
          good
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Good)}
          />
          ok
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Ok)}
          />
          poor
          <input
            type="radio"
            name="visibility"
            onChange={() => setVisibility(Visibility.Poor)}
          />
        </label>
        <br />

        <label>
          weather &ensp; sunny
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Sunny)}
          />
          rainy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Rainy)}
          />
          cloudy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Cloudy)}
          />
          stormy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Stormy)}
          />
          windy
          <input
            type="radio"
            name="weather"
            onChange={() => setWeather(Weather.Windy)}
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
        <input type="submit" value="add" disabled={invalid} />
      </form>
    </div>
  );
};

export default NewEntryForm;
