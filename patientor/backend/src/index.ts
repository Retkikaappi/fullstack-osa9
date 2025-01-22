import express from 'express';
import cors from 'cors';
import diagnoseRouter from './routes/diagnose';
import patientRouter from './routes/patient';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, resp) => {
  console.log('ping');
  resp.send('pong');
  return;
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
