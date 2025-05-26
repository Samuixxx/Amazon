const jwt = require('jsonwebtoken');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-secret';

// Durata: access 15 minuti, refresh 7 giorni
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

module.exports = { generateTokens }