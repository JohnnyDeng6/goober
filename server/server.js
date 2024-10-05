import express from 'express';
import cors from 'cors';
import logger from 'morgan';

const app = express();

import { client } from './db.js';

const PORT = 8000;

app.use(logger('dev'));

app.get('/', async (req, res) => {
  try {
    const db_res = await client.query("SELECT 1");
    res.send("Success");
  } catch (err) {
    res.send("Failure");
  }
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

