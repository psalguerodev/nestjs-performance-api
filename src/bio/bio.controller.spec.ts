import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { BioController } from './bio.controller';
import { BioService } from './bio.service';

describe('Bio Controller', () => {
  let controller: BioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BioController],
      providers: [BioService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<BioController>(BioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
