import { api } from './api';

export interface CompanyMaster {
    name: string;
    cnpj: string;
}

export interface BranchMaster {
    name: string;
    address: string;
    branchCode: string;
    companyName: string;
}

export interface CarrierMaster {
    name: string;
    cnpj: string;
}

const masterDataService = {
    getCompanies: async (): Promise<CompanyMaster[]> => {
        const response = await api.get<CompanyMaster[]>('/master/companies');
        return response.data;
    },

    getBranchesByCompany: async (companyName: string): Promise<BranchMaster[]> => {
        const response = await api.get<BranchMaster[]>('/master/branches', {
            params: { companyName },
        });
        return response.data;
    },

    getCarriers: async (): Promise<CarrierMaster[]> => {
        const response = await api.get<CarrierMaster[]>('/master/carriers');
        return response.data;
    },
};

export default masterDataService;
