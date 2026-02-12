import { Role } from './enums';

export * from './enums';

export type User = {
    id: number;
    name: string;
    role: Role;
    token: string;
    companyId?: number;
    carrierId?: number;
};
