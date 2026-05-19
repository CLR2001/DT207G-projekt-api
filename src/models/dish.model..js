import mongoose, { mongo } from "mongoose";

const dishSchema = new mongoose.Schema({
  
}, {
  timestamps: true
});

const Dish = mongoose.model('dish', dishSchema);

export default Dish;