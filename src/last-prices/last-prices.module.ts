import { Module } from '@nestjs/common';
import { LastPricesService } from './last-prices.service';
import { LastPricesController } from './last-prices.controller';

@Module({
  controllers: [LastPricesController],
  providers: [LastPricesService],
})
export class LastPricesModule {}
