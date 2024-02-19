import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { LastPricesService } from './last-prices.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LastPrices } from './entities/last-prices.entity';

@ApiBearerAuth()
@ApiTags('last')
@Controller('last')
export class LastPricesController {
  constructor(private readonly lastPricesService: LastPricesService) {}

  @Get()
  @ApiOperation({
    summary: 'Latest price of all cryptocurrency pairs',
    description: 'Get crypto all latest price currency pairs',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crypto currency pairs have been successfully retrieved',
    type: LastPrices,
    isArray: true,
  })
  findAll() {
    return this.lastPricesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Latest price of one cryptocurrency pair',
    description: 'Get crypto one latest price currency pairs by id or symbol',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crypto currency pair have been successfully retrieved',
    type: LastPrices,
    isArray: true,
  })
  @ApiParam({
    name: 'id',
    description: 'id or symbol from last endpoints',
    example: 'MNDE-USDT',
    required: true,
    type: 'string',
  })
  findOne(@Param('id') id: string) {
    return this.lastPricesService.findOne(id);
  }
}
