const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided or malformed token',
    });
  }

  const token = authHeader.split(' ')[1];
console.log("TOKEN:", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yourSecretKey');
    req.user = decoded;
    console.log("DECODED USER:", decoded);
    next();
  } catch (error) {
    console.error('JWT Error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = authMiddleware;
