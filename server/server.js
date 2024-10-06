import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config(); // copies env vars in .env into process.env

import { getRandomUser } from './db.js';
import { setupOpenAI, matchUser } from './match.js';

setupOpenAI();

const app = express();
const PORT = 8000;

app.use(logger('dev'));

app.get('/', async (req, res) => {
  res.send("Goober API");
})

app.get('/match', async (req, res) => {
  const firstUser = await getRandomUser();

  await matchUser(firstUser);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

