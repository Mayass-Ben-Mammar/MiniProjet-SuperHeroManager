import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<User>('User', UserSchema);
