import APIProvider from './APIProvider';
import BaseProvider from './BaseProvider';
import MockProvider from './MockProvider';
import StorageProvider from './StorageProvider';

export default class RPCProviderConfig {
  providers = {
    MOCK: new MockProvider(),
    API: new APIProvider(),
    STORAGE: new StorageProvider()
  };
  map: Record<string, BaseProvider> = {
    getCandidateList: this.providers.STORAGE,
    getPackages: this.providers.STORAGE,
    getCandidateInfo: this.providers.STORAGE,
    enrollCandidate: this.providers.API,
    getBeneficiariesList: this.providers.API,
    validateBeneficiaries: this.providers.API,
    executePayments: this.providers.API,
    login: this.providers.API,
    getRoles: this.providers.API,
    createCandidate: this.providers.STORAGE,
    updateCandidate: this.providers.API,
    deleteCandidate: this.providers.API,
  };
  addProvider = (key: string, provider: BaseProvider) => {
    this.providers = { ...this.providers, [key]: provider };
  };
  getProvider = (method: string) => {
    return this.map[method];
  };
}
