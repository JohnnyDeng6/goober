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
        "SELECT id, name, description FROM users WHERE username != '$1' ORDER BY RANDOM() LIMIT 1",
        [dontMatchUsername]
      );
    } else {
      res = await client.query("SELECT id, name, description FROM users ORDER BY RANDOM() LIMIT 1");
    }

    // { id: .., name: .., description: .. }
    return res.rows[0];
  } catch (err) {
    console.log("Couldn't get random user from database");
    return undefined;
  }
}
