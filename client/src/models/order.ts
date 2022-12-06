import { Product } from "./product";

export interface Order {
    id: number;
    _id?: string;
    date: string;
    status: string;
    price: {
        $numberDecimal: string
    };
    clientName: string;
    products: OrderProduct[];
}

interface OrderProduct extends Product {
    quantity: number;
}



