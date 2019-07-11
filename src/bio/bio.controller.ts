import { Controller, Get, Res, HttpStatus, Post, Logger, Body } from '@nestjs/common';
import { BioService } from './bio.service';
import { Response } from 'express';
import { MilesBenefits } from './interfaces/miles.benefits';
import { Customer, CustomerBenefitsResponse } from './interfaces/customer';

@Controller('')
export class BioController {
  constructor(private readonly bioService: BioService) { }

  @Get('/uxagent/api/user')
  winInfo(@Res() response: Response) {
    this.bioService
      .getWinInfo()
      .then(data => response.status(HttpStatus.OK).json(data));
  }

  @Post('/biomatch')
  getFingerTemplate(@Res() response: Response, @Body() body) {
    const stringvalue = JSON.stringify(body);
    if (stringvalue.indexOf('check') !== -1) {
      this.bioService
        .verifyBiomatch().then(checkBio => {
          response.type('xml').status(HttpStatus.OK).send(checkBio);
        });
    } else {
      this.bioService.getFingerTemplate().then(biomatch => {
        response.type('xml').status(HttpStatus.OK).send(biomatch);
      });
    }
  }

  @Get('/ibk/uat/biometria/biogateway/huella')
  getBioInfo(@Res() response: Response) {
    this.bioService
      .getBioInfo()
      .then(data => response.status(HttpStatus.OK).json(data));
  }

  @Get('/ibk/uat/biometria/biogateway/huella/valida')
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

  @Get('/vision/forkjoin/customer/benefits')
  forkJoinCustomerBenefits(@Res() response: Response) {
    this.bioService.forkJoinService()
      .subscribe((customerBenefits: CustomerBenefitsResponse) => {
        response.status(HttpStatus.OK).json(customerBenefits);
      }, error => response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(error));
  }
}
