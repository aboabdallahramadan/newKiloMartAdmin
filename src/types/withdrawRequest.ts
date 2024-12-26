export type WithdrawRequest = {
    id: number;
    status: "Pending" | "Approved" | "Rejected";
    name: string;
    iban: string;
    date: string;
    bankAccountNumber: string;
    userId: number;
    amount: number;
};