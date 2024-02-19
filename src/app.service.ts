import { Injectable } from '@nestjs/common';
import { name as appName } from '../package.json';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello! You are welcome! ${appName} work!`;
  }
}
