import { api } from './api';

export interface ScheduleRequestDTO {
    branchCode: string;
    companyCnpj?: string;
    driverCpf?: string;
    grainType: string;
    operationType: string;
    carrierCnpj?: string;
    licensePlate: string;
    truckType: string;
}

export interface ScheduleResponseDTO {
    ticketCode: string;
    branchCode: string;
    branchName: string;
    driverCpf: string;
    driverName: string;
    carrierCnpj?: string;
    carrierName: string;
    grainType: string;
    operationType: string;
    licensePlate: string;
    truckType: string;
    queueStatus: string;
    queuePosition?: number;
    scheduledAt: string;
    calledAt?: string;
    releasedAt?: string;
}

export interface QueueStatusReportDTO {
    branchCode: string;
    branchName: string;
    scheduled: number;
    inService: number;
    completed: number;
    canceled: number;
    totalActive: number;
}

const schedulingService = {
    create: async (data: ScheduleRequestDTO): Promise<ScheduleResponseDTO> => {
        const response = await api.post<ScheduleResponseDTO>('/scheduling', data);
        return response.data;
    },

    findAll: async (): Promise<ScheduleResponseDTO[]> => {
        const response = await api.get<ScheduleResponseDTO[]>('/scheduling');
        return response.data;
    },

    findByTicketCode: async (ticketCode: string): Promise<ScheduleResponseDTO> => {
        const response = await api.get<ScheduleResponseDTO>(`/scheduling/${ticketCode}`);
        return response.data;
    },

    cancel: async (licensePlate: string, branchName: string): Promise<void> => {
        await api.post('/scheduling/cancel', { licensePlate, branchName });
    },

    getQueueStatusReport: async (branchCode: string): Promise<QueueStatusReportDTO> => {
        const response = await api.get<QueueStatusReportDTO>('/scheduling/reports/queue-status', {
            params: { branchCode },
        });
        return response.data;
    },

    getDashboardStats: async (): Promise<any> => {
        const response = await api.get('/scheduling/dashboard/stats');
        return response.data;
    }
};

export default schedulingService;
