import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import authenticateToken from '../middleware/authenticate-token.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
router.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body.username, req.body.password);

    const payload = {_id: user._id, username: req.body.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60
    });

    res.status(200).json({
      user: user._id,
      token: token,
      message: 'Successfully logged in'
    });

  } catch (error) {
    res.status(400).json({
      error: 'Login failed',
      message: error.message,
    });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });

  res.status(200).json({ message: 'Successfully logged out' });
});

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    res.status(200).json({
      authenticated: true,
      user: req.user._id
    });
  } catch (error) {
    res.status(500).json({
      error: 'Authentication error',
      message: `Token not valid`
    });
  }
});

export default router;