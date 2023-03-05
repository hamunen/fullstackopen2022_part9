import { useState, SyntheticEvent, useContext } from "react";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import {
  Diagnosis,
  NewEntry,
  HealthCheckRating,
  EntryType,
  SickLeave,
} from "../../types";
import DiagnosisContext from "../../context/diagnosisContext";

import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
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
  const [formEntryType, setFormEntryType] = useState(EntryType.HealthCheck);

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.LowRisk
  );

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const diagnoses = useContext(DiagnosisContext);

  const handleEntryTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newEntryType: EntryType
  ) => {
    setFormEntryType(newEntryType);
  };

  const onRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);

    if (!isNaN(value) && Object.values(HealthCheckRating).includes(value)) {
      setHealthCheckRating(value);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseValues = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (formEntryType) {
      case EntryType.HealthCheck:
        onSubmit({
          ...baseValues,
          healthCheckRating,
          type: EntryType.HealthCheck,
        });
        break;
      case EntryType.OccupationalHealthcare:
        onSubmit({
          ...baseValues,
          employerName,
          sickLeave:
            sickLeaveStart !== "" && sickLeaveEnd !== ""
              ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
              : undefined,
          type: EntryType.OccupationalHealthcare,
        });
        break;
      case EntryType.Hospital:
        onSubmit({
          ...baseValues,
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
          type: EntryType.Hospital,
        });
        break;
    }
  };

  const baseEntryInputs = () => (
    <>
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

      <InputLabel style={{ marginTop: 10 }}>Date</InputLabel>
      <TextField
        type="date"
        fullWidth
        required
        value={date}
        onChange={({ target }) => setDate(target.value)}
      />

      <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
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
    </>
  );

  const healthCheckEntryInputs = () => (
    <>
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
    </>
  );

  const occupationalEntryInputs = () => (
    <>
      <TextField
        label="Employer name"
        fullWidth
        required
        style={{ marginTop: 10 }}
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel style={{ marginTop: 20 }}>Sick leave</InputLabel>
      <div
        style={{
          marginLeft: 10,
          display: "inline-flex",
        }}
      >
        <div>
          <InputLabel style={{ marginTop: 10 }}>Start</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
          />
        </div>
        <div>
          <InputLabel style={{ marginTop: 10 }}>End</InputLabel>
          <TextField
            type="date"
            fullWidth
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
          />
        </div>
      </div>
    </>
  );

  const hospitalEntryInputs = () => (
    <>
      <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
      <TextField
        type="date"
        fullWidth
        required
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        label="Criteria"
        fullWidth
        required
        style={{ marginTop: 10 }}
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
      />
    </>
  );

  return (
    <div>
      <ToggleButtonGroup
        value={formEntryType}
        exclusive
        fullWidth
        color="primary"
        size="small"
        onChange={handleEntryTypeChange}
        aria-label="entry type"
        style={{ marginBottom: 20 }}
      >
        <ToggleButton value={EntryType.HealthCheck}>
          Health check <MonitorHeartOutlinedIcon />
        </ToggleButton>
        <ToggleButton value={EntryType.OccupationalHealthcare}>
          Occupational <WorkOutlineOutlinedIcon />
        </ToggleButton>
        <ToggleButton value={EntryType.Hospital}>
          Hospital <LocalHospitalOutlinedIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <form onSubmit={addEntry}>
        {baseEntryInputs()}
        {formEntryType === EntryType.HealthCheck && healthCheckEntryInputs()}
        {formEntryType === EntryType.OccupationalHealthcare &&
          occupationalEntryInputs()}
        {formEntryType === EntryType.Hospital && hospitalEntryInputs()}

        <Grid style={{ marginTop: 10 }}>
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
