import { Controller, Get, Res, HttpStatus, Post, Logger, Body, Query } from '@nestjs/common';
import { BioService } from './bio.service';
import { Response } from 'express';
import { MilesBenefits } from './interfaces/miles.benefits';
import { Customer, CustomerBenefitsResponse } from './interfaces/customer';

@Controller('')
export class BioController {
  constructor(private readonly bioService: BioService) { }

  @Get('/uxagent/api/user')
  winInfo(@Res() response: Response) {
    setTimeout(_ => {
      this.bioService
      .getWinInfo()
      .then(data => response.status(HttpStatus.OK).json(data));
    }, 0);
  }

  @Post('/biomatch')
  getFingerTemplate(@Res() response: Response, @Body() body) {
    const stringvalue = JSON.stringify(body);
    if (stringvalue.indexOf('check') !== -1) {
      this.bioService
        .verifyBiomatch().then(checkBio => {
          setTimeout(_ => response.type('xml').status(HttpStatus.OK).send(checkBio), 100);
        });
    } else {
      this.bioService.getFingerTemplate().then(biomatch => {
        setTimeout(_ => response.type('xml').status(HttpStatus.OK).send(biomatch), 3000);
      });
    }
  }

  @Get('/ibk/uat/biometria/biogateway/huella')
  getBioInfo(@Res() response: Response) {
    this.bioService
      .getBioInfo()
      .then(data => setTimeout(_ => response.status(HttpStatus.OK).json(data), 0));
  }

  @Get('/ibk/uat/biometria/biogateway/huella/valida')
  bioVerify(@Query() parameters, @Res() response: Response) {
    this.bioService
      .verifyBio(parameters.numeroDocumento)
      .then(data => setTimeout(_ =>  response.status(HttpStatus.OK).json(data), 4000));
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
