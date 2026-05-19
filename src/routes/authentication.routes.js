import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import authenticateToken from '../middleware/authenticate-token.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
router.post('/register', async (req, res) => {
  try {
    const user = await User.register(req.body.username, req.body.email, req.body.password);

    res.status(200).json({
      user: user._id,
      message: 'Successfully registered'
    });
    
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Conflict', 
        message: 'Username or Email already exists' 
      });

    } else {
      res.status(400).json({
        error: 'Registration failed',
        message: error.message,
      });
    }
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body.username, req.body.password);

    const payload = {_id: user._id, username: req.body.username}
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});

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