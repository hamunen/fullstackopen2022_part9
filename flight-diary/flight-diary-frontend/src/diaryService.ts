import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "./types";

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
    .then((response) => response.data);
};

export const createEntry = async (
  object: NewDiaryEntry,
  notifyError: (message: string) => void
) => {
  try {
    const response = await axios.post<DiaryEntry>(
      "http://localhost:3001/api/diaries",
      object
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response);
      // Do something with this error...
      notifyError(error.response?.data);
    } else {
      console.error(error);
    }
  }
};
