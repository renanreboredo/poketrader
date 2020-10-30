import { Test, TestingModule } from '@nestjs/testing';
import { PokeapiService } from './pokeapi.service';
import {
  HttpService,
  HttpModule,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { of } from 'rxjs';
import {
  generations,
  pokemonsFromGeneration,
  pokemonExampleAPI,
} from '../../test/mocks/pokeapi';

describe('PokeapiService', () => {
  let service: PokeapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokeapiService],
    }).compile();

    service = module.get<PokeapiService>(PokeapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#generations', () => {
    it('returns generation list', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: generations,
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      const subject = await service.generations();
      expect(subject.length).toBeGreaterThanOrEqual(8);
    });
  });

  describe('#pokemonsFromGeneration', () => {
    it('returns pokemon list from a given generation', async () => {
      jest
        .spyOn(HttpService.prototype, 'get')
        .mockImplementationOnce(() =>
          of({
            data: pokemonsFromGeneration,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        )
        .mockImplementation(() =>
          of({
            data: pokemonExampleAPI,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );

      const subject = await service.pokemonsFromGeneration(1);
      expect(subject.length).toEqual(151);
    });

    it('throws not found exception if generation id does not exist', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: 'Not Found',
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      try {
        await service.pokemonsFromGeneration(11);
      } catch (e) {
        expect(e).toEqual(new HttpException('Not Found', HttpStatus.NOT_FOUND));
      }
    });
  });

  describe('#pokemonInfo', () => {
    it('consolidates useful pokemon info for trading', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: pokemonExampleAPI,
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      const subject = await service.pokemonInfo('cyndaquil');
      expect(subject.baseExperience).toEqual(62);
      expect(subject.sprite).toEqual(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/155.png',
      );
      expect(subject.name).toEqual('cyndaquil');
      expect(subject.isDefault).toEqual(true);
      expect(subject.stats.hp).toEqual(39);
    });

    it('throws not found exception if pokemon is not found', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: 'Not Found',
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      try {
        await service.pokemonInfo('pokemon_not_found');
      } catch (e) {
        expect(e).toEqual(new HttpException('Not Found', HttpStatus.NOT_FOUND));
      }
    });
  });

  describe('#pokeapiRequest', () => {
    it('calls pokeapi url', async () => {
      const subject = jest
        .spyOn(HttpService.prototype, 'get')
        .mockImplementation(() =>
          of({
            data: generations,
            status: 200,
            headers: null,
            config: {},
            statusText: 'OK',
          }),
        );
      await service.pokeapiRequest(`generation`);
      expect(subject).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/generation',
      );
    });

    it('returns data if record found in pokeapi', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: generations,
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      const subject = await service.pokeapiRequest(`generation`);
      expect(subject).toEqual(generations);
    });

    it('throws not found error if record not found in pokeapi', async () => {
      jest.spyOn(HttpService.prototype, 'get').mockImplementation(() =>
        of({
          data: 'Not Found',
          status: 200,
          headers: null,
          config: {},
          statusText: 'OK',
        }),
      );
      try {
        await service.pokeapiRequest(`generation`);
      } catch (subject) {
        expect(subject).toEqual(
          new HttpException('Not Found', HttpStatus.NOT_FOUND),
        );
      }
    });
  });
});
