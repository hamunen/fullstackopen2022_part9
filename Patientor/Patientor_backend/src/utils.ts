import { NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringProperty = (text: unknown, propName: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect or missing ${propName}`);
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringProperty(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringProperty(object.ssn, "ssn"),
      gender: parseStringProperty(object.gender, "gender"),
      occupation: parseStringProperty(object.occupation, "occupation"),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatient;
