import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import WcIcon from '@mui/icons-material/Wc';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';

const SinglePatientPage = ({ patients }: { patients: Patient[] }) => {
  const { id } = useParams();
  const patient = patients.find((e) => e.id === id);

  if (!patient) {
    return null;
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
