const db = require('../db');

// Přidání nového běhu
exports.addRun = async (req, res) => {
  const { user_id, distance_km, run_time, run_date, route_image } = req.body;

  try {
    await db.query(
      `INSERT INTO runs (user_id, distance_km, run_time, run_date, route_image) 
       VALUES ($1, $2, $3, $4, $5)`,
      [user_id, distance_km, run_time, run_date, route_image]
    );
    res.status(201).json({ message: 'Běh uložen.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při ukládání běhu' });
  }
};

// Získání všech běhů (např. pro žebříček)
exports.getAllRuns = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT runs.*, users.username 
       FROM runs JOIN users ON runs.user_id = users.id 
       ORDER BY run_date DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při načítání běhů' });
  }
};

// Získání běhů pro konkrétního uživatele
exports.getUserRuns = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM runs WHERE user_id = $1 ORDER BY run_date DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Chyba při načítání uživatelských běhů' });
  }
};
