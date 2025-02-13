export type ProductOffer = {
    id: number;
    price: number;
    offPercentage: number;
    fromDate: Date;
    toDate: Date;
    quantity: number;
    providerId: number;
    isActive: boolean;
    providerDisplayName: string;
    productId: number;
    productImageUrl: string;
    productIsActive: boolean;
    productDescription: string;
    productMeasurementUnit: string;
    productName: string;
    productOfferId: number;
    productCategoryId: number;
    productCategoryName: string;
    totalOrders: number;
}