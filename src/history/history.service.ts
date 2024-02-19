import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.history.findMany();
  }

  async findMany(id: string, start: string, end: string) {
    let filterData = {};

    const startDate = new Date(start);
    const endDate = new Date(end);
    if ((start && isNaN(+startDate)) || (end && isNaN(+endDate))) {
      return false;
    }

    const isNumber = Number.isInteger(+id);

    let query = {};
    if (isNumber) {
      query = {
        ticker: { id: +id },
      };
    } else {
      query = {
        tickerSymbol: id,
      };
    }

    if (start && end) {
      filterData = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (start && !end) {
      filterData = {
        gte: startDate,
      };
    }

    if (!start && !end) {
      filterData = {};
    }

    if (!start && end) {
      filterData = {
        lte: endDate,
      };
    }

    try {
      return await this.prisma.history.findMany({
        where: {
          OR: [
            query,
            {
              tickerSymbol: id,
            },
          ],

          time: filterData,
        },
      });
    } catch {
      return false;
    }
  }
}
