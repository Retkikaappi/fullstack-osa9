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

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type publicPatientRecord = Omit<PatientRecord, 'ssn' | 'entries'>;

export type NewPatientRecord = z.infer<typeof newPatientSchema>;
