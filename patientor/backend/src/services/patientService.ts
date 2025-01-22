import patients from '../../data/patients';
import { publicPatientRecord } from '../types';

const getPublicPatientRecords = (): publicPatientRecord[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default { getPublicPatientRecords };
