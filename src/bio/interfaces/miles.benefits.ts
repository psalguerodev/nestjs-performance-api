export interface MilesBenefits {
  description: string;
  initialBalance: string;
  gainedPoints: string;
  bonificationPoints: string;
  usedPoints: string;
  finalBalance: string;
}

export interface MilesBenefitsResponse {
  milesBenefit: MilesBenefits;
}