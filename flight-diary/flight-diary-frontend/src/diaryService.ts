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
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      if (e?.response?.data && typeof e?.response?.data === "string") {
        const message = e.response.data;
        console.error(message);
        notifyError(message);
      } else {
        notifyError("Unrecognized axios error");
      }
    } else {
      console.error("Unknown error", e);
      notifyError("Unknown error");
    }
  }
};
