import express from 'express';
const app = express();

import bmi from './bmiCalculator';
import { nanCheck } from './helpers';

app.use(express.json());

app.get('/hello', (_req, resp) => {
  resp.send('Hello Full Stack');
});

app.get('/bmi', (req, resp) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    resp.status(400).json({ error: 'request is missing weight or height' });
  }
  if (nanCheck(height) || nanCheck(weight)) {
    resp.status(400).json({ error: 'weight and height should be numbers' });
  }
  if (Number(height) <= 0 || Number(weight) <= 0) {
    resp.status(400).json({ error: 'weight and height should be above 0' });
  }

  resp.send(bmi(Number(height), Number(weight)));
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
