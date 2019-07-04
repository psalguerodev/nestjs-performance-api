import { Test, TestingModule } from '@nestjs/testing';
import { BioService } from './bio.service';
import { HttpModule } from '@nestjs/common';

describe('BioService', () => {
  let service: BioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BioService],
      imports: [
        HttpModule,
      ],
    }).compile();

    service = module.get<BioService>(BioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
