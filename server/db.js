import pg from 'pg';
const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: '5432',
  database: 'goober'
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

export async function insertInvitation(userId, eventId, confirmed) {
  try {
    const res = await client.query(
      "INSERT INTO invitations (user_id, event_id, confirmed, expires) VALUES ($1, $2, $3, $4)",
      [userId, eventId, confirmed, "Never"]
    );
    return true;
  } catch (err) {
    //console.log("Couldn't insert invitation: " + err.toString());
    return false;
  }
}

export async function selectUser(userId) {
  try {
    const res = await client.query("SELECT * FROM users WHERE id = $1", [userId]);

    return res.rows[0];
  } catch (err) {
    console.log("Fail: " + err.toString());
    return {};
  }
}

export async function getAllInvitations(userId) { 
  try {
    let res;

    res = await client.query(
      "SELECT * FROM invitations WHERE user_id = '$1"
      [userId]
    );
    console.log(res);
    return res;
  } catch (err) {
    console.log("Couldn't get Invitations from database");
    return undefined;
  }
}

export async function insertEvent(description, hostId, time) {
  try {
    const res = await client.query(
      "INSERT INTO events(description, host_id, time) VALUES ($1, $2, $3) RETURNING id",
      [description, hostId, time]
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