import express, { Request, Response, NextFunction } from 'express';
import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';
import { z } from 'zod';
import { NewPatientRecord } from '../types';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(patientService.getPublicPatientRecords());
});

const patientHandler = (req: Request, _resp: Response, next: NextFunction) => {
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorHandler = (
  error: unknown,
  _req: Request,
  resp: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    // voisi vääntää error.issues[0].message jotta viesti näyttäisi paremmalta frontissa, mutta ole vaivan arvoista
    resp.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  '/',
  patientHandler,
  (req: Request<unknown, unknown, NewPatientRecord>, resp: Response) => {
    const addedPatient = patientService.createNewPatient(req.body);
    resp.json(addedPatient);
  }
);

router.get('/:id', (req, resp) => {
  const { id } = req.params;
  resp.send(patientService.getSinglePatientRecord(id));
});

router.post('/:id/entries', (req, resp) => {
  const { id } = req.params;
  const newEntry = patientService.addNewEntry(id, req.body);
  resp.send(newEntry);
});

router.use(errorHandler);

export default router;
