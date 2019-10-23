import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
});

export default mongoose.model('user', userSchema);