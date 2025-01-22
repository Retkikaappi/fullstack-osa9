import express from 'express';
import patientService from '../services/patientService';
import validatePatient from '../utils';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(patientService.getPublicPatientRecords());
});

router.post('/', (req, resp) => {
  try {
    const validatedPatient = validatePatient(req.body);
    const addedPatient = patientService.createNewPatient(validatedPatient);
    resp.json(addedPatient);
  } catch (error: unknown) {
    let errMsg = 'unknown error';
    if (error instanceof Error) {
      errMsg = error.message;
    }
    resp.status(400).send(errMsg);
  }
});

export default router;
