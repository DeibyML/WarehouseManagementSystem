export interface Order {
    id: number;
    _id?: string;
    date: string;
    status: string;
    total: number;
    clientName: string;
    products: OrderProduct[];
}

interface OrderProduct  {
    name: string;
    quantity: number;
}



