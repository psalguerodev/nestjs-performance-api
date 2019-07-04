import { Module, HttpModule } from '@nestjs/common';
import { BioController } from './bio.controller';
import { BioService } from './bio.service';

@Module({
  imports: [HttpModule.register({
    timeout: 7000,
  })],
  controllers: [BioController],
  providers: [BioService],
})
export class BioModule {}
