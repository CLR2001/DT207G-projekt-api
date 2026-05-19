import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if(this.isNew || this.isModified('password')) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw error
    }
  }
});

userSchema.statics.register = async function(username, email, password) {
  const user = new this({ username, email, password });
  await user.save();
  return user;
};

userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ $or: [{ username }, { email: username }] });

  if(!user) throw new Error("Incorrect username or password");

  const correctPassword = await bcrypt.compare(password, user.password);
  
  if(!correctPassword) throw new Error("Incorrect username or password");

  return user;
}

const User = mongoose.model('User', userSchema);

export default User;