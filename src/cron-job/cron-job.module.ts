import { Module } from '@nestjs/common';
import { CronJobService } from './cron-job.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CronJobService],
})
export class CronJobModule {}
