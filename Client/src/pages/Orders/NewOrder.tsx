import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Client } from "../../models/client";
import { Constants } from "../../constants";
import { Product } from "../../models/product";
import { Multiselect } from "multiselect-react-dropdown";

type NewOrderProps = {
  show: boolean;
  close: any;
};
type ProductsAdded = {
  quantity: number;
  product: string;
  maxQuantity: number;
  id: string;
};

export const NewOrder = ({ show, close }: NewOrderProps) => {
  const OrderStatuses: string[] = [
    "Pending",
    "In progress",
    "Finished",
    "Canceled",
  ];
  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);
  const [productsAdded, setProductsAdded] = useState<ProductsAdded[]>([]);

  // Function to handle each product added at Order
  const handlingProductsAdd = (
    items: { value: string; id: string; maxQuantity: number }[]
  ) => {
    let prods: ProductsAdded[] = items.map((prod) => ({
      product: prod.value,
      maxQuantity: prod.maxQuantity,
      quantity: 1,
      id: prod.id,
    }));
    setProductsAdded([...prods]);
  };

  // Method to remove items from ProductsAdded when is removed from Dropdown Products
  const handlingRemoveProduct = (
    list: ProductsAdded[],
    product: ProductsAdded
  ) => {
    const newProducts = productsAdded.filter((prod) => prod.id !== product.id);
    setProductsAdded(newProducts);
  };

  const handlingQuantityItems = (item: ProductsAdded, quantity: number) => {
    // Validate minimum quantity of 1
    if (quantity <= 0) return;

    // Updating new quantity to each product
    const newItems = productsAdded.map((prod) => {
      // Find item to update new quantity and validate max quantity
      if (prod.id == item.id && prod.maxQuantity >= quantity) {
        return { ...prod, quantity: quantity };
      }

      return prod;
    });
    setProductsAdded(newItems);
  };

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
      if (resp?.data)
        setProducts(
          resp.data.map((prod: Product) => ({
            value: `${prod.name} (${prod.quantity})`,
            id: prod._id,
            maxQuantity: prod.quantity,
          }))
        );
    });
  }, []);

  return (
    <Modal show={show} onHide={close} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Create a new order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Customer</Form.Label>
          <Form.Select>
            {customers.map((cust, idx) => {
              return (
                <option key={idx.toString()} value={cust}>
                  {cust}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Please add products in order</Form.Label>
          {/* <Multiselect options={products} showArrow={true} onSelect={handlingProductsAdd} hidePlaceholder={true} onRemove={handlingRemoveProduct} displayValue='value' placeholder='Choose products' /> */}
        </Form.Group>
        <Form.Group>
          <InputGroup className="mb-3">
            <InputGroup.Text>Order status</InputGroup.Text>
            <Form.Control disabled value="Pending" />
          </InputGroup>
        </Form.Group>
        <hr />
        {productsAdded && productsAdded.length > 0 && (
          <Form.Group className="mb-3">
            <h5>Products detail:</h5>
            {productsAdded.map((prod, idx) => {
              return (
                <Form.Group>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>{prod.product}</InputGroup.Text>
                    <InputGroup.Text>
                      <Button
                        onClick={() =>
                          handlingQuantityItems(prod, prod.quantity - 1)
                        }
                        variant="danger"
                      >
                        -
                      </Button>
                    </InputGroup.Text>
                    <Form.Control size="sm" value={prod.quantity} />
                    <InputGroup.Text>
                      <Button
                        onClick={() =>
                          handlingQuantityItems(prod, prod.quantity + 1)
                        }
                        variant="success"
                      >
                        +
                      </Button>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              );
            })}
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Close
        </Button>
        <Button variant="primary" onClick={close}>
          Create!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
