import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TradeSchema } from 'src/domain/schemas/trade.schema';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { PokeapiModule } from 'src/pokeapi/pokeapi.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trade', schema: TradeSchema }]),
    PokeapiModule,
  ],
  providers: [TradeService],
  controllers: [TradeController],
})
export class TradeModule {}
