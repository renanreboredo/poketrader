import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PokeapiModule } from './pokeapi/pokeapi.module';
import { TradeModule } from './trade/trade.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PokeapiModule,
    TradeModule,
    MongooseModule.forRoot(
      `mongodb+srv://root:${process.env.DATABASE_PASSWORD}@pokemoncluster.oaqab.mongodb.net/<dbname>?retryWrites=true&w=majority`,
    ),
  ],
  controllers: [AppController],
})
export class AppModule {}
