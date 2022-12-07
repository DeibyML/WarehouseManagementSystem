import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ProductsAdded } from '../pages/Orders/NewOrder';

type ProductDetailProps = {
    type: 'create' | 'update';
    products: ProductsAdded[];
    handlerProducts: (products: ProductsAdded, quantity: number) => void
}

const ProductDetail = ({ type, products, handlerProducts }: ProductDetailProps) => {
    return (
        <Form.Group className="mb-3">
            <h5>Products detail:</h5>
            {
                products.map((prod, idx) => {
                    return (
                        <Row>
                            <Form.Group>
                                <InputGroup className="mb-3">
                                    <Col xs={12} md={6}>
                                        <InputGroup.Text>{prod.product}</InputGroup.Text>
                                        <InputGroup.Text>{prod.price}</InputGroup.Text>
                                    </Col>
                                    <Col xs={12} md={3}>
                                        <InputGroup.Text><Button onClick={() => handlerProducts(prod, prod.quantity - 1)} variant="danger">-</Button></InputGroup.Text>
                                        <Form.Control size='sm' value={prod.quantity} />
                                    </Col>
                                    <Col xs>
                                        <InputGroup.Text><Button onClick={() => handlerProducts(prod, prod.quantity + 1)} variant="success">+</Button></InputGroup.Text>
                                    </Col>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    )
                })
            }
        </Form.Group>)
}


ProductDetail.propTypes = {}

export default ProductDetail