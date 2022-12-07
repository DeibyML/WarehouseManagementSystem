import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { ProductsAdded } from '../pages/Orders/NewOrder';

type ProductDetailProps = {
    type: 'create' | 'update';
    products: ProductsAdded[];
    handlerProducts: (products: ProductsAdded, quantity: number | string) => void
}

const ProductDetail = ({ type, products, handlerProducts }: ProductDetailProps) => {
    return (
        <Form.Group className="mb-3">
            <h5>Products detail:</h5>
            {
                products.map((prod, idx) => {
                    return (
                        <Row key={idx+1}>
                            <Form.Group>
                                <InputGroup className="mb-3">
                                    <Col xs={12}>
                                        <InputGroup.Text>{prod.value}</InputGroup.Text>
                                    </Col>
                                    <Col xs={6} className='d-flex mt-1'>
                                        <Col>
                                            <InputGroup.Text className='justify-content-center' style={{ height: '32px'}}><Button size='sm' onClick={() => handlerProducts(prod, prod.quantity - 1)} variant="danger">-</Button></InputGroup.Text>
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder='1' className='text-center' onChange={(e: any) => handlerProducts(prod, e.target.value)} size='sm' value={prod.quantity} />
                                        </Col>
                                        <Col>
                                            <InputGroup.Text className='justify-content-center' style={{ height: '32px'}}><Button size='sm' onClick={() => handlerProducts(prod, prod.quantity + 1)} variant="success">+</Button></InputGroup.Text>
                                        </Col>
                                    </Col>
                                    <Col xs={6} className='d-flex mt-1 pl-2'>
                                        <Col xs={6}>
                                            <InputGroup.Text className='justify-content-center' style={{ height: '32px'}}>Total: </InputGroup.Text>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control readOnly={true} size='sm' value={'$' + (prod?.quantity * prod?.price)} />
                                        </Col>
                                    </Col>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                    )
                })
            }
            <hr />
        </Form.Group>)
}


ProductDetail.propTypes = {}

export default ProductDetail