import { useEffect, useState } from 'react';
import './Orders.css';
import { Badge, Button, Card, ListGroup } from 'react-bootstrap';
import { Order } from '../../models/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faPerson, faDollarSign, faListNumeric, faPen, faCheckCircle, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { NewOrder } from './NewOrder';
import { Constants } from '../../constants';

export const Orders = () => {

  const [orders, setOrders] = useState([] as Order[]);
  const [showCreate, setShowCreate] = useState(false);

  // Method to get all Orders.
  const getOrders = async () => {
    await axios.get(Constants.SERVER_URL + Constants.CONTROLLER_ORDER).then(resp => {
      if (resp.data) {
        setOrders(resp.data);
      }
    });
  }

  useEffect(() => {
    getOrders();
  }, []);

  // Assing new Id random
  let newId: number = orders?.length == 0 ? 1 : Math.floor(Math.random() * 1000);

  // In case to be able to calculate next id, it adds +1 from the last item.
  if (!!Number(orders[orders.length - 1]?.id)) {
    newId = Number(orders[orders.length - 1]?.id) + 1;
  }

  let updateOrder = async (order: any) => {
    let newOrder = {...order, status: 'Finished'}

   const response = await axios.put(Constants.SERVER_URL + Constants.CONTROLLER_ORDER, newOrder);
   if (response?.data?.success || response.statusText == 'statusText') {
      getOrders();
   }
  };
  return (
    <div>
      <div className="title">
        <h2><FontAwesomeIcon icon={faShop} size="xs" /> Orders</h2>
      </div>

      <div className="new">
        <Button onClick={() => setShowCreate(true)} variant="outline-primary">New Order</Button>{' '}
        <NewOrder show={showCreate} close={() => setShowCreate(false)} getOrders={getOrders} newId={newId}></NewOrder>
      </div>

      <Row>
        {
          orders?.map((order: Order, idx) => {
            return (
              <Col key={idx + 1} style={{ margin: '1rem' }}>
                <Card style={{ maxWidth: '17rem', minHeight: '12rem', textAlign: 'center' }}>
                  <Card.Body>
                    <Card.Title>Order #{order.id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Status: {order.status}
                    </Card.Subtitle>
                    <Card.Body>
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faPerson} size="xs" /><strong> Customer name:</strong></Col>
                        <Col xs={6}>{order.clientName}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faDollarSign} size="xs" /><strong> Order total:</strong></Col>
                        <Col xs={6}>${order.total}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={6}><FontAwesomeIcon icon={faCalendar} size="xs" /><strong> Date:</strong></Col>
                        <Col xs={6}>{new Date(order.date).toDateString()}</Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col xs={12}><FontAwesomeIcon icon={faListNumeric} size="xs" /><strong> Products:</strong></Col>
                        <Col xs={12}><ListGroup as="ol" variant="flush" numbered>{
                          order.products?.map((prod, idx, array) => {
                            return (
                              <ListGroup.Item className='d-flex justify-content-between align-items-start' key={idx + 1}>
                                <div className="ms-2 me-auto">{prod.name}</div>
                                <Badge bg="success" pill>
                                  {prod.quantity}
                                </Badge>
                              </ListGroup.Item>
                            )
                          })}
                        </ListGroup>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Link onClick={() => updateOrder(order)} style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCheckCircle} size="xs" /> Marks as done</Card.Link>
                      {/* <Card.Link  style={{ cursor: 'pointer' }}><FontAwesomeIcon icon={faCheckCircle} size="xs" /> Finished </Card.Link> */}
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
        }
      </Row>
    </div>
  )
}

