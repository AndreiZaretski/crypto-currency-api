import { Test, TestingModule } from '@nestjs/testing';
import { LastPricesController } from './last-prices.controller';
import { LastPricesService } from './last-prices.service';

describe('LastPricesController', () => {
  let controller: LastPricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LastPricesController],
      providers: [LastPricesService],
    }).compile();

    controller = module.get<LastPricesController>(LastPricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
