import { Injectable, HttpService } from '@nestjs/common';
import * as wininfo_success from './data/wininfo_success.json';
import * as bioinfo_success from './data/bioinfo_success.json';
import * as bioverify_success from './data/bioverify_success.json';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  MilesBenefits,
  MilesBenefitsResponse,
} from './interfaces/miles.benefits';
import { Customer } from './interfaces/customer';

@Injectable()
export class BioService {
  constructor(private readonly http: HttpService) {}

  async getWinInfo(): Promise<any> {
    return new Promise(resolve => resolve(wininfo_success));
  }

  async getBioInfo(): Promise<any> {
    return new Promise(resolve => resolve(bioinfo_success));
  }

  async verifyBio(): Promise<any> {
    return new Promise(resolve => resolve(bioverify_success));
  }

  getBenefits(): Observable<MilesBenefits> {
    return this.http
      .get<MilesBenefitsResponse>(
        'http://142.93.89.210:4000/vision/customer/benefits',
      )
      .pipe(
        map(response => {
          const finalBalance = response.data.milesBenefit.finalBalance;
          if (finalBalance.length > 0) {
            const splitBalance: string[] = finalBalance.split('');
            const balanceFormat: string = `${
              splitBalance[0]
            },${finalBalance.substr(1, finalBalance.length - 1)}`;
            response.data.milesBenefit.finalBalance = balanceFormat;
          }
          return response.data.milesBenefit;
        }),
        catchError(error => throwError(error)),
      );
  }

  findCustomer(): Observable<Customer> {
    return this.http
      .post<any>(
        'https://eu1-ibk-apm-dev-ext-001.azure-api.net/ibk/api/customer',
        {},
      )
      .pipe(
        map(response => {
          const customerResponse: Customer = response.data.customer as Customer;
          return {
            id: customerResponse.id,
            identityDocumentNumber: customerResponse.identityDocumentNumber,
            identityDocumentType: customerResponse.identityDocumentType,
            fullName: customerResponse.fullName,
          } as Customer;
        }),
        catchError(error => throwError(error)),
      );
  }
}
