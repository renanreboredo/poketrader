import { Test, TestingModule } from '@nestjs/testing';
import { pokemonExample, pokemonExample2 } from '../../test/mocks/pokeapi';
import { TradeService } from './trade.service';

describe('TradeService', () => {
  let service: TradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TradeService],
    }).compile();

    service = module.get<TradeService>(TradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#fairTrade', () => {
    it('should return false if any pokemon trade array is empty', async () => {
      const subject = await service.isFairTrade([], [pokemonExample]);
      expect(subject).toEqual(false);
    });

    it('should return false if both pokemon trade arrays are empty', async () => {
      const subject = await service.isFairTrade([], []);
      expect(subject).toEqual(false);
    });

    it('should return true if both pokemons are equal', async () => {
      const subject = await service.isFairTrade(
        [pokemonExample],
        [pokemonExample],
      );
      expect(subject).toEqual(true);
    });

    it('should return false if pokemon score difference is more than 5%', async () => {
      const subject = await service.isFairTrade(
        [pokemonExample2],
        [pokemonExample],
      );
      expect(subject).toEqual(false);
    });

    it('should return true if pokemon score difference is equal to 5%', async () => {
      const pokemonExampleChanged = { ...pokemonExample, baseExperience: 135 };
      const subject = await service.isFairTrade(
        [pokemonExample2],
        [pokemonExampleChanged],
      );
      expect(subject).toEqual(true);
    });

    it('should return true if pokemon score difference is less than 5%', async () => {
      const pokemonExampleChanged = { ...pokemonExample, baseExperience: 138 };
      const subject = await service.isFairTrade(
        [pokemonExample2],
        [pokemonExampleChanged],
      );
      expect(subject).toEqual(true);
    });
  });

  describe('#calculatePlayerTradeScore', () => {
    it('should return player trade score based in pokemons array', () => {
      const subject = service.calculatePlayerTradeScore([
        pokemonExample2,
        pokemonExample,
      ]);
      expect(subject).toEqual(204);
    });

    it('should return 0 if array is empty', () => {
      const subject = service.calculatePlayerTradeScore([]);
      expect(subject).toEqual(0);
    });
  });
});
