import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            fetchAndSaveUser: jest.fn(),
            getAllUsers: jest.fn(),
            getUserById: jest.fn(),
            findByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call fetchAndSaveUser', async () => {
    await controller.create('octocat');
    expect(service.fetchAndSaveUser).toHaveBeenCalledWith('octocat');
  });

  it('should call getAllUsers', async () => {
    await controller.getAllUsers();
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it('should call getUserById', async () => {
    await controller.getUserById(1);
    expect(service.getUserById).toHaveBeenCalledWith(1);
  });

  it('should call findByUsername', async () => {
    await controller.findByUsername('octocat');
    expect(service.findByUsername).toHaveBeenCalledWith('octocat');
  });
});
