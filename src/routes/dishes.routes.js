import express from 'express';
import Dish from '../models/dish.model..js';
import authenticateToken from '../middleware/authenticate-token.js';
const router = express.Router();

router.use(authenticateToken);

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', async (req, res) => {
  const dish = await Dish.find({});
  res.json(dish);
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await Dish.findById(id);

    if (!dish) {
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
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
router.post('/save', async (req, res) => {
  try {
    const newDish = new Dish(req.body);
    const savedDish = await newDish.save();

    res.status(201).json({
      message: 'Dish saved successfully',
      data: savedDish
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: `Inputs didn't validate correctly`,
        details: error.errors 
      });
    }

    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDish = await Dish.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true
    });

    if (!updatedDish) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'Dish updated successfully',
      data: updatedDish
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: `Inputs didn't validate correctly`,
        details: error.errors 
      });
    }

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
    const deletedDish = await Dish.findByIdAndDelete(id);
    
    if (!deletedDish) {
      return res.status(404).json({
        error: 'Not found',
        message: `ID not found`
      });
    }

    res.json({
      message: 'Dish deleted successfully',
      data: deletedDish
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