import { Diagnosis, Gender, NewEntryRecord } from './types';
import { z } from 'zod';

export const newPatientSchema = z.object({
  name: z.string(),
  ssn: z.string(),
  dateOfBirth: z.string().date(),
  gender: z.nativeEnum(Gender, {
    message: 'gender should be: male, female or other',
  }),
  occupation: z.string(),
});

const bareEntrySchema = z.object({
  date: z.string().date(),
  specialist: z.string(),
  description: z.string(),
});

const healthCheckSchema = bareEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.number().min(0).max(3),
});

const occupationSchema = bareEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.string().date(),
      endDate: z.string().date(),
    })
    .optional(),
});

const hospitalSchema = bareEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().date(),
    criteria: z.string(),
  }),
});

export const newEntrySchema = z.discriminatedUnion('type', [
  healthCheckSchema,
  hospitalSchema,
  occupationSchema,
]);

export const removeDiagnosis = (entry: unknown): Array<Diagnosis['code']> => {
  if (!entry || typeof entry !== 'object') {
    throw new Error(`entry is malformatted`);
  }
  if (!('diagnosisCodes' in entry)) {
    return [] as Array<Diagnosis['code']>;
  }
  return entry.diagnosisCodes as Array<Diagnosis['code']>;
};

export const assertNewEntry = (object: unknown): NewEntryRecord => {
  const entry = newEntrySchema.parse(object);
  const newEntry = {
    ...entry,
    diagnosisCodes: removeDiagnosis(object),
  };
  return newEntry;
};
