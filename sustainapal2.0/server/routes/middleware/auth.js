const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // For development/testing without authentication
    if (process.env.NODE_ENV === 'development' && process.env.SKIP_AUTH === 'true') {
      req.user = { id: 'test-user-id' };
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};