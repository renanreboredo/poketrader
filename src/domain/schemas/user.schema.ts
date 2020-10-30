import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: { type: Schema.Types.String, required: true },
});
