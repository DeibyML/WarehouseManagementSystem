import { Client } from "./client";
import { Order } from "./order";

export interface GlobalContext {
    Clients: Client[];
    Orders: Order[];
}