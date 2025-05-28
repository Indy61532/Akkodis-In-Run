const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'akkodis_run',
  password: 'tvojeheslo',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
