import express from 'express';
import User from '../models/user.model..js';
import authenticateToken from '../middleware/authenticate-token.js';
const router = express.Router();

router.use(authenticateToken);
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

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json(dish);

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});


/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
router.delete('/:id', async (req, res) => { 
  try {
    const  { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    
    if (!deletedUser) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'User deleted successfully',
      data: deletedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

export default router;