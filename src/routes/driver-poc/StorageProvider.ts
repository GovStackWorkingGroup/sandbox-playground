import { faker } from '@faker-js/faker';
import BaseProvider from './BaseProvider';
import { DriverPOC } from './types';
import MockProvider from './MockProvider';
import ObjectToTree from '../../objectToTree';
import { isEmptyArray } from 'formik';

export default class StorageProvider extends BaseProvider {
    objectToTree = new ObjectToTree();
    mockProvider = new MockProvider();
    candidateList: DriverPOC.Candidate[] = [];
    packagesList: DriverPOC.Package[] = [];
    beneficiaryList: DriverPOC.Beneficiary[] = [];
    getCandidateList() {
        return new Promise < DriverPOC.Candidate[] > ((resolve) =>
            setTimeout(async () => {
                this.candidateList = await this.getLocalStorageObject("candidates") as DriverPOC.Candidate[];
                this.candidateList.sort((a, b) => {
                    return a.id - b.id;
                });
                resolve(this.candidateList);
            }, 1000)
        );
    }
    getPackages() {
        return new Promise < DriverPOC.Package[] > ((resolve) =>
            setTimeout(async () => {
                resolve(await this.getLocalStorageObject("packages") as DriverPOC.Package[]),
                1000
            })
        );
    }
    getCandidateInfo(id: number) {
        return new Promise < DriverPOC.Candidate > ((resolve, reject) => {
            setTimeout(async () => {
                const candidates = await this.getLocalStorageObject("candidates") as DriverPOC.Candidate[];
                const candidate = candidates.find(
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
        return new Promise < DriverPOC.Beneficiary > ((resolve) =>
            setTimeout(() => resolve(enrolledCandidate), 1000)
        );
    }
    getBeneficiariesList() {
        return new Promise < DriverPOC.Beneficiary[] > ((resolve) =>
            setTimeout(async () => {
                resolve(await this.getLocalStorageObject("beneficiaries") as DriverPOC.Beneficiary[]),
                1000
            })
        );
    }
    validateBeneficiaries(beneficiaries: DriverPOC.Beneficiary[]) {
        return new Promise < DriverPOC.Beneficiary[] > ((resolve) => {
            setTimeout(() => resolve(beneficiaries), 1000);
        });
    }
    executePayments() {
        return new Promise < string > ((resolve) => {
            setTimeout(() => resolve('String'), 1000);
        });
    }
    login(username: string) {
        return new Promise < string > ((resolve) => {
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

    getRoles(): Promise < string > {
        return new Promise < string > ((resolve) => {
            resolve('ROLE_PAYMENT_OFFICER');
        });
    }

    createCandidate(candidate: DriverPOC.Candidate) {
        return new Promise < DriverPOC.Candidate > (async (resolve) => {
            var candidateList = await this.getLocalStorageObject("candidates") as DriverPOC.Candidate[];
            if (!isEmptyArray(candidateList)) {
                candidate.id = candidateList[candidateList.length - 1].id + 1;
                candidateList.push(candidate);
            }
            else {
                candidate.id = 1;
                candidateList = [candidate];
            }
            this.setLocalStorageObject("candidates", candidateList);
            resolve(candidate);
        });
    }

    updateCandidate(candidate: DriverPOC.Candidate) {
        return new Promise < DriverPOC.Candidate > ((resolve) => {
            resolve(candidate);
        });
    }

    deleteCandidate(candidateId: number) {
        return new Promise < string > ((resolve) => {
            resolve('Successfully deleted candidate with id ' + candidateId + '!');
        });
    }

    getLocalStorageItem(key: string) {
        return new Promise < string > (async (resolve) => {
            var item = localStorage.getItem(key);
            if (!item) {
                item = await this.mockProvider.getMockItem(key);
                this.setLocalStorageItem(key, item);
            }
            resolve(item);
        })
    };

    setLocalStorageItem(key: string, value: string) {
        localStorage.setItem(key,value);
    }

    getLocalStorageObject(key: string) {
        return new Promise < object > (async (resolve) => {
            var item = await this.getLocalStorageItem(key);
            resolve(this.objectToTree.compose(JSON.parse(item)));
        })
    };

    setLocalStorageObject(key: string, object: object) {
        localStorage.setItem(key, JSON.stringify(this.objectToTree.decompose(object)));
    }

    removeLocalStorageItem(key: string) {
        localStorage.removeItem(key);
        return new Promise < string > ((resolve) => {
            resolve("Removed " + key);
        });
    }
}