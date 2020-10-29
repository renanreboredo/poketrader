import { Module, HttpModule } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Module({
  providers: [PokeapiService],
  imports: [HttpModule],
  exports: [PokeapiService],
})
export class PokeapiModule {}
