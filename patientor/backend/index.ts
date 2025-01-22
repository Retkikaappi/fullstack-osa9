import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/ping', (_req, resp) => {
  console.log('ping');
  resp.send('pong');
  return;
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
