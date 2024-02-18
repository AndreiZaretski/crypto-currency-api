import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma-db/prisma-db.service';

@Injectable()
export class CronJobService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchAndSavePrices() {
    console.log('cron work');
    const prices$ = this.httpService.get(
      'https://api.kucoin.com/api/v1/market/allTickers',
    );

    prices$.subscribe({
      next: async (response) => {
        const tickers = response.data.data.ticker;
        const time = response.data.data.time;

        for (const ticker of tickers) {
          const price: any = {};
          //new Price();
          price.symbol = ticker.symbol;
          price.price = +ticker.last;

          await this.prisma.ticker.create({
            data: {
              price: price.price,
              symbol: price.symbol,
              createdAt: new Date(time),
            },
          });
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
