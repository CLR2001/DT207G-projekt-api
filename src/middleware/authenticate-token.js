import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      error: 'Missing token',
      message: 'Access denied - missing token' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return res.status(403).json({ 
      error: 'Invalid token',
      message: 'Access denied - invalid token' 
    });

    req.user = user;
    next();
  })
}

export default authenticateToken;