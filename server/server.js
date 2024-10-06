import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config(); // copies env vars in .env into process.env

import * as db from './db.js';
import { setupOpenAI, sendInvites } from './invite.js';

setupOpenAI();

const app = express();
app.use(express.json());
app.use(logger('dev'));
const PORT = 8000;

async function authenticate(req, res, next) {
  try {
    if (await db.verifyLogin(req.query.user, req.query.pwd)) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(500).send(err.toString());
  }
}

app.get('/api/', async (req, res) => {
  res.send("Goober API");
})

app.get('/api/auth_check', authenticate, async (req, res) => {
  res.status(200).send("Authorized");
});

// GET /api/invite?user=user_id&pwd=password&amount=amnt&event=event_id
app.get('/api/invite', authenticate, async (req, res) => {
  const numInvites = req.query.amount;
  const eventId = req.query.event;

  if (!numInvites || !eventId) {
    res.status(400).send("Bad request");
    return;
  }

  const targetUser = await db.selectUser(req.query.user);
  const invitedUsers = await sendInvites(targetUser, numInvites, eventId);

  res.status(200).send(invitedUsers);
});

// POST /api/create_event?user=user_id&pwd=password
// (body should be JSON)
// {
//   "description": "...",
//   "time": "..."
// }
app.post('/api/create_event', authenticate, async (req, res) => {
  const data = req.body;

  const description = data.description;
  const time = data.time;

  const eventId = await db.insertEvent(description, req.query.user, time);

  if (eventId) {
    res.status(200).send({
      id: eventId,
      host_id: req.query.user,
      description: description,
      time: time
    });
  } else {
    res.status(500).send("Failed");
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})
