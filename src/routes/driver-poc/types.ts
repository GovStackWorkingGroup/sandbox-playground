export interface Candidate {
  id: number;
  person: Person;
  packages: Package[];
  consent: Consent | null;
  relative?: Candidate | null;
}

export interface Beneficiary extends PaymentInformation {
  id: number;
  person: Person;
  enrolledPackage: Package;
}

export interface Relative {
  person: Person;
  relationshipType: string;
}

export interface Consent {
  id: number;
  candidateId: number;
  status: ConsentStatus,
  date: string
}

export interface Household {
  id: number;
  candidate: Candidate;
  relative: Person;
  relationshipType: string;
}
export interface Person {
  id: number;
  personalIdCode: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  region: string;
  homeAddress: string;
  phoneNumber: string;
  occupation: string;
  municipality: string;
  zipCode: string;
  bankAccountOwnerName: string;
  financialAddress: string;
  financialModality: string;
  iban: string;
  bankName: string;
}
export interface Package {
  id: number;
  name: string;
  description: string;
  amount: number;
  currency: string;
}
export interface PaymentInformation {
  paymentStatus:
    | "ACCEPTED"
    | "INITIATE"
    | "IN_PROGRESS"
    | "REJECTED"
    | "CLOSED";
}

export enum ConsentStatus {
  GRANTED = "GRANTED",
  NOT_GRANTED = "NOT_GRANTED"
}
