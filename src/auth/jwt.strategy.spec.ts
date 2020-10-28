import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    process.env.JWT_SECRET_KEY = 'secretkey';
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtStrategy, AuthService, UsersService],
      imports: [
        JwtModule.register({
          secret: 'secretkey',
          signOptions: { expiresIn: '300s' },
        }),
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('#validate', () => {
    it('should return validated user if it exists', async () => {
      const subject = await strategy.validate({ sub: 1, username: 'user' });
      expect(subject).toEqual({
        userId: 1,
        username: 'user',
      });
    });

    it('should throw UnauthorizedException when payload is empty', async () => {
      try {
        await strategy.validate({});
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
    });

    it('should throw UnauthorizedException when sub is empty', async () => {
      try {
        await strategy.validate({ username: 'user' });
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
    });
  });
});
