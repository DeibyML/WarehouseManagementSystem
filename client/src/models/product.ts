import { Decimal128 } from "mongoose";

export interface Product {
    Id: number;
    Name: string;
    Quantity: number;
    Category: string;
    Location: string;
    Price: Decimal128
}