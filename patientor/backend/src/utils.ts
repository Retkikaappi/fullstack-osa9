import { Gender } from './types';
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
