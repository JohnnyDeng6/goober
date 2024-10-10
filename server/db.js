import pg from 'pg';
const { Client } = pg;
import dotenv from 'dotenv';
dotenv.config();
import { sendInvites } from './invite.js';


const client = new Client({
  user: process.env.PSQL_USR,
  host: 'localhost',
  port: '5432',
  database: 'goober',
  password: process.env.PSQL_PW
});
await client.connect();

try {
  const res = await client.query("SELECT 'DB connection working'::text AS message");
  console.log(res.rows[0].message);
} catch (err) {
  console.log('DB connection not working');
}

export async function verifyLogin(userId, password) {
  try {
    const res = await client.query(
      "SELECT * FROM users WHERE id = $1 AND password = $2",
      [userId, password]
    );

    return res.rows.length === 1; // will be 0 if pwd is wrong
  } catch (err) {
    return false;
  }
}

export async function getInvitableUsers(hostId, numUsers, eventId) {
  try {
    const res = await client.query(
      "SELECT id, name, description FROM users u " +
      "WHERE id != $1 AND NOT EXISTS (" +
      "  SELECT * FROM invitations" +
      "  WHERE user_id = u.id AND event_id = $2" +
      ") ORDER BY RANDOM() LIMIT $3",
      [hostId, eventId, numUsers]
    );

    // [{ id: .., name: .., description: .. }, ..]
    return res.rows;
  } catch (err) {
    console.log("Couldn't get random users: " + err.toString());
  }
}

//sends invitation to a single user
export async function insertInvitation(userId, eventId, confirmed) {
  try {
    const res = await client.query(
      "INSERT INTO invitations (user_id, event_id, confirmed, expires) VALUES ($1, $2, $3, $4)",
      [userId, eventId, confirmed, "Never"]
    );
    return true;
  } catch (err) {
    console.log("Couldn't insert invitation: " + err.toString());
    return false;
  }
}

export async function selectUser(userId) {
  try {
    const res = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

    console.log(res.rows[0])
    return res.rows[0];
  } catch (err) {
    console.log("Fail: " + err.toString());
    return {};
  }
}

export async function getAllInvitations(userId) { 
  try {
    const res = await client.query("SELECT * FROM invitations WHERE user_id = $1;", [userId]);

    //merges event details into invitation
    const invitationsWithEvents = await Promise.all(
      res.rows.map(async (invitation) => {
        const eventDetails = await getEventById(invitation.event_id); 
        const { description, time, attendees, host_id, attendees_found } = eventDetails; 
        return { ...invitation, description, time, attendees, host_id, attendees_found }; 
      })
    );

    return invitationsWithEvents;
  } catch (err) {
    console.log("Couldn't get Invitations from database");
    return undefined;
  }
}

//makes new event given all params, returns id of event
export async function insertEvent(description, hostId, time, attendees, attendees_found) {
  try {
    const res = await client.query(
      "INSERT INTO events(description, host_id, time, attendees, attendees_found) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [description, hostId, time, attendees, attendees_found]
    );

    return res.rows[0].id;
  } catch (err) {
    console.log('insertevent: ' + err.toString());
  }
}

export async function registerUser({ id, name, description, password }) {
  try {
    const insertQuery = `INSERT INTO users(id, name, description, password) VALUES ($1, $2, $3, $4)`;
    await client.query(insertQuery, [id, name, description, password]);
    return { success: true };
  } catch (error) {
    console.error('Error in registerUser:', error);
    return { success: false, message: error.toString() };
  }
}

export async function updateProfile(user_id, {name, description, password}) {
  try {
    await client.query(
      "UPDATE users SET name = $1, description = $2, password = $3 WHERE id = $4",
      [name, description, password, user_id]);
    return { success: true };
  } catch (error) {
    console.error('Error in updateProfile:', error);
    return { success: false, message: error.toString() };

  } 
}

export async function getAllEvents(userId) { 
  try {
    const res = await client.query("SELECT * FROM events WHERE host_id = $1;", [userId]);
    return res.rows;
  }  catch (err) {
    console.log("Couldn't get Invitations from database");
    return undefined;
  }
}

export async function getEventById(eventId) { 
  try {
    const res = await client.query("SELECT * FROM events WHERE id = $1;", [eventId]);
    return res.rows[0];
  }  catch (err) {
    console.log("Couldn't get event from database");
    return undefined;
  }
}


export async function deleteInvitationByEventId(eventId, userId) {
  try {
    client.query("DELETE FROM invitations WHERE event_id = $1 AND user_id = $2", [eventId, userId])
    client.query("UPDATE events SET attendees_found = attendees_found - 1 WHERE id = $1", [eventId])
  } catch (err) {
    console.error('Error in rejecting invitation:', err);
  }
}

export async function acceptInvitationByEventId(eventId, userId) {
  try {
    client.query("UPDATE invitations SET confirmed = 't' WHERE event_id = $1 AND user_id = $2", [eventId, userId])
    client.query("UPDATE events SET attendees_found = attendees_found + 1 WHERE id = $1", [eventId])
  } catch (err) {
    console.error('Error in rejecting invitation:', err);
  }
}

export async function cancelEvent(eventId, userid) {
  try {
    const event = await client.query("SELECT * FROM events WHERE id = $1;", [eventId]);
    // console.log(event.rows[0].host_id)
    // console.log(userid)
    if (event.rows[0].host_id == userid) { //if user id host
      client.query("DELETE FROM invitations WHERE event_id = $1", [eventId])
      client.query("DELETE FROM events WHERE id = $1", [eventId])
    } else { //if user is attendee
      console.log("not host")
      deleteInvitationByEventId(eventId, userid);
      const host = await getHostByEventId(eventId)
      await sendInvites(host, 1, eventId);
    }
  } catch (err) {
    console.error('Error in cancelling event:', err);

  }
}

export async function getHostByEventId(eventId) {
  try {
    const event = await client.query("SELECT * FROM events WHERE id = $1;", [eventId]);
    const hostId = event.rows[0].host_id;
    const host = selectUser(hostId);
    return host;

  } catch (err) {
    console.error('Error getting HostId:', err);
  }

}