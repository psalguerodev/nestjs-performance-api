import { Controller, Get, Res, HttpStatus, Post } from '@nestjs/common';
import { BioService } from './bio.service';
import { Response } from 'express';
import { MilesBenefits } from './interfaces/miles.benefits';
import { Customer } from './interfaces/customer';

@Controller('')
export class BioController {
  constructor(private readonly bioService: BioService) {}

  @Get('/uxagent/api/user')
  winInfo(@Res() response: Response) {
    this.bioService
      .getWinInfo()
      .then(data => response.status(HttpStatus.OK).json(data));
  }

  @Post('/bio/api/getInfo')
  getBioInfo(@Res() response: Response) {
    this.bioService
      .getBioInfo()
      .then(data => response.status(HttpStatus.OK).json(data));
  }

  @Post('/bio/api/verify')
  bioVerify(@Res() response: Response) {
    this.bioService
      .verifyBio()
      .then(data => response.status(HttpStatus.OK).json(data));
  }

  @Get('/vision/benefits')
  getBenefits(@Res() response: Response) {
    this.bioService.getBenefits().subscribe(
      (beneftis: MilesBenefits) => {
        response.status(HttpStatus.OK).json(beneftis);
      },
      error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error),
    );
  }

  @Get('/vision/customer')
  findCustomer(@Res() response: Response) {
    this.bioService.findCustomer().subscribe(
      (customer: Customer) => {
        response.status(HttpStatus.OK).json(customer);
      },
      error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error),
    );
  }
}
