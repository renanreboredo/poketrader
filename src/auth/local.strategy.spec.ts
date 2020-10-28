import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalStrategy, AuthService, UsersService],
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('#validate', () => {
    it('should return validated user if it exists', async () => {
      const subject = await strategy.validate('user', 'pass');
      expect(subject).toEqual({
        userId: 1,
        username: 'user',
      });
    });

    it('should throw UnauthorizedException when username doesnt exist', async () => {
      try {
        await strategy.validate('not_user', 'pass');
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
    });

    it('should throw UnauthorizedException when password is not correct', async () => {
      try {
        await strategy.validate('user', 'not_pass');
      } catch (e) {
        expect(e).toEqual(new UnauthorizedException());
      }
    });
  });
});

