const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'akkodis_run',
  password: 'admin',  // <- tady zadej heslo, které jsi nastavil při instalaci PostgreSQL
  port: 5432,
});


module.exports = {
  query: (text, params) => pool.query(text, params),
};
