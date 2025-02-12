export type OffersTable = {
    id: number;
    product: number;
    price: number;
    offPercentage: number;
    fromDate: Date;
    toDate: Date;
    quantity: number;
    isActive: boolean;
    providerId: number;
    providerDisplayName: string;
    providerIsActive: boolean;

}