//postgres connection

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',//add your password
  host: 'localhost',
  port: 5432, // default Postgres port
});

export default pool
