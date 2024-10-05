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

export { client };
