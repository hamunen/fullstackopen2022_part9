import { useState, SyntheticEvent, useContext } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Input,
} from "@mui/material";

import {
  Diagnosis,
  HealthCheckEntryFormValues,
  HealthCheckRating,
} from "../../types";
import DiagnosisContext from "../../context/diagnosisContext";

interface Props {
  onCancel: () => void;
  onSubmit: (values: HealthCheckEntryFormValues) => void;
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const ratingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === "number")
  .map((v) => ({
    value: v as number,
    label: HealthCheckRating[v as number],
  }));

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.LowRisk
  );

  const diagnoses = useContext(DiagnosisContext);

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);

    if (!isNaN(value) && Object.values(HealthCheckRating).includes(value)) {
      setHealthCheckRating(value);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    console.log(event.target.value);
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
      type: "HealthCheck",
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          type="date"
          fullWidth
          required
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>

        <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
        <Select
          label="Health check rating"
          fullWidth
          value={healthCheckRating.toString()}
          onChange={onRatingChange}
        >
          {ratingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
