import { api } from './api';

export interface UserResponseDTO {
    name: string;
    username: string;
    cpf?: string;
    phoneNumber?: string;
    role: string;
    companyCnpj?: string;
    companyName?: string;
    branchCode?: string;
    branchName?: string;
    carrierCnpj?: string;
    carrierName?: string;
}

export interface LoginResponseDTO {
    token: string;
    user: UserResponseDTO;
}

const authService = {
    login: async (loginIdentifier: string, password: string): Promise<LoginResponseDTO> => {
        const response = await api.post<LoginResponseDTO>('/auth/login', {
            loginIdentifier,
            password,
        });
        return response.data;
    },

    getProfile: async (): Promise<UserResponseDTO> => {
        const response = await api.get<UserResponseDTO>('/user/profile');
        return response.data;
    },
};

export default authService;
