export type WithdrawRequest = {
    id: number;
    party: number;
    partyDisplayName: string;
    deliveryId: number | null;
    providerId: number | null;
    activeBalanceReceives: number;
    activeBalanceDeductions: number;
    bankAccountNumber: string;
    iBanNumber: string;
    date: Date;
    done: boolean;
    accepted: boolean;
    rejected: boolean;
};