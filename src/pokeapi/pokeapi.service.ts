import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class PokeapiService {
  constructor(private http: HttpService) {}

  POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';

  async generations() {
    return this.http.get(`${this.POKEAPI_BASE_URL}/generations`).toPromise();
  }
}
