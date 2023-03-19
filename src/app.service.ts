import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule/dist';

@Injectable()
export class AppService {
  instagramURL = '';

  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  runEveryMinute() {
    console.log('Every minute');
  }
}
