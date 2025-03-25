import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return token when credentials are valid', async () => {
      const user = { id: 1, username: 'admin' };
      const loginResult = { access_token: 'test-token' };
      
      jest.spyOn(service, 'validateUser').mockResolvedValue(user);
      jest.spyOn(service, 'login').mockResolvedValue(loginResult);

      const result = await controller.login({
        username: 'admin',
        password: '123',
      });

      expect(service.validateUser).toHaveBeenCalledWith('admin', '123');
      expect(service.login).toHaveBeenCalledWith(user);
      expect(result).toBe(loginResult);
    });

    it('should throw error when credentials are invalid', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(
        controller.login({ username: 'wrong', password: 'wrong' })
      ).rejects.toThrow('Credenciais inválidas');
    });
  });
});
