import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import { TradeModule } from './trade/trade.module';

@Module({
  imports: [AuthModule, UsersModule, PokeapiModule, TradeModule],
  controllers: [AppController],
})
export class AppModule {}
