import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WcIcon from '@mui/icons-material/Wc';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patients from '../../services/patients';
import { useEffect, useState } from 'react';

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);

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
  console.log(id);
  console.log(patient);
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
        </Typography>

        <Typography variant='subtitle1'>ssn: {patient.ssn}</Typography>
        <Typography variant='subtitle1'>
          occupation: {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SinglePatientPage;
