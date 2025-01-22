import express from 'express';
const app = express();

import bmi from './bmiCalculator';
import { nanCheck } from './helpers';
import { exercise } from './exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, resp) => {
  resp.send('Hello Full Stack');
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
});

app.post('/exercises', (req, resp) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target || !(daily_exercises instanceof Array)) {
    resp.status(400).json({ error: 'request parameters missing' });
    return;
  }
  if (
    nanCheck(target) ||
    daily_exercises.some(nanCheck) ||
    Number(target) < 0 ||
    daily_exercises.some((e) => Number(e) < 0)
  ) {
    resp.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = exercise(
    Number(target),
    daily_exercises.map((e) => Number(e))
  );
  resp.send(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
