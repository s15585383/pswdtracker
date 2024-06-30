const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + '?ss1mode=require',
});

pool.connect((err) => {
  if (err) throw err;
  console.log('connected to PostgreSQL successfully!');
});

module.exports = pool;
