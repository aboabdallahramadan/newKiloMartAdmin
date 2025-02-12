export type ProductOffer = {
    productId: number;
    productImageUrl: string;
    productIsActive: boolean;
    productDescription: string;
    productMeasurementUnit: string;
    productName: string;
    productOfferId: number;
    productOfferFromDate: string;
    productOfferIsActive: boolean;
    productOfferOffPercentage: number;
    productOfferPrice: number;
    productOfferQuantity: number;
    partyDisplayName?: string;
    productOfferProvider?: number;
    productProductCategory: number;
    productCategoryName: string;
}