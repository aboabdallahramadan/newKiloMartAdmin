export type ProjectSettings = {
    Id: number;
    DeliveryOrderFee: number;
    SystemOrderFee: number;
    CancelOrderWhenNoProviderHasAllProducts: boolean;
    MinCircleRadius: number;
    MaxCircleRadius: number;
    TimeInMinutesToMakeTheCircleBigger: number;
    HowMuchToIncreaseTheCircle: number;
    MaxMinutesToCancelOrderWaitingAProvider: number;
    MaxMinutesToCancelOrderWaitingADelivery: number;
}