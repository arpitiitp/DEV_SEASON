const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token' });
  }

  jwt.verify(token, jwt_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticate;