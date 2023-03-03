import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
    .then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>("http://localhost:3001/api/diares", object)
    .then((response) => response.data);
};
