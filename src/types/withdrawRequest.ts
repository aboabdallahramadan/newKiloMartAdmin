export type WithdrawRequest = {
    id: number;
    party: number;
    bankAccountNumber: string;
    iBanNumber: string;
    date: Date;
    done: boolean;
    accepted: boolean;
    rejected: boolean;
};