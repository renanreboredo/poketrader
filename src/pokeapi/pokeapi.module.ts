import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Module({
  providers: [PokeapiService]
})
export class PokeapiModule {}
