import patients from '../../data/patients';
import {
  NewPatientRecord,
  PatientRecord,
  publicPatientRecord,
  Entry,
} from '../types';
import { v1 as uuid } from 'uuid';
import { assertNewEntry } from '../utils';

const getPublicPatientRecords = (): publicPatientRecord[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
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
  patients.push(newPatient);
  return newPatient;
};

const addNewEntry = (id: string, entry: unknown): Entry => {
  const patient = patients.find((e) => e.id === id);
  if (!patient) {
    throw new Error('Cannot find patient with that id');
  }
  const almostNewEntry = assertNewEntry(entry);
  const newEntry = {
    id: uuid(),
    ...almostNewEntry,
  };
  patient.entries = patient.entries.concat(newEntry);
  return newEntry as Entry;
};

export default {
  getPublicPatientRecords,
  createNewPatient,
  getSinglePatientRecord,
  addNewEntry,
};
