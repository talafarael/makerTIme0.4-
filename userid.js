const jwt = require('jsonwebtoken');
const { secret } = require('./config');

function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const decodedData = jwt.verify(token, secret);
    const name = decodedData.id;
    req.userName = name;
    next();
  } catch (error) {
    console.error('Ошибка проверки токена:', error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Токен истек' });
    }

    return res.status(401).json({ message: 'Токен недействителен' });
  }
}

module.exports = authenticateToken;


