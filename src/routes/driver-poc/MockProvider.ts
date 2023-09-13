import { faker } from '@faker-js/faker';
import BaseProvider from './BaseProvider';
import { DriverPOC } from './types';
import ObjectToTree from '../../objectToTree';

const localStorageVariable = "No such variable in mock storage";

const mockPackages: DriverPOC.Package[] = [
  {
    id: 1,
    name: 'Universal Basic Income (UBI)',
    description:
      'Providing a fixed cash transfer to all eligible individuals, regardless of income, for a minimum standard of living.',
    amount: 1234.5,
    currency: 'EURO',
  },
  {
    id: 2,
    name: 'Targeted Poverty Alleviation (TPA)',
    description:
      'Offering additional financial assistance to those living below the poverty line to alleviate poverty effectively',
    amount: 1234.5,
    currency: 'EURO',
  },
  {
    id: 3,
    name: 'Social Pension',
    description:
      'Ensuring economic security during retirement by providing regular cash transfers to elderly citizens.',
    amount: 1234.5,
    currency: 'EURO',
  },
  {
    id: 4,
    name: 'Child and Family Support (CFS)',
    description:
      'Providing financial assistance to families with children to improve child well-being and reduce child poverty.',
    amount: 1234.5,
    currency: 'EURO',
  },
];

const mockCandidateList: DriverPOC.Candidate[] = [
  {
    id: 1,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    packages: [mockPackages[0], mockPackages[1], mockPackages[3]],
    relative: null
  },
  {
    id: 2,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    packages: [mockPackages[1]],
    relative: null
  },
  {
    id: 3,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    packages: [mockPackages[1], mockPackages[3]],
    relative: null
  },
  {
    id: 4,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    packages: [mockPackages[0], mockPackages[2]],
    relative: null
  },
  {
    id: 5,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    packages: [],
    relative: null
  },
];

mockCandidateList[0].relative = mockCandidateList[1];
mockCandidateList[1].relative = mockCandidateList[0];

const mockBeneficiaryList: DriverPOC.Beneficiary[] = [
  {
    id: 1,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    enrolledPackage: mockPackages[2],
    paymentStatus: 'INITIATE',
  },
  {
    id: 2,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    enrolledPackage: mockPackages[1],
    paymentStatus: 'INITIATE',
  },
  {
    id: 3,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    enrolledPackage: mockPackages[0],
    paymentStatus: 'INITIATE',
  },
  {
    id: 4,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    enrolledPackage: mockPackages[2],
    paymentStatus: 'INITIATE',
  },
  {
    id: 5,
    person: {
      id: faker.number.int(),
      personalIdCode: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      dateOfBirth: faker.date.birthdate().toString(),
      region: faker.location.city(),
      homeAddress: faker.location.streetAddress(),
      phoneNumber: faker.phone.number(),
      occupation: faker.person.jobTitle(),
      municipality: faker.location.city(),
      zipCode: faker.location.zipCode(),
      bankAccountOwnerName: faker.person.fullName(),
      financialAddress: faker.location.streetAddress(),
      iban: faker.finance.iban(),
      bankName: faker.company.name(),
      financialModality: 'Bank Account',
    },
    enrolledPackage: mockPackages[3],
    paymentStatus: 'INITIATE',
  },
];

export default class MockProvider extends BaseProvider {
  candidateList = [...mockCandidateList];
  packagesList: DriverPOC.Package[] = [...mockPackages];
  beneficiaryList: DriverPOC.Beneficiary[] = [...mockBeneficiaryList];
  getCandidateList() {
    return new Promise<DriverPOC.Candidate[]>((resolve) =>
      setTimeout(() => {
        resolve(this.candidateList);
      }, 1000)
    );
  }
  getPackages() {
    return new Promise<DriverPOC.Package[]>((resolve) =>
      setTimeout(() => resolve(this.packagesList), 1000)
    );
  }
  getCandidateInfo(id: number) {
    return new Promise<DriverPOC.Candidate>((resolve, reject) => {
      setTimeout(() => {
        const candidate = this.candidateList.find(
          (candidate) => candidate.id === id
        );
        if (candidate) {
          resolve(candidate);
        } else {
          reject('No Candidate with ID');
        }
      }, 1000);
    });
  }
  enrollCandidate(
    candidate: DriverPOC.Candidate,
    enrolledPackage: DriverPOC.Package
  ) {
    const enrolledCandidate: DriverPOC.Beneficiary = {
      id: faker.number.int(),
      paymentStatus: 'INITIATE',
      person: candidate.person,
      enrolledPackage,
    };
    this.candidateList = [...this.candidateList].filter(
      (c) => c.person.id !== candidate.id
    );
    this.beneficiaryList = [...this.beneficiaryList, enrolledCandidate];
    return new Promise<DriverPOC.Beneficiary>((resolve) =>
      setTimeout(() => resolve(enrolledCandidate), 1000)
    );
  }
  getBeneficiariesList() {
    return new Promise<DriverPOC.Beneficiary[]>((resolve) =>
      setTimeout(() => resolve(this.beneficiaryList), 1000)
    );
  }
  validateBeneficiaries(beneficiaries: DriverPOC.Beneficiary[]) {
    return new Promise<DriverPOC.Beneficiary[]>((resolve) => {
      setTimeout(() => resolve(beneficiaries), 1000);
    });
  }
  executePayments() {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve('String'), 1000);
    });
  }
  login(username: string) {
    return new Promise<string>((resolve) => {
      if (username === 'enrollment-officer') {
        resolve(
          'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiZW5yb2xsbWVudC1vZmZpY2VyIiwiZXhwIjoxNjg5NzY2Njk1LCJpYXQiOjE2ODk3NjMwOTUsInNjb3BlIjoiUk9MRV9FTlJPTExNRU5UX09GRklDRVIifQ.4aXKjd8W8Rlb23nkUxsBz2t7irQBWRdS10LIZf4FQXtfDR4Z0XuXMZIsMW9yolDYgRKy8XhrJxv5Deu_Yjr2yVD9LS4gLhT-zeTdZ3V_ELXXAAC6dv3BljZXltE3YaUkLAAtW4ZBRu_VPQAjpTKynIwgEIpqvkJCk0jCe5_imWgQSWDvC3y1tgMUcL_5TDGAGQMPfACbEhQjiE6DR0_npOqhgnQfDOnjS8dbCC5J0tKjvELvx64Sh6vQFqG0iz6k_Rvf0S8nxxjZ8wZ3hrlW2Nc7aFzPB3mQoy5OBgrS0CkwZRGA46GqNHQftoGACJFsSpsBOnWn6jxdnzrbezQIYA'
        );
      } else {
        resolve(
          'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoicGF5bWVudC1vZmZpY2VyIiwiZXhwIjoxNjg5NzYzMDgwLCJpYXQiOjE2ODk3NTk0ODAsInNjb3BlIjoiUk9MRV9QQVlNRU5UX09GRklDRVIifQ.T921HaIZGkiaHEMVFi8yrlOSfAdccb3hSPOrC71CqUjoD8KtcEMso02YGU6UIDj_vemt2n2LSnyUyap1mOphpxjTXFLFeyAMwhaPeGi1iqPI9xNIebJQ3NiOSVw6Tu7Kw14ITJuB8ud1oh6iRZxN5cnd7nVFvA1bhOW43uOEGAV3E_zE-HxgAlTDrC0hdg2LqKnsd1Fe1fNX3S5lnAjegmi7nVdQS25cO5giaBidR5u1jqOpCI6yPfc4xzDJyxU8ExeUbqY5BGUEhxReTw7a2kHLxwkwi4Urrv6aVYR5mETTA3B9JAu6vxQwjhgDx5FwquYnjU6-PAPmFflvpdpUDg'
        );
      }
    });
  }
  getRoles(): Promise<string> {
    return new Promise<string>((resolve) => {
      resolve('ROLE_PAYMENT_OFFICER');
    });
  }

  createCandidate(candidate: DriverPOC.Candidate) {
    return new Promise<DriverPOC.Candidate>((resolve) => {
      resolve(candidate);
    });
  }

  updateCandidate(candidate: DriverPOC.Candidate) {
    return new Promise<DriverPOC.Candidate>((resolve) => {
      resolve(candidate);
    });
  }

  deleteCandidate(candidateId: number) {
    return new Promise<string>((resolve) => {
      resolve('Successfully deleted candidate with id '+candidateId+'!');
    });
  }

  getMockItem(key: string) : Promise<string> {
    const objectToTree = new ObjectToTree();
    return new Promise<string>((resolve) => {
      if (key == "candidates") resolve(JSON.stringify(objectToTree.decompose(this.candidateList)));
      else if (key == "beneficiaries") resolve(JSON.stringify(objectToTree.decompose(this.beneficiaryList)));
      else if (key == "packages") resolve(JSON.stringify(objectToTree.decompose(this.packagesList)));
      else resolve(JSON.stringify(localStorageVariable));
    });
  }
}
