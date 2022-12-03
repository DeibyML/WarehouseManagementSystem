import { Decimal128 } from "mongoose";

export interface Order {
    Id: number;
    Date: Date;
    Status: string;
    Price: Decimal128;
    IdCliente: number;
}