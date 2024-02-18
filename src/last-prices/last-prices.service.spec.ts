import { Test, TestingModule } from '@nestjs/testing';
import { LastPricesService } from './last-prices.service';

describe('LastPricesService', () => {
  let service: LastPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LastPricesService],
    }).compile();

    service = module.get<LastPricesService>(LastPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
