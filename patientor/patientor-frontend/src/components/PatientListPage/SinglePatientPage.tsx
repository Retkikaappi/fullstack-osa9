import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WcIcon from '@mui/icons-material/Wc';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import HealingIcon from '@mui/icons-material/Healing';
import {
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import LensIcon from '@mui/icons-material/Lens';

import { Diagnosis, Patient, Entry, HealthCheckRating } from '../../types';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { useEffect, useState } from 'react';
import EntryForm from './EntryForm';

const SinglePatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const getPatient = async (id: string) => {
      const resp = await patients.getOne(id);
      setPatient(resp);
    };

    if (id) {
      getPatient(id);
    }
  }, [id]);

  if (!patient) {
    return <Typography>Bad search params</Typography>;
  }

  const findDiagnosis = (code: string): string => {
    const desc = diagnoses.find((e) => code === e.code);
    return desc ? desc.name : 'corresponding description not found.';
  };

  const findEntryIcon = (entry: Entry): React.JSX.Element => {
    switch (entry.type) {
      case 'Hospital':
        return (
          <Typography variant='subtitle2'>
            <HealingIcon />
            Regular hospital visit
          </Typography>
        );
      case 'HealthCheck':
        let color = 'white';
        switch (entry.healthCheckRating) {
          case HealthCheckRating.Healthy:
            color = 'green';
            break;
          case HealthCheckRating.LowRisk:
            color = 'yellow';
            break;
          case HealthCheckRating.HighRisk:
            color = 'orange';
            break;
          case HealthCheckRating.CriticalRisk:
            color = 'red';
            break;
          default:
            const _noHealth: never = entry.healthCheckRating;
            throw new Error(`${_noHealth} entry.healthCheckRating not handled`);
        }
        return (
          <Typography variant='subtitle2'>
            <DirectionsRunIcon />
            Regular healthcheck <LensIcon sx={{ color: color }} />
          </Typography>
        );
      case 'OccupationalHealthcare':
        return (
          <Typography variant='subtitle2'>
            <WorkIcon />
            Work visit: {entry.employerName}
          </Typography>
        );
      default:
        const _noType: never = entry;
        throw new Error(`${_noType} entry.type not handled`);
    }
  };

  const toggleForm = () => {
    setShow(!show);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h4' component='div'>
          {patient.name}
          {patient.gender === 'male' ? (
            <ManIcon />
          ) : patient.gender === 'female' ? (
            <WomanIcon />
          ) : (
            <WcIcon />
          )}
          <Button
            sx={show ? { display: 'none' } : { display: '' }}
            variant='contained'
            onClick={toggleForm}
          >
            Add an entry
          </Button>
        </Typography>

        <Typography variant='subtitle1'>ssn: {patient.ssn}</Typography>
        <Typography variant='subtitle1'>
          occupation: {patient.occupation}
        </Typography>

        <EntryForm
          patient={patient}
          diagnoses={diagnoses}
          toggleForm={toggleForm}
          show={show}
          setPatient={setPatient}
        />

        {patient.entries.map((e) => (
          <Paper
            key={e.id}
            elevation={6}
            sx={{ padding: '0.5em', marginBottom: '1em' }}
          >
            <Typography variant='h6'>{e.date}</Typography>
            {findEntryIcon(e)}
            <Typography variant='subtitle1' sx={{ fontStyle: 'italic' }}>
              {e.description}
            </Typography>
            <List dense>
              {e.diagnosisCodes &&
                e.diagnosisCodes?.map((e) => (
                  <ListItem key={e}>
                    {e} {findDiagnosis(e)}
                  </ListItem>
                ))}
            </List>
          </Paper>
        ))}
      </CardContent>
    </Card>
  );
};

export default SinglePatientPage;
