const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'No token provided or malformed token',
    });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET || 'yourSecretKey');
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

module.exports = authMiddleware;
