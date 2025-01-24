import { useEffect, useState } from 'react';
import {
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
  Patient,
} from '../../types';
import {
  TextField,
  Button,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Typography,
} from '@mui/material';
import patientService from '../../services/patients';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AxiosError } from 'axios';

interface Props {
  diagnoses: Diagnosis[];
  show: boolean;
  patient: Patient;
  toggleForm: () => void;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

interface NewEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  healthCheckRating?: HealthCheckRating;
  employerName?: string;
  sickLeave?: SickLeave;
  discharge?: Discharge;
}

const EntryForm = ({
  diagnoses,
  show,
  patient,
  setPatient,
  toggleForm,
}: Props) => {
  const [type, setType] = useState<NewEntry['type']>('HealthCheck');
  const [error, setError] = useState<string | null>(null);

  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [rating, setRating] = useState<string | number>(0);

  const [dischargeReason, setDischargeReason] = useState<string>('');
  const [dischargeDay, setDischargeDay] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    const notif = setTimeout(() => {
      setError(null);
    }, 5000);
    return () => clearTimeout(notif);
  }, [error]);

  if (!show) {
    return null;
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let obj: NewEntry = {
      description,
      date: String(dayjs().format('YYYY-MM-DD')),
      specialist,
      diagnosisCodes,
      type: type as 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital',
    };

    setDescription('');
    setSpecialist('');
    setDiagnosisCodes([]);
    switch (type) {
      case 'HealthCheck':
        obj = {
          ...obj,
          type,
          healthCheckRating: rating as HealthCheckRating,
        };
        setRating(0);
        break;
      case 'OccupationalHealthcare':
        obj = {
          ...obj,
          type,
          employerName: patient.occupation,
          sickLeave: {
            startDate: String(startDate?.format('YYYY-MM-DD')),
            endDate: String(endDate?.format('YYYY-MM-DD')),
          },
        };
        setStartDate(dayjs());
        setEndDate(dayjs());
        break;
      case 'Hospital':
        obj = {
          ...obj,
          discharge: {
            date: String(dischargeDay?.format('YYYY-MM-DD')),
            criteria: dischargeReason,
          },
        };
        setDischargeDay(dayjs());
        setDischargeReason('');
        break;
      default: {
        const _notype: never = type;
        throw new Error(`type case unhandled: ${_notype}`);
      }
    }
    try {
      const resp = await patientService.addEntry(patient.id, obj);
      const newPatient = {
        ...patient,
        entries: patient.entries.concat(resp),
      };
      setPatient(newPatient);
      setType('HealthCheck');
      toggleForm();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        let errMsg = 'unknown error';
        if ('response' in error && error.response) {
          errMsg = error.response.data.error;
          setError(`Error: ${error.response.data.error}`);
        }
        setError(`error: ${errMsg}`);
      }
      console.log('error', error);
    }
  };

  const check = () => (
    <FormControl style={{ margin: '1em' }}>
      <InputLabel id='rate'>Rating</InputLabel>
      <Select
        value={rating}
        onChange={({ target }) => setRating(target.value)}
        label='Rating'
        labelId='rate'
      >
        <MenuItem value={0}>Healthy</MenuItem>
        <MenuItem value={1}>Low risk</MenuItem>
        <MenuItem value={2}>High risk</MenuItem>
        <MenuItem value={3}>Critical risk</MenuItem>
      </Select>
    </FormControl>
  );

  const occupation = () => (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Start date'
          value={startDate}
          onChange={(value) => setStartDate(value)}
          minDate={dayjs()}
        />
        <DatePicker
          label='End date'
          value={endDate}
          onChange={(value) => setEndDate(value)}
          minDate={startDate || dayjs()}
        />
      </LocalizationProvider>
    </div>
  );

  const hospital = () => (
    <FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Discharge day'
          value={dischargeDay}
          onChange={(value) => setDischargeDay(value)}
          minDate={dayjs()}
        />
        <TextField
          sx={{ marginY: '0.5em' }}
          label='Discharge reason'
          value={dischargeReason}
          onChange={({ target }) => setDischargeReason(target.value)}
        />
      </LocalizationProvider>
    </FormControl>
  );

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert variant='filled' severity='error'>
          {error}
        </Alert>
      )}
      <FormControl sx={{ marginY: '1em' }}>
        <div>
          Healthcheck
          <Radio
            value='HealthCheck'
            name='type'
            checked={type === 'HealthCheck'}
            onChange={() => setType('HealthCheck')}
          />
          Occupational healthcare
          <Radio
            value='OccupationalHealthcare'
            name='type'
            checked={type === 'OccupationalHealthcare'}
            onChange={() => setType('OccupationalHealthcare')}
          />
          Hospital
          <Radio
            value='Hospital'
            name='type'
            checked={type === 'Hospital'}
            onChange={() => setType('Hospital')}
          />
        </div>

        <TextField
          sx={{ marginY: '0.5em' }}
          label='Description'
          value={description}
          required
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          sx={{ marginY: '0.5em' }}
          label='Specialist'
          value={specialist}
          required
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <Typography variant='subtitle1'>Diagnosis codes:</Typography>
        <Select
          sx={{ marginBottom: '3em' }}
          multiple
          value={diagnosisCodes}
          onChange={({ target }) => {
            setDiagnosisCodes(
              typeof target.value === 'string'
                ? target.value.split(', ')
                : target.value
            );
          }}
          renderValue={(e) => `${e.length} - Diagnosis codes selected`}
        >
          {diagnoses.map((e) => (
            <MenuItem key={e.code} value={e.code}>
              {e.code} {e.name}
            </MenuItem>
          ))}
        </Select>

        {type === 'HealthCheck'
          ? check()
          : type === 'OccupationalHealthcare'
          ? occupation()
          : type === 'Hospital'
          ? hospital()
          : null}

        <Button
          type='submit'
          variant='contained'
          sx={{ backgroundColor: 'green', marginY: '0.5em' }}
        >
          Submit
        </Button>

        <Button
          variant='contained'
          sx={{ backgroundColor: 'red', marginY: '0.5em' }}
          onClick={toggleForm}
        >
          Cancel
        </Button>
      </FormControl>
    </form>
  );
};

export default EntryForm;
