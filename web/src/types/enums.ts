export const GrainType = {
    SOY: 'SOY',
    CORN: 'CORN'
} as const;
export type GrainType = typeof GrainType[keyof typeof GrainType];

export const GrainTypeLabels: Record<GrainType, string> = {
    [GrainType.SOY]: 'Soja',
    [GrainType.CORN]: 'Milho'
};

export const OperationType = {
    LOADING: 'LOADING',
    UNLOADING: 'UNLOADING'
} as const;
export type OperationType = typeof OperationType[keyof typeof OperationType];

export const OperationTypeLabels: Record<OperationType, string> = {
    [OperationType.LOADING]: 'Embarque',
    [OperationType.UNLOADING]: 'Desembarque'
};

export const QueueStatus = {
    SCHEDULED: 'SCHEDULED',
    IN_SERVICE: 'IN_SERVICE',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
} as const;
export type QueueStatus = typeof QueueStatus[keyof typeof QueueStatus];

export const ReportPeriod = {
    TODAY: 'TODAY',
    YESTERDAY: 'YESTERDAY',
    LAST_7_DAYS: 'LAST_7_DAYS'
} as const;
export type ReportPeriod = typeof ReportPeriod[keyof typeof ReportPeriod];

export const ReportPeriodLabels: Record<ReportPeriod, string> = {
    [ReportPeriod.TODAY]: 'Hoje',
    [ReportPeriod.YESTERDAY]: 'Ontem',
    [ReportPeriod.LAST_7_DAYS]: 'Últimos 7 Dias'
};

export const Role = {
    DRIVER: 'DRIVER',
    CARRIER: 'CARRIER',
    GATE_KEEPER: 'GATE_KEEPER',
    SCALE_OPERATOR: 'SCALE_OPERATOR',
    MANAGER: 'MANAGER',
    ADMIN: 'ADMIN'
} as const;
export type Role = typeof Role[keyof typeof Role];

export const TruckType = {
    TOCO: 'TOCO',
    LS: 'LS',
    BITREM: 'BITREM',
    RODOTREM: 'RODOTREM'
} as const;
export type TruckType = typeof TruckType[keyof typeof TruckType];

export const TruckTypeLabels: Record<TruckType, string> = {
    [TruckType.TOCO]: 'Toco',
    [TruckType.LS]: 'LS',
    [TruckType.BITREM]: 'Bitrem',
    [TruckType.RODOTREM]: 'Rodotrem'
};
