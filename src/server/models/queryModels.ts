const { Pool } = require('pg');

const PG_URI = 'postgres://nenunvau:5sN2jTxq2AbK2OkLRtqJDzfu_I4NFeDG@fanny.db.elephantsql.com/nenunvau';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text:string, params:(string|number)[]) => {
    console.log('executed query', text, params);
    return pool.query(text, params);
  }
};
