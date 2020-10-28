import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
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
