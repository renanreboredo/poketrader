import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isEmpty } from 'lodash';
import { Model } from 'mongoose';
import { Pokemon } from '../domain/Pokemon';
import { Trade } from '../domain/Trade';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel('Trade') private readonly tradeModel: Model<Trade>,
  ) {}

  async isFairTrade(
    pokemonsFromPlayer1: Pokemon[],
    pokemonsFromPlayer2: Pokemon[],
  ): Promise<boolean> {
    if (isEmpty(pokemonsFromPlayer1) || isEmpty(pokemonsFromPlayer2))
      return false;
    const player1Score = this.calculatePlayerTradeScore(pokemonsFromPlayer1);
    const player2Score = this.calculatePlayerTradeScore(pokemonsFromPlayer2);
    const score =
      player2Score > player1Score
        ? player1Score / player2Score
        : player2Score / player1Score;
    return Number((1 - score).toFixed(2)) <= 0.05;
  }

  calculatePlayerTradeScore(pokemons: Pokemon[]) {
    return pokemons.reduce(
      (acc: number, pokemon: Pokemon) => acc + pokemon.baseExperience,
      0,
    );
  }

  async makeTrade(
    pokemonsFromPlayer1: Pokemon[],
    pokemonsFromPlayer2: Pokemon[],
    userID: string,
  ) {
    if (pokemonsFromPlayer1.length > 6 || pokemonsFromPlayer2.length > 6) {
      return {
        error: true,
        message: 'Trade must have 6 pokemons maximum'
      };
    }
    const isFairTrade = await this.isFairTrade(
      pokemonsFromPlayer1,
      pokemonsFromPlayer2,
    );
    if (!isFairTrade) {
      return {
        error: true,
        message: 'Trade must be fair'
      };
    }

    const trade = new this.tradeModel({
      userID,
      pokemonsIn: pokemonsFromPlayer2,
      pokemonsOut: pokemonsFromPlayer1,
      createdOn: new Date(),
    });

    return await trade.save();
  }

  async history(userID: string) {
    const tradeHistory = await this.tradeModel.find({ userID }).sort('-createdOn');
    if (isEmpty(tradeHistory)) {
      return {
        error: true,
        message: 'No trade history for this user'
      }
    }
    return tradeHistory;
  }
}
