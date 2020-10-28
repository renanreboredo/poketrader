import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      imports: [
        UsersModule,
        JwtModule.register({
          secret: 'secretkey',
          signOptions: { expiresIn: '300s' },
        }),
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#validateUser', () => {
    it('returns user data minus password if user exists', async () => {
      const subject = await service.validateUser('user', 'pass');
      expect(subject).toEqual({
        userId: 1,
        username: 'user',
      });
    });

    it('returns null if user does not exist', async () => {
      const subject = await service.validateUser('not_user', 'pass');
      expect(subject).toBeNull();
    });

    it('returns null if password passed is not correct', async () => {
      const subject = await service.validateUser('user', 'not_pass');
      expect(subject).toBeNull();
    });
  });
});
