import { OrderItem } from "./orderItem";

export interface Order {
    orderId: number;
    orderDate: string;
    orderStatus: string;
    orderTotal: number;
    orderCustomerId: number;
    orderCustomerName: string;
    orderDeliveryId: number;
    orderDeliveryName: string;
    orderProviderId: number;
    orderProviderName: string;
    orderItems: OrderItem[];
}
