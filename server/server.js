import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config(); // copies env vars in .env into process.env

import { getRandomUser } from './db.js';
import { setupOpenAI, sendInvites } from './invite.js';

setupOpenAI();

const app = express();
const PORT = 8000;

app.use(logger('dev'));

app.get('/', async (req, res) => {
  res.send("Goober API");
})

app.get('/match', async (req, res) => {
  const firstUser = await getRandomUser();

  console.log('1');
  const matchedUsers = await sendInvites(firstUser, 2, 1);

  console.log('1');

  res.send(matchedUsers);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

app.post('/send_invitations/:userid', async (req, res) => {
  const { userid } = req.param;

  

  res.send

})
