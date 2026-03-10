import { api } from './api';
import type { ScheduleResponseDTO } from './schedulingService';


export interface RegisterDriverRequestDTO {
    name: string;
    cpf: string;
    password?: string;
    phoneNumber: string;
}

const driverService = {
    register: async (data: RegisterDriverRequestDTO): Promise<void> => {
        await api.post('/driver/register', data);
    },

    getActiveAppointment: async (): Promise<ScheduleResponseDTO> => {
        const response = await api.get<ScheduleResponseDTO>('/driver/appointment/active');
        return response.data;
    },

    getHistory: async (): Promise<ScheduleResponseDTO[]> => {
        const response = await api.get<ScheduleResponseDTO[]>('/driver/appointment/history');
        return response.data;
    },
};

export default driverService;
