import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class LastPricesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.ticker.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} lastPrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} lastPrice`;
  }
}
