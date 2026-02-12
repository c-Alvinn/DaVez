export type User = {
    id: number;
    name: string;
    role: 'DRIVER' | 'CARRIER' | 'GATE_KEEPER' | 'SCALE_OPERATOR' | 'MANAGER' | 'ADMIN';
    token: string;
    companyId?: number;
    carrierId?: number;
};
