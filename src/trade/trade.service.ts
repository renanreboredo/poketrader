import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { Pokemon } from 'src/domain/Pokemon';

@Injectable()
export class TradeService {
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
}
