import express from 'express';
import cors from 'cors';
import logger from 'morgan';

import dotenv from 'dotenv';
dotenv.config(); // copies env vars in .env into process.env

import * as db from './db.js';
import { setupOpenAI, sendInvites } from './invite.js';

setupOpenAI();

const app = express();
app.use(cors());
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


// POST /api/register
app.post('/api/register', async (req, res) => {
  const { id, name, description, password } = req.body;

  if (!id || !name || !description || !password) {
    return res.status(400).send('All fields are required.');
  }

  const result = await db.registerUser({ id, name, description, password });

  if (result.success) {
    res.status(201).send({ message: 'User registered successfully!' });
  } else {
    res.status(500).send({ message: 'Registration failed.', error: result.message });
  }
});

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: 'Please provide both user ID and password.' });
  }

  try {
    const isValid = await db.verifyLogin(userId, password);
    
    if (isValid) {
      return res.status(200).json({ message: 'Login successful!' });
    } else {
      return res.status(401).json({ message: 'Invalid ID or password.' });
    }
  } catch (error) {
    console.error('Error verifying login:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
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


// GET /api/send_invitations?user=user_id
app.get('/api/get_invitations/:user_id', async (req, res) => {
    try {
      const user_id = req.params['user_id'];
      console.log(user_id)

      const invitations = await db.getAllInvitations(user_id)

      // [{ id: .., event_id: .., confirmed: .., expires: .. },[..]]
      res.send(invitations)

    } catch (err) {
      res.status(500).send(err.toString());
    }
})

app.get('/api/get_userdata/:user_id', async (req, res) => {
    try {
      const user_id = req.params['user_id'];
      console.log(user_id)

      const userData = await db.selectUser(user_id)

      // [{ id: .., name: .., desciption: .., password: .. }]
      console.log(userData)
      res.send(userData)

    } catch (err) {
      res.status(500).send(err.toString());
    }
})
// const apiUrl = process.env.REACT_APP_BACKEND_API + '/api/edit_user/' + user.id;
app.put('/api/edit_user/:user_id', async (req, res) => {
  try {
    const { name, description, password } = req.body;
    const user_id = req.params['user_id'];

    if (!name || !description || !password) {
      return res.status(400).send('All fields are required.');
    }

    await db.updateProfile(user_id, { name, description, password});

  } catch (err) {
      console.log("server:")
      res.status(500).send(err.toString());
  }

})
