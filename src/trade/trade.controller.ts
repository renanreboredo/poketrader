import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PokeapiService } from '../pokeapi/pokeapi.service';
import { TradeService } from './trade.service';
import { Pokemon } from '../domain/Pokemon';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

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
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: [],
      message: data ? data.message : 'Problem Listing Generations',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('generation/:id/pokemon')
  async pokemonsFromGeneration(@Param('id') id: number) {
    const data: any = await this.pokeapiService.pokemonsFromGeneration(id);
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: [],
      message: data ? data.message : 'Problem Getting Pokemons from This Generation',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('fair')
  async isFairTrade(
    @Body('pokemonsFromPlayer1') pokemonsFromPlayer1: Pokemon[],
    @Body('pokemonsFromPlayer2') pokemonsFromPlayer2: Pokemon[],
  ) {
    const data: any = await this.tradeService.isFairTrade(
      pokemonsFromPlayer1,
      pokemonsFromPlayer2,
    );
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: false,
      message: data != undefined ? 'Trade is not fair' : 'Unknown Error',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async trade(
    @Body('pokemonsFromPlayer1') pokemonsFromPlayer1: Pokemon[],
    @Body('pokemonsFromPlayer2') pokemonsFromPlayer2: Pokemon[],
    @Body('userID') userID: string,
  ) {
    const data: any = await this.tradeService.makeTrade(
      pokemonsFromPlayer1,
      pokemonsFromPlayer2,
      userID,
    );
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: [],
      message: data ? data.message : 'Trade not possible',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userID')
  async tradeHistory(@Param('userID') userID: string) {
    const data: any = await this.tradeService.history(userID);
    if (data && !data.error) {
      return {
        data,
        message: 'Success',
      };
    }
    return {
      data: [],
      message: data != undefined ? data.message : 'Could not get trade history for this user',
    };
  }
}
