import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const date: Date = new Date();
    Logger.log(`Received request on Mock Api`, LoggerMiddleware.name);
    next();
  }
}
