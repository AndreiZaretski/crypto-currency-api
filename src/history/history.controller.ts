import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findMany(
    @Param('id') id: string,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const result = this.historyService.findMany(id, start, end);
    if (result) {
      return result;
    }
    throw new BadRequestException();
  }
}
