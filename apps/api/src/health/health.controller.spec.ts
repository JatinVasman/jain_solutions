import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: PrismaService,
          useValue: {
            isHealthy: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test'),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check response on getHealth', async () => {
    const result = await controller.getHealth();
    expect(result).toBeDefined();
    expect(result.status).toBe('ok');
    expect(result.services.api).toBe('healthy');
    expect(result.services.database).toBe('connected');
  });

  it('should return health check response on getVersionedHealth', async () => {
    const result = await controller.getVersionedHealth();
    expect(result).toBeDefined();
    expect(result.status).toBe('ok');
  });

  it('should return operational status on getRoot', () => {
    const root = controller.getRoot();
    expect(root.status).toBe('operational');
    expect(root.version).toBe('1.0.0');
  });
});
