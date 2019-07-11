import { MilesBenefits } from './miles.benefits';

export interface Customer {
  identityDocumentType: string;
  identityDocumentNumber: string;
  id: string;
  fullName: string;
}

export interface CustomerBenefitsResponse {
  customer: Customer;
  benefits: MilesBenefits;
}