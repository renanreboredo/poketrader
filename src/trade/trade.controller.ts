import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PokeapiService } from '../pokeapi/pokeapi.service';
import { TradeService } from './trade.service';
import { Pokemon } from 'src/domain/Pokemon';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('trade')
export class TradeController {
  constructor(
    private pokeapiService: PokeapiService,
    private tradeService: TradeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('generation')
  async generations() {
    const data = await this.pokeapiService.generations();
    return {
      data,
      message: 'Success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('generation/:id/pokemon')
  async pokemonsFromGeneration(@Param('id') id: number) {
    const data = await this.pokeapiService.pokemonsFromGeneration(id);
    return {
      data,
      message: 'Success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('fair')
  async isFairTrade(
    @Body('pokemonsFromPlayer1') pokemonsFromPlayer1: Pokemon[],
    @Body('pokemonsFromPlayer2') pokemonsFromPlayer2: Pokemon[],
  ) {
    const data = await this.tradeService.isFairTrade(
      pokemonsFromPlayer1,
      pokemonsFromPlayer2,
    );
    return {
      data,
      message: 'Success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async trade(
    @Body('pokemonsFromPlayer1') pokemonsFromPlayer1: Pokemon[],
    @Body('pokemonsFromPlayer2') pokemonsFromPlayer2: Pokemon[],
    @Body('userID') userID: string,
  ) {
    const data = await this.tradeService.makeTrade(
      pokemonsFromPlayer1,
      pokemonsFromPlayer2,
      userID,
    );
    return {
      data,
      message: 'Success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userID')
  async tradeHistory(@Param('userID') userID: string) {
    const data = await this.tradeService.history(userID);
    return {
      data,
      message: 'Success',
    };
  }
}
