import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: Schema.Types.String,
  password: Schema.Types.String,
});
