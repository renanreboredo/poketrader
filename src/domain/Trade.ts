import { Document } from 'mongoose';
import { Pokemon } from './Pokemon';

export interface Trade extends Document {
  userID: string;
  pokemonsIn: Pokemon[];
  pokemonsOut: Pokemon[];
  createdOn: Date;
}
