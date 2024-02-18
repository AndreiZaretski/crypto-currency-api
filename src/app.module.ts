import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobModule } from './cron-job/cron-job.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { LastPricesModule } from './last-prices/last-prices.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    PrismaDbModule,
    CronJobModule,
    LastPricesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
