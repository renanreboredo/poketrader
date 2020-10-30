import {
  Injectable,
  HttpService,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Pokemon } from 'src/domain/Pokemon';

@Injectable()
export class PokeapiService {
  constructor(private http: HttpService) {}

  POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

  async generations() {
    const data = await this.pokeapiRequest(`generation`);
    return data.results;
  }

  async pokemonsFromGeneration(id: number): Promise<Pokemon[]> {
    const data = await this.pokeapiRequest(`generation/${id}`);

    let pokemons = [];
    for (const pokemon of data.pokemon_species) {
      const aux = await this.pokemonInfo(pokemon.name);
      pokemons = [...pokemons, aux];
    }

    return pokemons;
  }

  async pokemonInfo(name: string): Promise<Pokemon> {
    const data = await this.pokeapiRequest(`pokemon/${name}`);
    return {
      name,
      isDefault: data.is_default,
      baseExperience: data.base_experience,
      sprite: data.sprites.front_default,
      stats: {
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        specialAttack: data.stats[3].base_stat,
        specialDefense: data.stats[4].base_stat,
        speed: data.stats[5].base_stat,
      },
    };
  }

  async pokeapiRequest(uri: string) {
    const { data } = await this.http
      .get(`${this.POKEAPI_BASE_URL}/${uri}`)
      .toPromise();
    if (data === 'Not Found') {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}
