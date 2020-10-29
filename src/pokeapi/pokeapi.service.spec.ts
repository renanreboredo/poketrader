import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from './pokeapi.service';
import { generationList } from 'mock-pokemon';
import { HttpService } from '@nestjs/common';
import { of } from 'rxjs';

describe('PokeapiService', () => {
  let service: PokeapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokeapiService],
    }).compile();

    service = module.get<PokeapiService>(PokeapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#generations', () => {
    it('returns generations with names and pokemon list', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: generationList,
          status: 500,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      const generations = await service.generations();
      expect(generations.length).toBeGreaterThanOrEqual(7);
    });
  });
});
