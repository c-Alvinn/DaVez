import { api } from './api';

export interface BranchRequestDTO {
    name: string;
    companyCnpj: string;
    branchCode: string;
    address?: string;
}

export interface BranchResponseDTO {
    name: string;
    companyCnpj: string;
    companyName: string;
    branchCode: string;
    address?: string;
}

const branchService = {
    findAll: async (): Promise<BranchResponseDTO[]> => {
        const response = await api.get<BranchResponseDTO[]>('/branch');
        return response.data;
    },

    create: async (data: BranchRequestDTO): Promise<BranchResponseDTO> => {
        const response = await api.post<BranchResponseDTO>('/branch', data);
        return response.data;
    },

    update: async (code: string, data: BranchRequestDTO): Promise<BranchResponseDTO> => {
        const response = await api.put<BranchResponseDTO>(`/branch/${code}`, data);
        return response.data;
    },

    delete: async (code: string): Promise<void> => {
        await api.delete(`/branch/${code}`);
    },

    findByCompanyName: async (companyName: string): Promise<BranchResponseDTO[]> => {
        const response = await api.get<BranchResponseDTO[]>('/master/branches', {
            params: { companyName },
        });
        return response.data;
    },
};

export default branchService;
