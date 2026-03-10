import { api } from './api';

const operatorService = {
    getDashboardStats: async () => {
        const response = await api.get('/operator/dashboard/stats');
        return response.data;
    },

    notifyDriver: async (ticketCode: string) => {
        await api.patch(`/operator/appointment/${ticketCode}/notify`);
    },

    startService: async (ticketCode: string) => {
        await api.patch(`/operator/appointment/${ticketCode}/start`);
    },

    completeService: async (ticketCode: string) => {
        await api.patch(`/operator/appointment/${ticketCode}/complete`);
    },
};

export default operatorService;
