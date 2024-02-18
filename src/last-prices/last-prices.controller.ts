import { Controller, Get, Param, Delete } from '@nestjs/common';
import { LastPricesService } from './last-prices.service';

@Controller('last')
export class LastPricesController {
  constructor(private readonly lastPricesService: LastPricesService) {}

  @Get()
  findAll() {
    return this.lastPricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lastPricesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lastPricesService.remove(+id);
  }
}
