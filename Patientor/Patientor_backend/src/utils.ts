import {
  Diagnosis,
  Discharge,
  EntryType,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatient,
  SickLeave,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseStringParam = (text: unknown, paramName: string): string => {
  if (!isString(text)) {
    throw new Error(`Incorrect or missing ${paramName}`);
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

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
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
      name: parseStringParam(object.name, "name"),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringParam(object.ssn, "ssn"),
      gender: parseGender(object.gender),
      occupation: parseStringParam(object.occupation, "occupation"),
      entries: [],
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  // we will just trust the data to be in correct form
  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (ratingToParse: unknown): HealthCheckRating => {
  const rating = Number(ratingToParse);
  if (!isHealthCheckRating(rating)) {
    throw new Error("Incorrect entry health check rating: " + ratingToParse);
  }
  return rating;
};

const parseSickLeave = (object: unknown): SickLeave | undefined => {
  if (!object || typeof object !== "object" || !("sickLeave" in object))
    return undefined;

  const sickLeaveObj = object.sickLeave;
  if (
    !sickLeaveObj ||
    typeof sickLeaveObj !== "object" ||
    !("startDate" in sickLeaveObj) ||
    !("endDate" in sickLeaveObj)
  ) {
    throw new Error("Incorrect or missing data in property sickLeave");
  }

  return {
    startDate: parseDate(sickLeaveObj.startDate),
    endDate: parseDate(sickLeaveObj.endDate),
  };
};

const isDischarge = (param: object): param is Discharge =>
  "date" in param &&
  "criteria" in param &&
  isString(param.date) &&
  isString(param.criteria);

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing data in property discharge");
  }
  return { ...discharge, date: parseDate(discharge.date) };
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    !("description" in object) ||
    !("date" in object) ||
    !("specialist" in object) ||
    !("type" in object)
  ) {
    throw new Error("Incorrect data: a field missing");
  }

  const baseEntry: NewBaseEntry = {
    description: parseStringParam(object.description, "description"),
    date: parseDate(object.date),
    specialist: parseStringParam(object.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(object),
  };

  if (object.type === EntryType.HealthCheck) {
    if (!("healthCheckRating" in object))
      throw new Error("Incorrect data: field healthCheckRating missing");
    return {
      ...baseEntry,
      type: object.type,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  }

  if (object.type === EntryType.OccupationalHealthcare) {
    if (!("employerName" in object))
      throw new Error("Incorrect data: field employerName missing");
    return {
      ...baseEntry,
      type: object.type,
      employerName: parseStringParam(object.employerName, "employerName"),
      sickLeave: parseSickLeave(object),
    };
  }

  if (object.type === EntryType.Hospital) {
    if (!("discharge" in object))
      throw new Error("Incorrect data: field discharge missing");
    return {
      ...baseEntry,
      type: object.type,
      discharge: parseDischarge(object.discharge),
    };
  }

  throw new Error("Incorrect entry type: " + object.type);
};
