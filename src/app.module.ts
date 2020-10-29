import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PokeapiModule } from './pokeapi/pokeapi.module';

@Module({
  imports: [AuthModule, UsersModule, PokeapiModule],
  controllers: [AppController],
})
export class AppModule {}
