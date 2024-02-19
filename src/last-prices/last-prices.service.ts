import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class LastPricesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.ticker.findMany({
      orderBy: [
        {
          id: 'asc',
        },
      ],
    });
  }

  async findOne(id: string) {
    const query = Number.isInteger(+id) ? { id: +id } : { symbol: id };
    return await this.prisma.ticker.findUnique({
      where: {
        ...query,
      },
    });
  }
}
