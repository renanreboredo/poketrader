import { Test, TestingModule } from '@nestjs/testing';
import { TradeController } from './trade.controller';
import { PokeapiService } from '../pokeapi/pokeapi.service';
import { TradeService } from './trade.service';
import { HttpModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { generations, pokemonExample, pokemonExample2 } from '../../test/mocks/pokeapi';
import { Trade } from '../domain/Trade';

describe('Trade Controller', () => {
  let controller: TradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PokeapiService,
        TradeService,
        {
          provide: getModelToken('Trade'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
      controllers: [TradeController],
    }).compile();

    controller = module.get<TradeController>(TradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#generations', () => {
    it('should return message if generation could not be fetched', async () => {
      jest
        .spyOn(PokeapiService.prototype, 'generations')
        .mockImplementation(async () => undefined);
      const subject = await controller.generations();
      expect(subject.message).toEqual('Problem Listing Generations');
    });

    it('should return generations array', async () => {
      jest
        .spyOn(PokeapiService.prototype, 'generations')
        .mockImplementation(async () => generations.results);
      const subject = await controller.generations();
      expect(subject.data.length).toEqual(8);
    });
  });

  describe('#trade', () => {
    it('should return descriptive message if trade is not fair', async () => {
      jest
        .spyOn(TradeService.prototype, 'makeTrade')
        .mockImplementation(async () => ({ error: true, message: 'Trade must be fair' }));
      const subject = await controller.trade([], [], '');
      expect(subject.message).toEqual('Trade must be fair');
    });

    it('should return descriptive message if trade is impossible due to array size', async () => {
      jest
        .spyOn(TradeService.prototype, 'makeTrade')
        .mockImplementation(async () => ({ error: true, message: 'Trade must have 6 pokemons maximum' }));
      const subject = await controller.trade([], [], '');
      expect(subject.message).toEqual('Trade must have 6 pokemons maximum');
    });

    it('should return trade', async () => {
      const trade = {
        userID: 'user',
        pokemonsIn: [pokemonExample],
        pokemonsOut: [pokemonExample],
        createdOn: new Date(),
      } as Trade;
      jest
        .spyOn(TradeService.prototype, 'makeTrade')
        .mockImplementation(async () => trade);
      const subject = await controller.trade([pokemonExample], [pokemonExample], 'user');
      expect(subject.data.userID).toEqual('user');
    });
  });

  describe('#tradeHistory', () => {
    it('should send message if error occurs', async () => {
      jest
        .spyOn(TradeService.prototype, 'history')
        .mockImplementation(async () => undefined);
      const subject = await controller.tradeHistory('user');
      expect(subject.message).toEqual('Could not get trade history for this user');
    });
  });

  describe('#isFairTrade', () => {
    it('should send message if error occurs', async () => {
      jest
        .spyOn(TradeService.prototype, 'isFairTrade')
        .mockImplementation(async () => undefined);
      const subject = await controller.isFairTrade([pokemonExample], [pokemonExample]);
      expect(subject.message).toEqual('Unknown Error');
    });

    it('should return true if trade is fair', async () => {
      jest
        .spyOn(TradeService.prototype, 'isFairTrade')
        .mockImplementation(async () => true);
      const subject = await controller.isFairTrade([pokemonExample], [pokemonExample]);
      expect(subject.data).toEqual(true);
    });

    it('should return false if trade is not fair', async () => {
      jest
        .spyOn(TradeService.prototype, 'isFairTrade')
        .mockImplementation(async () => false);
      const subject = await controller.isFairTrade([pokemonExample], [pokemonExample2]);
      expect(subject.data).toEqual(false);
      expect(subject.message).toEqual('Trade is not fair');
    });
  });

  describe('#pokemonsFromGeneration', () => {
    it('should show message if pokemons not found', async () => {
      jest
        .spyOn(PokeapiService.prototype, 'pokemonsFromGeneration')
        .mockImplementation(async () => undefined);
      const subject = await controller.pokemonsFromGeneration(1);
      expect(subject.message).toEqual('Problem Getting Pokemons from This Generation');
    });

    it('should return pokemons from given generation', async () => {
      jest
        .spyOn(PokeapiService.prototype, 'pokemonsFromGeneration')
        .mockImplementation(async () => [pokemonExample]);
      const subject = await controller.pokemonsFromGeneration(1);
      expect(subject.data).toEqual([pokemonExample]);
    });
  });
});
