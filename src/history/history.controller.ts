import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { History } from './entities/history.entity';

@ApiBearerAuth()
@ApiTags('history')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  @ApiOperation({
    summary: 'History of changes in the cryptocurrency rate',
    description: 'Get crypto all history currency pairs',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crypto currency pairs have been successfully retrieved',
    type: History,
    isArray: true,
  })
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'History of changes in the cryptocurrency rate',
    description: 'Get crypto currency pairs by symbol or id',
  })
  @ApiParam({
    name: 'id',
    description: 'id or symbol from last endpoints',
    example: 'MNDE-USDT',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'start',
    description: 'Filtering start time',
    example: '2024-02-19T11:26:57.003Z',
    required: false,
    type: 'string',
  })
  @ApiQuery({
    name: 'end',
    description: 'Filtering end time',
    example: '2024-02-19T11:26:57.003Z',
    required: false,
    type: 'string',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Crypto currency pairs have been successfully retrieved',
    type: History,
    isArray: true,
  })
  findMany(
    @Param('id') id: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const result = this.historyService.findMany(id, start, end);
    if (result) {
      return result;
    }
    throw new BadRequestException();
  }
}
