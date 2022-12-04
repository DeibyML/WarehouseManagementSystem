import { Router } from 'express'
import {getProducts, createProduct, updateProduct, deleteProduct, getProduct} from '../controllers/product.controller.js';
import {getClients, createClient, updateClient, deleteClient, getClient} from '../controllers/client.controller.js';
import {getOrders, createOrder, updateOrder, deleteOrder, getOrder} from '../controllers/order.controller.js';

const router = Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products', updateProduct);
router.delete('/products', deleteProduct);
router.get('/products/:idProduct', getProduct);

router.get('/clients', getClients);
router.post('/clients', createClient);
router.put('/clients', updateClient);
router.delete('/clients', deleteClient);
router.get('/clients/:idClient', getClient);

router.get('/orders', getOrders);
router.post('/orders', createOrder);
router.put('/orders', updateOrder);
router.delete('/orders', deleteOrder);
router.get('/orders/:idOrder', getOrder);

export default router;