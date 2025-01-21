import express from 'express';
const app = express();

import bmi from './bmiCalculator';
import { nanCheck } from './helpers';

app.use(express.json());

app.get('/hello', (_req, resp) => {
  resp.send('Hello Full Stack');
  return;
});

app.get('/bmi', (req, resp) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    resp.status(400).json({ error: 'request is missing weight or height' });
    return;
  }
  if (nanCheck(height) || nanCheck(weight)) {
    resp.status(400).json({ error: 'weight and height should be numbers' });
    return;
  }
  if (Number(height) <= 0 || Number(weight) <= 0) {
    resp.status(400).json({ error: 'weight and height should be above 0' });
    return;
  }

  resp.send(bmi(Number(height), Number(weight)));
  return;
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
