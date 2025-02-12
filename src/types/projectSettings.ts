export type ProjectSettings = {
    id: number;
    deliveryOrderFee: number;
    systemOrderFee: number;
    circleRaduis: number;
    distanceToAdd: number;
    timeInMinutesToMakeTheCircleBigger: number;
    maxDistanceToAdd: number;
    maxMinutesToCancelOrderWaitingAProvider: number;
    cancelOrderWhenNoProviderHasAllProducts: boolean;
    minOrderValue: number;
    raduisForGetProducts: number;
}