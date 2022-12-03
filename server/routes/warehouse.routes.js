import { Route } from 'express'
import { Router } from 'express'
import {getProducts, createProduct, updateProduct, deleteProduct, getProduct} from '../controllers/product.controller.js';

const router = Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products', updateProduct);
router.delete('/products', deleteProduct);
router.get('/products/:id', getProduct);

export default router;