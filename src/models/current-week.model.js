import mongoose, { mongo } from "mongoose";

const settingSchema = new mongoose.Schema({
  key: { 
    type: String,
    required: true, 
    unique: true, 
    default: "current_week"
  },
  value: {
    type: Number, 
    required: true, 
    min: 1, 
    max: 52
  }
}, {
  timestamps: true
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;