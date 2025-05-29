const db = require('../db');

exports.addRun = async (req, res) => {
  console.log("💬 Token decode:", req.userId);

  const { distance_km, run_time, run_date, route_image } = req.body;
  const userId = req.userId;

  if (!userId) {
    console.log("❌ userId je undefined/null");
    return res.status(400).json({ error: 'Token neobsahuje userId' });
  }

  try {
    // Převod hodinového čísla na INTERVAL
    const hours = Math.floor(run_time);
    const minutes = Math.round((run_time - hours) * 60);
    const intervalTime = `${hours} hours ${minutes} minutes`;

    await db.query(
      'INSERT INTO runs (user_id, distance_km, run_time, run_date, route_image) VALUES ($1, $2, $3::interval, $4, $5)',
      [userId, distance_km, intervalTime, run_date, route_image]
    );

    res.status(201).json({ message: 'Běh uložen' });
  } catch (err) {
    console.error('❌ Chyba při ukládání běhu:', err);
    res.status(500).json({ error: 'Chyba při ukládání běhu' });
  }
};


exports.getUserRuns = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await db.query(`
      SELECT 
        TO_CHAR(run_date, 'YYYY-MM-DD') AS run_date,
        ROUND(EXTRACT(EPOCH FROM run_time) / 3600.0, 2)::TEXT || ' h' AS run_time,
        distance_km
      FROM runs
      WHERE user_id = $1
      ORDER BY distance_km DESC
      LIMIT 5
    `, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Chyba při načítání běhů:', err);
    res.status(500).json({ error: 'Chyba při načítání běhů' });
  }
};




exports.getStats = async (req, res) => {
  const userId = req.userId;

  try {
    const result = await db.query(`
      SELECT 
        COUNT(*) AS total_runs,
        SUM(distance_km) AS total_distance,
        SUM(EXTRACT(EPOCH FROM run_time)) AS total_seconds
      FROM runs
      WHERE user_id = $1
    `, [userId]);

    const stats = result.rows[0];
    const totalHours = (stats.total_seconds / 3600).toFixed(1);

    res.json({
      totalRuns: stats.total_runs,
      totalDistance: stats.total_distance,
      totalTime: totalHours
    });
  } catch (err) {
    console.error('❌ Chyba při načítání statistik:', err);
    res.status(500).json({ error: 'Chyba při načítání statistik' });
  }
};

exports.getTopRunners = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT u.username, COUNT(r.id) AS runs_count, SUM(r.distance_km) AS total_distance
      FROM users u
      JOIN runs r ON u.id = r.user_id
      GROUP BY u.username
      ORDER BY total_distance DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Chyba při načítání top běžců:', err);
    res.status(500).json({ error: 'Chyba při načítání top běžců' });
  }
};
