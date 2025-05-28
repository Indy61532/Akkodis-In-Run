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
    await db.query(
      'INSERT INTO runs (user_id, distance_km, run_time, run_date, route_image) VALUES ($1, $2, $3, $4, $5)',
      [userId, distance_km, run_time, run_date, route_image]
    );
    res.status(201).json({ message: 'Běh uložen' });
  } catch (err) {
    console.error('❌ Chyba při ukládání běhu:', err);
    res.status(500).json({ error: 'Chyba při ukládání běhu' });
  }
};
