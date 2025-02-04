import { OrderItem } from "./orderItem";
import { OrderDetails } from "./orderDetails";
import { OrderOfferItem } from "./orderOfferItem";
export interface Order {
    orderDetails: OrderDetails,
    orderProductDetails: OrderItem[];
    orderProductOfferDetails: null | OrderOfferItem[];
    driverLocation: null |{
        latitude: number,
        longitude: number,
    }
}
