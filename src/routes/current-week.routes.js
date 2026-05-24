import express from 'express';
import Setting from '../models/current-week.model.js';
import authenticateToken from '../middleware/authenticate-token.js';
import { getSimplifiedDetails } from '../utils/get-simplified-data.js';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/current-week', authenticateToken, async (req, res) => {
  try {
    const { week } = req.body;

    if (!week || Number.isNaN(Number(week))) {
      return res.status(400).json({ 
        error: 'Validation error',
        message: 'Inmatningarna validerades inte korrekt',
        details: { week: 'Vecka måste vara ett giltligt nummer' }
      });
    }

    const updatedSetting = await Setting.findOneAndUpdate(
      { key: 'current_week' },
      { value: Number(week) },
      { new: true, upsert: true }
    );

    res.status(200).json({ 
      message: 'Aktiv vecka har uppdaterats', 
      currentWeek: updatedSetting.value 
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
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/current-week', authenticateToken, async (req, res) => {
  try {

    const setting = await Setting.findOne({key: 'current_week'});

    res.status(200).json({  
      currentWeek: setting ? setting.value : 1 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message 
    });
  }
});

export default router;