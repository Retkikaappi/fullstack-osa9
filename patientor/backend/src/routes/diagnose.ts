import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, resp) => {
  resp.send(diagnoseService.getDiagnoses());
});

export default router;
