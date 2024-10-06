import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config(); // copies env vars in .env into process.env

import { verifyLogin, selectUser, getAllInvitations } from './db.js';
import { setupOpenAI, sendInvites } from './invite.js';

setupOpenAI();

const app = express();
app.use(cors());
const PORT = 8000;

async function authenticate(req, res, next) {
  if (await verifyLogin(req.query.user, req.query.pwd)) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
}

app.use(logger('dev'));

app.get('/api/', async (req, res) => {
  res.send("Goober API");
})

// GET /api/invite?user=user_id&pwd=password&amount=amnt&event=event_id
app.get('/api/invite', authenticate, async (req, res) => {
  try {
    const numInvites = req.query.amount;
    const eventId = req.query.event;

    if (!numInvites || !eventId) {
      res.status(400).send("Bad request");
      return;
    }

    const targetUser = await selectUser(req.query.user);
    const invitedUsers = await sendInvites(targetUser, numInvites, eventId);

    res.status(200).send(invitedUsers);
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})

// GET /api/send_invitations?user=user_id
app.get('/api/get_invitations', authenticate, async (req, res) => {
    try {
      const user = req.query.user; 
      const invitations = await getAllInvitations(user);
      res.send(invitations)
    } catch (err) {
      res.status(500).send(err.toString());
    }
})
