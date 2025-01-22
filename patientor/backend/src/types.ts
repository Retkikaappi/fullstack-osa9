import { newPatientSchema } from './utils';
import { z } from 'zod';

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type publicPatientRecord = Omit<PatientRecord, 'ssn'>;

export type NewPatientRecord = z.infer<typeof newPatientSchema>;
