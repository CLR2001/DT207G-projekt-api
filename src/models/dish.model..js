import mongoose, { mongo } from "mongoose";

const dishSchema = new mongoose.Schema({
  
}, {
  timestamps: true
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;