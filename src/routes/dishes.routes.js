import express from 'express';
import Dish from '../models/dish.model.js';
import authenticateToken from '../middleware/authenticate-token.js';
import { getSimplifiedDetails } from '../utils/get-simplified-data.js';
import Setting from '../models/current-week.model.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                 PUBLIC GET                                 */
/* -------------------------------------------------------------------------- */
router.get('/current-week', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: 'current_week' });
    const currentWeek = setting ? setting.value : 1;

    const dishes = await Dish.find({
      $or: [
        { week: currentWeek },
        { week: { $size: 0 } }
      ]
    });

    res.status(200).json(dishes);

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error', 
      message: error.message });
  }
});

router.use(authenticateToken);

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
        message: `Inmatningarna validerades inte korrekt`,
        details: getSimplifiedDetails(error)
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Duplicate error', 
        message: 'En maträtt med det här namnet finns redan registrerad.',
        details: error.keyValue
      });
    }

    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

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
        message: `Hittade inte ID:t`
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
        message: `Hittade inte ID:t`
      });
    }

    res.json({
      message: 'Rätten har uppdaterats',
      data: updatedDish
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error',
        message: `Inmatningarna validerades inte korrekt`,
        details: getSimplifiedDetails(error)
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
        message: `Hittade inte ID:t`
      });
    }

    res.json({
      message: 'Rätten borttagen',
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