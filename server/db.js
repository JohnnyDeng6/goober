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

export async function getRandomUser(dontMatchUsername) {
  try {
    let res;

    if (dontMatchUsername) {
      res = await client.query(
        "SELECT id, name, description FROM users WHERE id != $1 ORDER BY RANDOM() LIMIT 1",
        [dontMatchUsername]
      );
    } else {
      res = await client.query("SELECT id, name, description FROM users ORDER BY RANDOM() LIMIT 1");
    }

    // { id: .., name: .., description: .. }
    return res.rows[0];
  } catch (err) {
    console.log("Couldn't get random user: " + err.toString());
  }
}

export async function insertInvitation(userId, eventId, confirmed) {
  try {
    const res = await client.query(
      "INSERT INTO invitations (user_id, event_id, confirmed, expires) VALUES ($1, $2, $3, $4)",
      [userId, eventId, confirmed, "Never"]
    );
  } catch (err) {
    console.log("Couldn't insert invitation: " + err.toString());
    throw new Error("Probably a foreign key collision");
  }
}

export async function isOKToInvite(userId, eventId) {
  try {
    const res = await client.query(
      "SELECT * FROM invitations WHERE user_id = $1 AND event_id = $2",
      [userId, eventId]
    );

    return res.rows.length;
  } catch (err) {
    return 0;
  }
}

export async function numPossibleInvites(eventId) {
  try {
    const res = await client.query(
      "SELECT count(*) - (" +
      "  SELECT count(*) FROM invitations WHERE event_id = $1" +
      ") AS num FROM users",
      [eventId]
    );

    return res.rows[0].num;
  } catch (err) {
    console.log(err.toString());
    return 0;
  }
}
