const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // připojení k databázi

const secretKey = 'tajny_klic';

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Získaná data z registrace:", { username, email, password });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'Registrace proběhla úspěšně' });
  } catch (err) {
    console.error("🔥 Chyba při registraci:", err);  // ← ujisti se, že tohle tam je
    res.status(500).json({ error: 'Chyba při registraci' });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Neplatný email nebo heslo' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Neplatný email nebo heslo' });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({
      message: 'Přihlášení úspěšné',
      token,
      username: user.username
    });
  } catch (err) {
    console.error('❌ Chyba při přihlášení:', err);
    res.status(500).json({ error: 'Chyba při přihlášení' });
  }
};
