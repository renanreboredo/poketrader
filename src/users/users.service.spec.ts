import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
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
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#findOne', () => {
    it('returns a user if it finds one user', async () => {
      const subject = await service.findOne('user');
      expect(subject).toEqual({
        userId: 1,
        username: 'user',
        password: 'pass',
      });
    });

    it('returns undefined if it finds no user', async () => {
      const subject = await service.findOne('not_user');
      expect(subject).toBeUndefined();
    });
  });
});
