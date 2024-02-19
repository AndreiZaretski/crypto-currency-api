import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class CronJobService implements OnModuleDestroy {
  private unsubscribe$ = new Subject();
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

    prices$.pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: async (response) => {
        const tickers = response.data.data.ticker;
        const time = response.data.data.time;

        const dataTicker = [];
        for (const ticker of tickers) {
          dataTicker.push({
            tickerSymbol: ticker.symbol,
            price: +ticker.last,
            time: new Date(time),
          });

          const symbol = ticker.symbol;
          const price = +ticker.last;
          await this.prisma.ticker.upsert({
            where: {
              symbol: symbol,
            },
            create: {
              symbol: symbol,
              price: price,
              createdAt: new Date(time),
            },
            update: {
              price: price,
              createdAt: new Date(time),
            },
          });
        }
        await this.prisma.history.createMany({
          data: dataTicker,
        });
      },
      error: (err) => {
        console.error(err.message);
      },
    });
  }

  onModuleDestroy() {
    this.unsubscribe$.next(null);
  }
}
