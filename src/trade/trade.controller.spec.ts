import { Test, TestingModule } from '@nestjs/testing';
import { TradeController } from './trade.controller';
import { PokeapiService } from '../pokeapi/pokeapi.service';
import { TradeService } from './trade.service';
import { HttpModule } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

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
});
