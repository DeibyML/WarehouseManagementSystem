import axios from 'axios';
import { resolve } from 'path';
import { Order } from '../models/order';

const serverUrl = 'localhost:8080';
const controller = '/orders'

export const OrdersService = () => {
    
    const getOrders = async () =>
        await axios.get(serverUrl + controller);

    const getOrdersDummy: Promise<Order[]> = new Promise((resolve, reject) => {

        let orders: Order[] = [
            {
                Id: 1,
                Date: new Date(),
                Status: '1',
                Price: 25.8,
                Address: '1',
                CustomerName: 'Deiby Montoya'
            },
            {
                Id: 2,
                Date: new Date(),
                Status: '0',
                Price: 48.3,
                Address: '2',
                CustomerName: 'Bill Gates'
            }];

        resolve(orders);
    });

    return getOrdersDummy;

}
