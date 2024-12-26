export type WithdrawRequest = {
    id: number;
    status: "Pending" | "Approved" | "Rejected";
    name: string;
    phone: string;
    iban: string;
    date: string;
    bankAccountNumber: string;
    userId: number;
    amount: number;
};