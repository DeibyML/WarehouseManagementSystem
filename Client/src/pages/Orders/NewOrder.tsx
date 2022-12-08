import axios from 'axios';
import { useEffect, useState } from 'react'
import { Alert, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { Client } from '../../models/client';
import { Constants } from '../../constants'
import { Product } from '../../models/product';
import { Multiselect } from 'multiselect-react-dropdown';
import ProductDetail from '../../components/ProductsDetail';
import { Order } from '../../models/order';

type NewOrderProps = {
   show: boolean;
   close: any;
   newId: number;
   getOrders: () => void;
}
export type ProductsAdded = {
   quantity: number;
   product: string;
   price: number;
   _id: string;
   value: string;
   maxQuantity: number;
   id: number;
}

export const NewOrder = ({ show, close, newId, getOrders }: NewOrderProps) => {
   const OrderStatuses: string[] = [
      "Pending",
      "In progress",
      "Finished",
      "Canceled",
   ];
   const [customers, setCustomers] = useState([]);
   const [total, setTotal] = useState(0);

   const [products, setProducts] = useState([] as Product[]);
   const [productsAdded, setProductsAdded] = useState<ProductsAdded[]>([]);
   const [customer, setCustomer] = useState('');

   useEffect(() => {
      // Getting all customers
      const getCustomers = async () =>
         await axios.get(Constants.SERVER_URL + Constants.CONTROLLER_CLIENT);
      const getProducts = async () =>
         await axios.get(Constants.SERVER_URL + Constants.CONTROLLER_PRODUCT);

      // Setting and mapping the customer names.
      getCustomers().then((resp) => {
         if (resp?.data) setCustomers(resp.data.map((cust: Client) => cust.name));
      });

      getProducts().then((resp) => {
         if (resp?.data) {
            setProducts(resp.data.map((prod: Product) => ({
               value: `${prod.name}: $${prod.price} ea.  Stock: ${prod.quantity}`,
               price: prod.price,
               product: prod.name,
               id: prod.id,
               _id: prod._id,
               maxQuantity: prod.quantity
            })));
         }
      });
   }, []);

   // Function to handle each product added at Order
   const handlingProductsAdd = (items: ProductsAdded[], item: ProductsAdded) => {
      setProductsAdded([...productsAdded, ...[{
         product: item.product,
         value: item.value,
         price: item.price,
         _id: item._id,
         maxQuantity: item.maxQuantity,
         quantity: 1,
         id: item.id}]]);
   }

   // Effect that keeps watching Products Added and recalculates grand total
   useEffect(() => {
      const sumValue = productsAdded.reduce((prev, curr) => {
         return prev += curr.price * curr.quantity
      }, 0)
      setTotal(sumValue);
   }, [JSON.stringify(productsAdded)]);

   // Method to remove items from ProductsAdded when is removed from Dropdown Products
   const handlingRemoveProduct = (list: ProductsAdded[], product: ProductsAdded) => {
      const newProducts = productsAdded.filter(prod => prod.id !== product.id);
      setProductsAdded(newProducts);
   }

   const handlingQuantityItems = (item: ProductsAdded, quantity: number | string) => {
      // Validate if quantity is number
      if (isNaN(Number(quantity))) return;

      quantity = Number(quantity);
      
      // Validate minimum quantity of 1
      if (quantity <= 0) return;

      // Updating new quantity to each product
      const newItems = productsAdded.map((prod) => {
         // Find item to update new quantity and validate max quantity
         if (prod._id == item._id && prod.maxQuantity >= quantity) {
            return { ...prod, quantity: Number(quantity) };
         }

         return prod;
      });
      
      setProductsAdded(newItems);
   };

   const closeModalAndResetForm = () => {
      setProductsAdded([]);
      close();
   };

   // Method to create a new Order
   const createNewOrder = async () => {

      const newOrder: Order = {
         id: newId,
         date: new Date().toISOString(),
         status: 'Pending',
         total: total,
         clientName: customer,
         products: productsAdded.map(prod => {
            return ({
               id: prod.id,
               name: prod.product,
               quantity: prod.quantity,
            })
         })
      };

      const response = await axios.post(Constants.SERVER_URL + Constants.CONTROLLER_ORDER, newOrder);
      if (response?.data?.success || response.statusText == 'statusText') {
         getOrders();
         closeModalAndResetForm();
      }
   }

   return (
      <Modal
         show={show}
         onHide={closeModalAndResetForm}
         backdrop="static"
      >
         <Modal.Header closeButton>
            <Modal.Title>Create a new order</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Group className="mb-3">
               <Form.Label>Customer</Form.Label>
               <Form.Select onChange={(e) => setCustomer(e.currentTarget.value)} defaultValue={'0'}>
                  <option disabled value={'0'}>Choose customer...</option>
                  {customers.map((cust, idx) => {
                     return (
                        <option key={idx + 1} value={cust}>{cust}</option>
                     )
                  })}
               </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
               <Form.Label>Please add one or many products to order</Form.Label>
               <Multiselect closeOnSelect={true} options={products} showArrow={true} onSelect={handlingProductsAdd} hidePlaceholder={true} onRemove={handlingRemoveProduct} displayValue='value' placeholder='Choose products' />
            </Form.Group>
            <Form.Group>
               <InputGroup className="mb-3">
                  <InputGroup.Text>Order status</InputGroup.Text>
                  <Form.Control disabled value='Pending' />
               </InputGroup>
            </Form.Group>
            <hr />
            {/* Calling ProductDetail Component sending props. */}
            {productsAdded?.length > 0 && <ProductDetail handlerProducts={handlingQuantityItems}
               type='create'
               products={productsAdded}></ProductDetail>
            }
            {total > 0 && <Alert className='text-center' variant='success'><strong>Grand Total: ${ total }</strong></Alert>}

         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={closeModalAndResetForm}>
               Close
            </Button>
            <Button variant="primary" onClick={createNewOrder}>Create</Button>
         </Modal.Footer>
      </Modal>
   )
}

