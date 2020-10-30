import { Schema } from 'mongoose';

export const TradeSchema = new Schema({
  userID: Schema.Types.ObjectId,
  pokemonsIn: Schema.Types.Array,
  pokemonsOut: Schema.Types.Array,
  createdOn: Schema.Types.Date,
});
