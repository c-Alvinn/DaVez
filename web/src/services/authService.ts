import { api } from './api';
import type { User } from '../types';

interface LoginRequest {
    loginIdentifier: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: {
        id: number;
        username: string;
        role: string;
        companyId?: number;
        carrierId?: number;
    };
}

export const authService = {
    async login(credentials: LoginRequest): Promise<User> {
        const response = await api.post<LoginResponse>('/auth/login', credentials);

        // Mapear resposta do backend para o formato esperado pelo frontend
        return {
            id: response.data.user.id,
            name: response.data.user.username,
            role: response.data.user.role as User['role'],
            token: response.data.token,
            companyId: response.data.user.companyId,
            carrierId: response.data.user.carrierId,
        };
    },

    async register(data: {
        fullName: string;
        cpf: string;
        phone: string;
        password: string;
    }): Promise<void> {
        await api.post('/user/driver/register', {
            name: data.fullName,
            cpf: data.cpf,
            phoneNumber: data.phone,
            password: data.password,
        });
    },
};
