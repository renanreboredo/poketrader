import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../domain/User';
import { of } from 'rxjs';

describe('Users Controller', () => {
  let controller: UsersController;

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
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#create', () => {
    it('should return user data if user is created successfully', async () => {
      const user = { username: 'user', password: 'pass' } as User;
      jest
        .spyOn(UsersService.prototype, 'create')
        .mockImplementation(async () => user);
      const subject = await controller.create(user);
      expect(subject.data).toEqual(user);
    });

    it('should return `Success` message if user is created successfully', async () => {
      const user = { username: 'user', password: 'pass' } as User;
      jest
        .spyOn(UsersService.prototype, 'create')
        .mockImplementation(async () => user);
      const subject = await controller.create(user);
      expect(subject.message).toEqual('Success');
    });

    it('should return generic message if user is not created', async () => {
      const user = { username: 'user', password: 'pass' } as User;
      jest
        .spyOn(UsersService.prototype, 'create')
        .mockImplementation(async () => undefined);
      const subject = await controller.create(user);
      expect(subject.message).toEqual('User could not be created');
    });

    it('should return specific message if username already taken', async () => {
      const user = { username: 'user', password: 'pass' } as User;
      jest
        .spyOn(UsersService.prototype, 'create')
        .mockImplementation(async () => ({
          error: true,
          message: 'User is already taken',
        }));
      const subject = await controller.create(user);
      expect(subject.message).toEqual('User is already taken');
    });
  });
});
