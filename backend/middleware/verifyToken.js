const jwt = require('jsonwebtoken');
const secretKey = 'tajny_klic'; // STEJNÝ jako při loginu

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token chybí' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;  // 👈 TOHLE JE KRITICKÉ
    console.log("🔐 Token ověřen:", decoded);
    next();
  } catch (err) {
    console.error('❌ Token chyba:', err.message);
    res.status(403).json({ error: 'Neplatný token' });
  }
};
