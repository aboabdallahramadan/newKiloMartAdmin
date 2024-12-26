import { Provider } from "./provider";
import { Delivery } from "./delivery";
export type AccountRequest ={
    user: Omit<Provider , "isActive" | "totalOrders" | "totalProducts" | "availableBalance" | "totalBalance"> | Omit<Delivery , "isActive" | "totalOrders" | "availableBalance" | "totalBalance">;
    date: string;
}