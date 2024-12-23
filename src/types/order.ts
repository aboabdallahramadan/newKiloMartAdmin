import { OrderItem } from "./orderItem";
import {Location} from "@/types/location"

export interface Order {
    orderId: number;
    orderDate: string;
    orderStatus: "Order Placed" | "Preparing" | "Shipped" | "Canceled" | "Completed";
    orderActivityType: "InitByCustomer" | "CanceledByCustomerBeforeProviderAcceptIt" | "CanceledByCustomerBeforeDeliveryAcceptAfterProviderAccept" | "CanceledByCustomerAfterDeliveryAcceptIt" | "AcceptedByProvider" | "CanceledByProviderBeforeDeliveryAcceptIt" | "AcceptedByDelivery" | "CanceledByDelivery" | "ShippedByDelivery" | "DeliveredByDelivery" | "CompletedByDelivery";
    orderCustomerId: number;
    orderCustomerName: string;
    orderCustomerLocation: Location['mapDetails'];
    orderDeliveryId?: number;
    orderDeliveryName?: string;
    orderDeliveryLocation?: Location['mapDetails'];
    orderProviderId?: number;
    orderProviderName?: string;
    orderProviderLocation?: Location['mapDetails'];
    orderSubtotal: number;
    orderDeliveryFee: number;
    orderServiceFee: number;
    orderTotal: number;
    orderPaymentMethod: "Cash" | "Elcetronic";
    orderItems: OrderItem[];
}
