import mongoose, { mongo } from "mongoose";

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, min: [0, 'Price can not be negative'], required: true },
  week: { type: Number, min: [1, 'Week can not be less than 1'], max: [52, 'Week can not exceed 52'], required: true },
  category: { type: String, trim: true }
}, {
  timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;