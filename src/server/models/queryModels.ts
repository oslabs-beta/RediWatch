import { Pool } from 'pg';

const PG_URI = process.env.DATABASE_URL;

// Create a new pool using the connection string
const pool = new Pool({
  connectionString: PG_URI
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
module.exports = {
  connect: () => pool.connect(),
  query: (text: string, params: (string | number)[]) => {
    console.log('executed query', text, params);
    return pool.query(text, params);
  }
};
