import patients from '../../data/patients';
import { NewPatientRecord, PatientRecord, publicPatientRecord } from '../types';
import { v1 as uuid } from 'uuid';

const getPublicPatientRecords = (): publicPatientRecord[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getSinglePatientRecord = (id: string): PatientRecord => {
  const patient = patients.find((e) => e.id === id);
  if (!patient) throw new Error('could not find requested patient');

  return patient;
};

const createNewPatient = (patient: NewPatientRecord): PatientRecord => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };
  console.log('new patient', newPatient);
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPublicPatientRecords,
  createNewPatient,
  getSinglePatientRecord,
};
