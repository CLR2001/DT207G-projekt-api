import mongoose, { mongo } from "mongoose";

const dishSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: { 
    type: String,
    required: true,
    trim: true
  },
  price: { 
    type: Number,
    min: [0, 'Price can not be negative'],
    required: true 
  },
  week: { 
    type: [Number],
    validate: {
      validator: function(value) {
        if (Array.isArray(value)) {
          return value.every(week => week >= 1 && week <= 52);
        }

        return false
      },
      message: 'Varje vecka måste vara mellan 1 och 52'
    },
    required: true
  },
  category: { 
    type: String,
    required: true ,
    trim: true
  }
}, {
  timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;