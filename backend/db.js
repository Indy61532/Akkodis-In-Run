const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://akkodis_user:aiXWtWxkQScREal7TJlhH1h3bMp7jwO2@dpg-d0sd1tili9vc73csjf60-a.oregon-postgres.render.com/akkodis_db',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
