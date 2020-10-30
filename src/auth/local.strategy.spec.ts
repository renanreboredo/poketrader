import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';

describe('LocalStrategy', () => {
  let strategy: LocalStrategy;

  beforeEach(async () => {
    process.env.JWT_SECRET_KEY = 'secretkey';
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        AuthService,
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn(),
            constructor: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn().mockImplementation((query) => {
              if (query.username === 'user') {
                return {
                  userId: 1,
                  username: 'user',
                  password: 'pass',
                };
              }
              return undefined;
            }),
            update: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
      imports: [
        JwtModule.register({
          secret: 'secretkey',
          signOptions: { expiresIn: '300s' },
        }),
      ],
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
